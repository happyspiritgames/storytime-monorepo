import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import Signpost from './Signpost'
import StoryTimePage from '../StoryTimePage'
import { format } from '../../util/formatter'
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

  formatProse(prose) {
    return prose.split('\n').map((paragraph, index) =>
      (<p className="card-text" key={index}>{ format(paragraph) }</p>)
    )
  }

  renderNotReady(message) {
    return (
      <StoryTimePage id="reader">
        <h3 className="text-center">{message}</h3>
      </StoryTimePage>
    )
  }

  render() {
    const { status, summary, scene, onGoToScene, onPlay, dispatch } = this.props

    // console.log('status', status, 'summary', summary, 'scene', scene)

    if (this.isFetching()) {
      return this.renderNotReady('Loading...one moment please.')
    } else if (!this.isReady()) {
      return this.renderNotReady('Nothing is happening.  Must...wait...forever...')
    }

    if (!scene) {
      throw new Error('got to here without scene. what the?!?')
    }

    const formattedProse = this.formatProse(scene.prose)
    const playAgain = () => { onPlay(summary.storyId) }
    const goToLibrary = () => { dispatch(push('/')) }

    return (
      <StoryTimePage id="reader">
        <h3 className="text-center">{summary.title}</h3>
        <h6 className="text-center"><em>by {summary.penName}</em></h6>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">{scene.title}</h5>
          </div>
          <div className="card-body">
            {formattedProse}
          </div>
        </div>
        <Signpost
          scene={scene}
          goToScene={onGoToScene}
          playAgain={playAgain}
          goToLibrary={goToLibrary}
        />
      </StoryTimePage>
    )
  }
}