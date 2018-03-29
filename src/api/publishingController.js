const publishingModel = require('../db/publishingModel')
const { internalError } = require('./errors')
const { verifyStoryAuthorization } = require('./authUtil')

exports.getProofs = async (req, res) => {
  const { playerId } = req.user
  const { draftId } = req.params
  console.log('publishingController.getProofs', draftId)
  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    const proofs = await publishingModel.getProofs(draftId)
    if (!proofs) {
      res.status(404).send()
      return
    }
    res.status(200).json(proofs)
  } catch (e) {
    console.error('Problem creating metadata for publishing', e)
    res.status(500).json(internalError)
  }
}

/**
  Initiates a new published version. There can only be one unresolved published version at a time.
  So if this is called a second time while a published version exists with a publishedAt timestamp, the existing
  record will be returned.
 */
exports.createProof = async (req, res) => {
  const { playerId } = req.user
  const { draftId } = req.params
  console.log('publishingController.createProof', draftId)
  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    const unpublishedVersion = await publishingModel.findUnpublished(playerId, draftId)
    if (unpublishedVersion) {
      // already exists; do nothing
      console.log('proof already started; doing nothing')
      res.status(304).end()
      return
    }
    // TODO implement version numbering logic -- find the latest published and increment
    const metadata = await publishingModel.createProof(draftId, '1')
    res.status(201).json(metadata)
  } catch (e) {
    console.error('Problem creating metadata for publishing', e)
    res.status(500).json(internalError)
  }
}

exports.getProofMetadata = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  console.log('publishingController.getMetadataForPublishing', draftId, version)
  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    const metadata = await publishingModel.getProof(draftId, version)
    if (!metadata) {
      res.status(404).send()
      return
    }
    res.status(200).json(metadata)
  } catch (e) {
    console.error('Problem creating metadata for publishing', e)
    res.status(500).json(internalError)
  }
}

exports.updateProofMetadata = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  const metadataUpdate = req.body
  console.log('publishingController.updateMetadataForPublishing',
    draftId, version, metadataUpdate)

  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    await publishingModel.updateProof(draftId, version, metadataUpdate)
    const result = await publishingModel.getProof(draftId, version)
    res.status(202).json(result)
  } catch (e) {
    console.error('Problem updating metadata for publishing', e)
    res.status(500).json(internalError)
  }
}

exports.publish = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  console.log('publishingController.publish')
  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    let proofMetadata = await publishingModel.getProof(draftId, version)

    // TODO this might be better as batch job since there could be some lag

    // build story JSON
    const fullStory = await assembleFullStory(draftId)

    // merge changes to summary from metadata
    const summary = fullStory.summary
    if (summary.storyId !== proofMetadata.storyKey) {
      summary['storyId'] = proofMetadata.storyKey
    }
    if (summary.title !== proofMetadata.title) {
      summary['title'] = proofMetadata.title
    }
    if (summary.tagLine !== proofMetadata.tagLine) {
      summary['tagLine'] = proofMetadata.tagLine
    }
    if (summary.about !== proofMetadata.about) {
      summary['about'] = proofMetadata.about
    }

    // store story in S3
    const key = proofMetadata.storyKey ? proofMetadata.storyKey : draftId
    const filename = `${key}_${version}.json`
    const serializedStory = JSON.stringify(fullStory)
    saveStory(filename, serializedStory)

    // set published_at timestamp
    await publishingModel.recordPublishingEvent(draftId, version, filename)

    // return updated metadata
    proofMetadata = await publishingModel.getStoryFromCatalog(draftId, version)
    res.status(201).json(proofMetadata)
  } catch (e) {
    console.error('Problem publishing', e)
    res.status(500).json(internalError)
  }
}
