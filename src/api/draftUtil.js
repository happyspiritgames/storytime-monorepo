const { getStoryOwner, getStory, getScenes, getSignpost } = require('../db/draftModel')
const { errorMessage } = require('./errors')

exports.verifyStoryAuthorization = async (playerId, storyId, res) => {
  console.log('draftUtil.verifyStoryAuthorization')
  const authorId = await getStoryOwner(storyId)
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

exports.assembleFullStory = async (draftId) => {
  console.log('draftUtil.assembleFullStory')
  const summary = await getStory(draftId)
  const scenes = await getScenes(draftId)
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i]
    const signpost = await getSignpost(scene.sceneId)
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
