import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
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
    onGoToScene: PropTypes.func.isRequired
  }

  isFetching() {
    return this.props.status === readerStates.FETCHING
  }

  componentDidMount() {
    const { storyId } = this.props.match.params
    if (!storyId) {
      throw new Error('route did not include storyId')
    }
    if (!this.props.summary) {
      this.props.onPlay(storyId)
      // if (!this.isFetching()) {
      // } else {
      //   console.log('already fetching something')
      // }
    }
  }

  renderSignpost(scene, goToScene, playAgain, goToLibrary) {
    const { endPrompt, signpost } = scene
    let signs
    if (signpost) {
      signs = signpost.map(sign => {
        let signKey = `${sign.sceneId}|${sign.teaser}`
        return (<li key={signKey} className="list-group-item" onClick={() => { goToScene(sign.sceneId) }}>{sign.teaser}</li>)
      })
    } else {
      signs = [
        <li key='replay' className="list-group-item" onClick={() => { playAgain() }}>Go back to the beginning and try again.</li>,
        <li key='feedback' className="list-group-item">Give some feedback.</li>,
        <li key='somethingElse' className="list-group-item" onClick={() => { goToLibrary() }}>Find another story.</li>
      ]
    }
    return (
      <div className="card">
        <div className="card-header prompt">
          <h5 className="mb-0">{endPrompt}</h5>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {signs}
          </ul>
        </div>
    </div>
    )
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
    const { status, summary, scene, onGoToScene, onBegin, dispatch } = this.props

    if (status === readerStates.FETCHING) {
      return this.renderNotReady('Loading...one moment please.')
    } else if (status === readerStates.HAS_ERRORS) {
      return this.renderNotReady('Oh no.  Something went wrong.')
    } else if (status !== readerStates.READY) {
      return this.renderNotReady('Nothing is happening.  Must...wait...forever...')
    }

    const formattedProse = this.formatProse(scene.prose)
    const playAgain = () => { onBegin(summary.storyId) }
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
        {this.renderSignpost(scene, onGoToScene, playAgain, goToLibrary)}
      </StoryTimePage>
    )
  }
}