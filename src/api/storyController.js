const storyModel = require('../db/storyModel')
const editionModel = require('../db/storyEditionModel')
const systemModel = require('../db/systemModel')
const { errorMessage, internalError } = require('./errors')

/**
 * Returns a sign of life.
 *
 * @param {*} req
 * @param {*} res
 */
exports.ping = (req, res) => {
  console.log('storyController.ping')
  res.send({ salutation: 'pong' })
}

/**
 * Returns a list of stories that match the given criteria. For now,
 * there are no criteria, so this simply returns the latest editions
 * of all published stories.
 *
 * @param {*} req the request object
 * @param {*} res the response object
 */
exports.searchStories = (req, res) => {
  console.log('storyController.searchStories')
  try {
    // res.json(await editionModel.getLatestEditions())
    editionModel.getLatestEditions().then((latest) => {
      res.json(latest)
    })
  } catch (e) {
    console.error('Problem finding published stories', e)
    res.status(500).send(internalError)
  }
}

/**
 * Returns the summary of the given story edition.
 *
 * @param {*} req
 * @param {*} res
 */
exports.getStoryEdition = (req, res) => {
  const { editionKey } = req.params
  console.log('storyController.getStoryEdition', editionKey)
  try {
    editionModel.getSummary(editionKey).then((summary) => {
      if (summary) {
        res.json(summary)
      } else {
        res.status(404).json(errorMessage('Story not found'))
      }
    })
  } catch (e) {
    console.error('Problem getting story summary', e)
    res.status(500).send(internalError)
  }
}

/**
 * Returns the given scene of the given story edition.
 *
 * @param {*} req
 * @param {*} res
 */
exports.getEditionScene = (req, res) => {
  const { editionKey, sceneId } = req.params
  console.log('storyController.getEditionScene', editionKey, sceneId)
  try {
    editionModel.getScene(editionKey, sceneId).then((scene) => {
      if (scene) {
        res.json(scene)
      } else {
        res.status(404).json(errorMessage('Scene not found'))
      }
    })
  } catch (e) {
    console.error('Problem getting scene for story', e)
    res.status(500).send(internalError)
  }
}

/**
 * Retrieves lookups for the following supported types:
 * player-status, genre, rating, edition-status.
 *
 * @param {*} req the request object
 * @param {*} res the response object
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
    console.error('Problem getting lookups for type', type, e)
    res.status(500).send(internalError)
  }
}