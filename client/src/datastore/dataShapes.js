import PropTypes from 'prop-types'

export const storySummaryShape = PropTypes.shape({
  storyId: PropTypes.string,
  title: PropTypes.string,
  penName: PropTypes.string,
  tagLine: PropTypes.string,
  about: PropTypes.string,
  firstSceneId: PropTypes.string
})

export const sceneShape = PropTypes.shape({
  sceneId: PropTypes.string,
  title: PropTypes.string,
  prose: PropTypes.string,
  signpost: PropTypes.array
})

export const playerProfileShape = PropTypes.shape({
  id: PropTypes.string,
  email: PropTypes.string,
  nickname: PropTypes.string,
  createdAt: PropTypes.string,
  status: PropTypes.number,
  emailOptInAt: PropTypes.string,
  authorOptInAt: PropTypes.string,
  penName: PropTypes.string
})

export const profileChangeShape = PropTypes.shape({
  id: PropTypes.string,
  nickname: PropTypes.string,
  emailOptIn: PropTypes.bool,
  penName: PropTypes.string
})

export const draftSummaryShape = PropTypes.shape({
  storyId: PropTypes.string,
  title: PropTypes.string,
  tagLine: PropTypes.string,
  about: PropTypes.string,
  firstSceneId: PropTypes.string,
  createdAt: PropTypes.string,
  lastUpdatedAt: PropTypes.string
})

export const draftSceneShape = PropTypes.shape({
  sceneId: PropTypes.string,
  title: PropTypes.string,
  prose: PropTypes.string,
  signpost: PropTypes.array
})

export const draftShape = PropTypes.shape({
  summary: draftSummaryShape,
  scenes: PropTypes.object
})

export const editionShape = PropTypes.shape({
  editionKey: PropTypes.string,
  storyId: PropTypes.string,
  version: PropTypes.string,
  summary: storySummaryShape,
  rating: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.string),
  publishedAt: PropTypes.string
})

export const codeLookupShape = PropTypes.shape({
  code: PropTypes.string,
  displayName: PropTypes.string,
  sortOrder: PropTypes.integer
})

