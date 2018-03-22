import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import FormattedProse from './FormattedProse'
import Signpost from './Signpost'
import { readerStates } from '../../datastore/reducers/reader'
import { storySummaryShape, sceneShape } from '../../datastore/dataShapes'
import './reader.css'

export default class Reader extends Component {
  static propTypes = {
    status: PropTypes.string,
    summary: storySummaryShape,
    scene: sceneShape,
    onPlay: PropTypes.func.isRequired,
    onGoToScene: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      internalState: readerStates.READY
    }
  }

  isFetching() {
    return this.props.status === readerStates.FETCHING
  }

  isReady() {
    return this.props.storyId === this.props.match.params.storyId &&
      this.props.status === readerStates.READY
  }

  componentDidMount() {
    const { storyId } = this.props.match.params
    if (!storyId) {
      throw new Error('route did not include storyId')
    }
    this.props.onPlay(storyId)
  }

  renderNotReady(message) {
    return (
      <div id="reader">
        <h3 className="text-center">{message}</h3>
      </div>
    )
  }

  render() {
    const { summary, scene, onGoToScene, onPlay, dispatch } = this.props

    if (this.isFetching()) {
      return this.renderNotReady('Loading...one moment please.')
    } else if (!this.isReady()) {
      return this.renderNotReady('Please wait while we set the scene...this should only take a second or two.')
    }

    if (!scene) {
      throw new Error('Whoops!  The Reader thinks it is ready, but there is nothing to read.')
    }

    const playAgain = () => { onPlay(summary.storyId) }
    const goToLibrary = () => { dispatch(push('/')) }
    const goToContact = () => { dispatch(push('/contact')) }

    return (
      <div id="reader">
        <h3 className="text-center">{summary.title}</h3>
        <h6 className="text-center"><em>by {summary.penName}</em></h6>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">{scene.title}</h5>
          </div>
          <div className="card-body">
            <FormattedProse prose={scene.prose} />
          </div>
        </div>
        <Signpost
          scene={scene}
          goToScene={onGoToScene}
          playAgain={playAgain}
          goToContact={goToContact}
          goToLibrary={goToLibrary}
        />
      </div>
    )
  }
}