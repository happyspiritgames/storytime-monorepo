const storyModel = require('../db/storyModel')
const systemModel = require('../db/systemModel')
const { errorMessage, internalError } = require('./errors')

exports.ping = (req, res) => {
  console.log('ping')
  res.send({ salutation: 'pong' })
}

exports.searchStories = (req, res) => {
  console.log('storyController.searchStories')
  try {
    res.send(storyModel.getRecommendedStories())
  } catch (e) {
    console.error('Problem getting published stories', e)
    res.status(500).send(internalError)
  }
}

exports.getPublishedStorySummary = (req, res) => {
  const { storyId } = req.params
  console.log('storyController.getPublishedStorySummary', storyId)
  try {
    const story = storyModel.getPublishedStorySummary(storyId)
    if (story) {
      res.json(story)
    } else {
      res.status(404).json(errorMessage('Story not found'))
    }
  } catch (e) {
    console.error('Problem getting story summary', e)
    res.status(500).send(internalError)
  }
}

exports.getStoryScene = (req, res) => {
  const { storyId, sceneId } = req.params
  console.log('storyController.getStoryScene', storyId, sceneId)
  try {
    const scene = storyModel.getStoryScene(storyId, sceneId)
    if (scene) {
      res.json(scene)
    } else {
      res.status(404).json(errorMessage('Scene not found'))
    }
  } catch (e) {
    console.error('Problem getting scene for story', e)
    res.status(500).send(internalError)
  }
}

/**
 * Supports the following types: player-status, genre, rating.
 */
exports.getCodes = async (req, res) => {
  const { type } = req.params
  console.log('storyController.getCodes', type)
  try {
    if (type) {
      const codes = await systemModel.getCodeLookup(type)
      if (codes) {
        res.status(200).json(codes)
      } else {
        res.sendStatus(404)
      }
    }
  } catch (e) {
    console.error('Problem getting codes of given type', type, e)
    res.status(500).send(internalError)
  }
}