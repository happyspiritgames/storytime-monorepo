const { verifyStoryAuthorization, assembleFullStory } = require('./draftUtil')
const { internalError } = require('./errors')
const publishingModel = require('../db/publishingModel')
const { saveStory } = require('../db/storyRepo')

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
    const unpublishedVersion = await publishingModel.findUnpublishedVersion(draftId)
    if (unpublishedVersion) {
      // already exists; do nothing
      console.log('proof already started; doing nothing')
      res.status(304).end()
      return
    }
    // version numbering -- find the latest published and increment
    let nextVersion = 1
    const latestVersion = await publishingModel.getLatestPublishedVersion(draftId)
    if (latestVersion) {
      nextVersion = parseInt(latestVersion)
      nextVersion++
    }
    console.log('next version', nextVersion)
    const metadata = await publishingModel.createProof(draftId, nextVersion.toString())
    res.status(201).json(metadata)
  } catch (e) {
    console.error('Problem creating metadata for publishing', e)
    res.status(500).json(internalError)
  }
}

exports.getProofMetadata = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  console.log('publishingController.getProofMetadata', draftId, version)
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

const takeNap = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

exports.updateProofMetadata = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  const metadataUpdate = req.body
  console.log('publishingController.updateProofMetadata',
    draftId, version, metadataUpdate)

  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    await publishingModel.updateProof(draftId, version, metadataUpdate)

    // TODO might be horrible; just a work-around until I can troubleshoot async problems
    await takeNap(200)

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

    // save story
    const key = proofMetadata.storyKey ? proofMetadata.storyKey : draftId
    const filename = `${key}_${version}.json`
    const serializedStory = JSON.stringify(fullStory)
    await publishingModel.recordPublishingEvent(draftId, version, serializedStory)

    // return updated metadata
    proofMetadata = await publishingModel.getProof(draftId, version)
    res.status(201).json(proofMetadata)
  } catch (e) {
    console.error('Problem publishing', e)
    res.status(500).json(internalError)
  }
}
