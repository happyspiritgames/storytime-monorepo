const draftModel = require('../db/draftModel')
const publishingModel = require('../db/publishingModel')
const { internalError, errorMessage, theEnd } = require('./errors')
const { saveStory } = require('../db/storyRepo')

const verifyStoryAuthorization = async (playerId, storyId, res) => {
  const authorId = await draftModel.getStoryOwner(storyId)
  if (!authorId) {
    res.status(404).json(errorMessage('Story not found.'))
    return false
  }
  if (authorId !== playerId) {
    res.status(401).json(errorMessage('You do not have permission to edit that story.'))
    return false
  }
  return true
}

/**
 * StoryTime API method for retrieving draft story summaries for the current player.
 *
 * @param {*} req - the HTTP request
 * @param {*} res - the HTTP response
 */
exports.getDraftSummaries = async (req, res) => {
  console.log('draftController.getStories')
  const authorId = req.user.playerId
  try {
    const stories = await draftModel.getStories(authorId)
    res.json(stories)
  } catch (e) {
    console.error('Problem getting draft stories', e)
    res.status(500).json(internalError)
  }
}

exports.beginNewStory = async (req, res) => {
  const { playerId } = req.user
  const { title, tagLine, about } = req.body
  console.log('draftController.beginNewStory', playerId, title)
  try {
    const storyId = await draftModel.createStory(playerId, title, tagLine, about)
    const sceneId = await draftModel.createScene(storyId, 'First Scene')
    await draftModel.updateStory(storyId, null, null, null, sceneId)
    const summary = await draftModel.getStory(storyId)
    res.status(201).json(summary)
  } catch (e) {
    console.error('Problem creating draft story', e)
    res.status(500).json(internalError)
  }
}

exports.getStorySummary = async (req, res) => {
  console.log('draftController.getStorySummary')
  const { playerId } = req.user
  const { storyId } = req.params
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    const summary = await draftModel.getStory(storyId)
    res.json(summary)
  } catch (e) {
    console.error('Problem getting draft summary', e)
    res.status(500).json(internalError)
  }
}

exports.updateStorySummary = async (req, res) => {
  console.log('draftController.updateStorySummary')
  const { playerId } = req.user
  const { storyId } = req.params
  const { title, tagLine, about, firstSceneId } = req.body
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return
    }
    await draftModel.updateStory(storyId, title, tagLine, about, firstSceneId)
    const summary = await draftModel.getStory(storyId)
    res.status(202).json(summary)
  } catch (e) {
    console.error('Problem updating draft summary', e)
    res.status(500).json(internalError)
  }
}

const assembleFullStory = async (draftId) => {
  const summary = await draftModel.getStory(draftId)
  const scenes = await draftModel.getScenes(draftId)
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i]
    const signpost = await draftModel.getSignpost(scene.sceneId)
    if (signpost) {
      scene['signpost'] = signpost
    }
  }
  const fullStory = {
    summary: summary,
    scenes: scenes
  }
  return fullStory
}

exports.getFullStory = async (req, res) => {
  console.log('draftController.getFullStory')
  const { playerId } = req.user
  const { storyId } = req.params
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return
    }
    const fullStory = await assembleFullStory(storyId)
    res.json(fullStory)
  } catch (e) {
    console.error('Problem getting full draft', e)
    res.status(500).json(internalError)
  }
}

exports.beginNewScene = async (req, res) => {
  const { playerId } = req.user
  const { storyId } = req.params
  const { title, prose, endPrompt } = req.body
  console.log('draftController.beginNewScene', storyId, title)
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return
    }
    const sceneId = await draftModel.createScene(storyId, title, prose, endPrompt)
    const scene = await draftModel.getScene(storyId, sceneId)
    res.status(201).json(scene)
  } catch (e) {
    console.error('Problem creating new scene', e)
    res.status(500).json(internalError)
  }
}

exports.getScene = async (req, res) => {
  const { playerId } = req.user
  const { storyId, sceneId } = req.params
  console.log('draftController.getScene', storyId, sceneId)
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return
    }
    const scene = await draftModel.getScene(storyId, sceneId)
    if (!scene) {
      res.status(404).json(errorMessage('The scene was not found.'))
      return
    }
    res.json(scene)
  } catch (e) {
    console.error('Problem getting draft scene', e)
    res.status(500).json(internalError)
  }
}

