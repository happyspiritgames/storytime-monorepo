import PropTypes from 'prop-types';

export const storySummaryShape = PropTypes.shape({
  storyId: PropTypes.string,
  title: PropTypes.string,
  penName: PropTypes.string,
  tagLine: PropTypes.string,
  about: PropTypes.string,
  firstSceneId: PropTypes.string,
  publishedAt: PropTypes.string
});
