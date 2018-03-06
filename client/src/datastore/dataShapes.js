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
  playerId: PropTypes.string,
  email: PropTypes.string,
  nickname: PropTypes.string,
  agreedToEmailOn: PropTypes.string,
  agreedToTermsOfAuthorOn: PropTypes.string,
  penName: PropTypes.string
})