exports.updateScene = async (req, res) => {
  console.log('draftController.updateScene')
  const { playerId } = req.user
  const { storyId, sceneId } = req.params
  const { title, prose, endPrompt } = req.body
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return
    }
    await draftModel.updateScene(storyId, sceneId, title, prose, endPrompt)
    const scene = await draftModel.getScene(storyId, sceneId)
    res.status(202).json(scene)
  } catch (e) {
    console.error('Problem updating draft scene', e)
    res.status(500).json(internalError)
  }
}

exports.getSignpost = async (req, res) => {
  console.log('draftController.getSignpost')
  const { playerId } = req.user
  const { storyId, sceneId } = req.params
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return
    }
    const signpost = await draftModel.getSignpost(sceneId)
    if (!signpost) {
      res.status(404).json(theEnd)
    }
    res.json(signpost)
  } catch (e) {
    console.error('Problem getting signpost for scene', e)
    res.status(500).json(internalError)
  }
}

const takeNap = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

exports.updateSignpost = async (req, res) => {
  console.log('draftController.updateSignpost')
  const { playerId } = req.user
  const { storyId, sceneId } = req.params
  const { toUpdate, toDelete } = req.body
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return
    }
    if (toDelete) {
      console.log('deleting signs on signpost')
      toDelete.forEach(async destinationId => {
        await draftModel.deleteSignpostSign(sceneId, destinationId)
      })
    }
    if (toUpdate) {
      console.log('updating signpost', toUpdate, toUpdate.length)
      toUpdate.forEach(async update => {
        const sign = await draftModel.getSign(sceneId, update.destinationId)
        if (sign) {
          console.log('found sign', sign)
          if (sign.teaser !== update.teaser || sign.order !== update.order) {
            console.log('update sign', update)
            await draftModel.updateSignpostSign(sceneId, update.destinationId, update.teaser, update.order)
          } else {
            console.log('no update, same as existing', update)
          }
        } else {
          console.log('adding new sign')
          await draftModel.addSignpostSign(sceneId, update.destinationId, update.teaser, update.order)
        }
      })
    }

    // TODO might be horrible; just a work-around until I can troubleshoot async problems
    await takeNap(200)

    const signpost = await draftModel.getSignpost(sceneId)
    console.log('return updated signpost', signpost)
    res.status(202).send(signpost)
  } catch (e) {
    console.error('Problem updating signpost for scene', e)
    res.status(500).json(internalError)
  }
}

exports.getCatalogProofs = async (req, res) => {
  const { playerId } = req.user
  const { draftId } = req.params
  console.log('draftController.getProofs', draftId)
  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    const metadata = await getProofs(draftId)
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

/**
  Initiates a new published version. There can only be one unresolved published version at a time.
  So if this is called a second time while a published version exists with a publishedAt timestamp, the existing
  record will be returned.
 */
exports.createProof = async (req, res) => {
  const { playerId } = req.user
  const { draftId } = req.params
  console.log('draftController.createProof', draftId)
  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    const unpublishedVersion = await publishingModel.findUnpublishedInCatalog(playerId, draftId)
    if (unpublishedVersion) {
      // already exists; do nothing
      console.log('proof already started; doing nothing')
      res.status(304).end()
      return
    }
    // TODO implement version numbering logic -- find the latest published and increment
    const metadata = await publishingModel.createCatalogRecord(draftId, '1')
    res.status(201).json(metadata)
  } catch (e) {
    console.error('Problem creating metadata for publishing', e)
    res.status(500).json(internalError)
  }
}

exports.getProofMetadata = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  console.log('draftController.getMetadataForPublishing', draftId, version)
  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    const metadata = await getStoryFromCatalog(draftId, version)
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
  console.log('draftController.updateMetadataForPublishing',
    draftId, version, metadataUpdate)

  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    await publishingModel.updateCatalogRecord(draftId, version, metadataUpdate)
    const result = await getStoryFromCatalog(draftId, version)
    res.status(202).json(result)
  } catch (e) {
    console.error('Problem updating metadata for publishing', e)
    res.status(500).json(internalError)
  }
}

exports.publish = async (req, res) => {
  const { playerId } = req.user
  const { draftId, version } = req.params
  console.log('draftController.publish')
  try {
    if (!verifyStoryAuthorization(playerId, draftId, res)) {
      return
    }
    let proofMetadata = await getStoryFromCatalog(draftId, version)

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
    proofMetadata = await getStoryFromCatalog(draftId, version)
    res.status(201).json(proofMetadata)
  } catch (e) {
    console.error('Problem publishing', e)
    res.status(500).json(internalError)
  }
}
