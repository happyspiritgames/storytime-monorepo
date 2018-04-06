const { hasStoryAuthorAccess, assembleFullStory, takeNap } = require('./draftUtil')
const { internalError } = require('./errors')
const publishingModel = require('../db/publishingModel')

exports.getEditions = async (req, res) => {
  const { playerId } = req.user
  const { draftId } = req.params
  console.log('publishingController.getEditions', draftId)
  try {
    if (!hasStoryAuthorAccess(playerId, draftId, res)) {
      return
    }
    const editions = await publishingModel.getEditions(draftId)
    if (!editions) {
      res.status(404).send()
      return
    }
    res.status(200).json(editions)
  } catch (e) {
    console.error('Problem finding editions for story', draftId, e)
    res.status(500).json(internalError)
  }
}

/**
  Initiates a new publishing cycle. There can only be one unpublished version at a time,
  along with any number of published versions. Nothing happens if this is called while a
  unpublished version exists (publishedAt is null).
 */
exports.createEdition = async (req, res) => {
  const { playerId } = req.user
  const { draftId } = req.params
  console.log('publishingController.createEdition', draftId)
  try {
    if (!hasStoryAuthorAccess(playerId, draftId, res)) {
      return
    }
    const unpublishedVersion = await publishingModel.findUnpublishedVersion(draftId)
    if (unpublishedVersion) {
      console.log('proof already started; do nothing')
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
    const edition = await publishingModel.createNewEdition(draftId, nextVersion.toString())
    res.status(201).json(edition)
  } catch (e) {
    console.error('Problem creating new edition', e)
    res.status(500).json(internalError)
  }
}

exports.getEdition = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  console.log('publishingController.getEdition', draftId, version)
  try {
    if (!hasStoryAuthorAccess(playerId, draftId, res)) {
      return
    }
    const edition = await publishingModel.getEdition(draftId, version)
    if (!edition) {
      res.status(404).send()
      return
    }
    res.status(200).json(edition)
  } catch (e) {
    console.error('Problem finding edition', e)
    res.status(500).json(internalError)
  }
}

exports.updateEdition = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  const editionUpdate = req.body
  console.log('publishingController.updateEdition', draftId, version, editionUpdate)
  try {
    if (!hasStoryAuthorAccess(playerId, draftId, res)) {
      return
    }
    await publishingModel.updateEdition(draftId, version, editionUpdate)
    await takeNap(200)  // poor man's way to avoid async problems
    const updatedEdition = await publishingModel.getEdition(draftId, version)
    res.status(202).json(updatedEdition)
  } catch (e) {
    console.error('Problem updating edition', e)
    res.status(500).json(internalError)
  }
}

exports.publish = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  console.log('publishingController.publish', draftId, version)
  const start = new Date()
  try {
    if (!hasStoryAuthorAccess(playerId, draftId, res)) {
      return
    }
    let edition = await publishingModel.getEdition(draftId, version)

    // drop out if already published
    if (edition.publishedAt) {
      console.log('already published; do nothing')
      res.status(304).end()
      return
    }

    // TODO this would be better as batch job, especially for large stories
    // don't optimize yet; gather some timing metrics for now

    // build and save story JSON
    const fullStory = await assembleFullStory(draftId)
    await publishingModel.finishPublishing(draftId, version, fullStory)
    edition = await publishingModel.getEdition(draftId, version)
    res.status(201).json(edition)
    const elapsed = new Date().getTime() - start.getTime()
    console.log('published in ', elapsed, 'ms', draftId, version)
  } catch (e) {
    console.error('Problem publishing', e)
    res.status(500).json(internalError)
  }
}
