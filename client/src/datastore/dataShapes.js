import PropTypes from 'prop-types'

export const storySummaryShape = PropTypes.shape({
  storyId: PropTypes.string,
  title: PropTypes.string,
  penName: PropTypes.string,
  tagLine: PropTypes.string,
  about: PropTypes.string,
  firstSceneId: PropTypes.string,
  publishedAt: PropTypes.string
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