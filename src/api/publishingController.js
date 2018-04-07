const { hasStoryAuthorAccess, assembleFullStory, takeNap } = require('./draftUtil')
const { internalError } = require('./errors')
const publishingModel = require('../db/publishingModel')

exports.getEditions = async (req, res) => {
  const { playerId } = req.user
  const { storyId } = req.params
  console.log('publishingController.getEditions', storyId)
  try {
    if (!hasStoryAuthorAccess(playerId, storyId, res)) {
      return
    }
    const editions = await publishingModel.getEditions(storyId)
    if (!editions) {
      res.status(404).send()
      return
    }
    res.status(200).json(editions)
  } catch (e) {
    console.error('Problem finding editions for story', storyId, e)
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
  const { storyId } = req.params
  console.log('publishingController.createEdition', storyId)
  try {
    if (!hasStoryAuthorAccess(playerId, storyId, res)) {
      return
    }
    const unpublishedVersion = await publishingModel.findUnpublishedVersion(storyId)
    if (unpublishedVersion) {
      console.log('proof already started; do nothing')
      res.status(304).end()
      return
    }

    // version numbering -- find the latest published and increment
    let nextVersion = 1
    const latestVersion = await publishingModel.getLatestPublishedVersion(storyId)
    if (latestVersion) {
      nextVersion = parseInt(latestVersion)
      nextVersion++
    }
    const edition = await publishingModel.createNewEdition(storyId, nextVersion.toString())
    res.status(201).json(edition)
  } catch (e) {
    console.error('Problem creating new edition', e)
    res.status(500).json(internalError)
  }
}

exports.getEdition = async (req, res) => {
  const { playerId } = req.user
  const { storyId, editionKey } = req.params
  console.log('publishingController.getEdition', storyId, editionKey)
  try {
    if (!hasStoryAuthorAccess(playerId, storyId, res)) {
      return
    }
    const edition = await publishingModel.getEdition(editionKey)
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
  const { storyId, editionKey } = req.params
  const editionUpdate = req.body
  console.log('publishingController.updateEdition', storyId, editionKey, editionUpdate)
  try {
    if (!hasStoryAuthorAccess(playerId, storyId, res)) {
      return
    }
    await publishingModel.updateEdition(editionKey, editionUpdate)
    await takeNap(200)  // poor man's way to avoid async problems
    const updatedEdition = await publishingModel.getEdition(editionKey)
    res.status(202).json(updatedEdition)
  } catch (e) {
    console.error('Problem updating edition', e)
    res.status(500).json(internalError)
  }
}

exports.publish = async (req, res) => {
  const { playerId } = req.user
  const { storyId, editionKey } = req.params
  console.log('publishingController.publish', storyId, editionKey)
  const start = new Date()
  try {
    if (!hasStoryAuthorAccess(playerId, storyId, res)) {
      return
    }
    let edition = await publishingModel.getEdition(editionKey)

    // drop out if already published
    if (edition.publishedAt) {
      console.log('already published; do nothing')
      res.status(304).end()
      return
    }

    // TODO this would be better as batch job, especially for large stories
    // don't optimize yet; gather some timing metrics for now

    // build and save story JSON
    await publishingModel.finishPublishing(editionKey)
    edition = await publishingModel.getEdition(storyId, version)
    res.status(201).json(edition)
    const elapsed = new Date().getTime() - start.getTime()
    console.log('published in ', elapsed, 'ms', storyId, version)
  } catch (e) {
    console.error('Problem publishing', e)
    res.status(500).json(internalError)
  }
}
