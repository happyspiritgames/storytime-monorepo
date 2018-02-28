import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StoryTimePage from '../StoryTimePage'
import { begin, visitPage } from '../../datastore/actions'
import { format } from '../../util/formatter'
import { readerStates } from '../../datastore/reducers/reader'
import { storySummaryShape, sceneShape } from '../../services/dataShapes'
import './reader.css'

export default class Reader extends Component {
  static propTypes = {
    status: PropTypes.string,
    summary: storySummaryShape,
    scene: sceneShape,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { storyId, sceneId } = this.props.match.params
    if (storyId && sceneId) {
      // TODO implement visit
      // dispatch(visit(storyId, sceneId))
      console.log('implement visit() please')
    } else if (storyId) {
      dispatch(begin(storyId))
    }
  }

  renderSignpost(scene) {
    const { endPrompt, signpost } = scene
    let signs
    if (signpost) {
      signs = signpost.map(sign =>
        (<li key={`${sign.sceneId}|${sign.teaser}`} className="list-group-item"><a href={`#${sign.sceneId}`}><span>{sign.teaser}</span></a></li>)
      )
    } else {
      // must be an ending
      signs = [
        <li className="list-group-item"><span>Go back to the beginning and try again.</span></li>,
        <li className="list-group-item"><span>Give some feedback.</span></li>,
        <li className="list-group-item"><span>Find another story.</span></li>
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
    const { status, summary, scene } = this.props

    if (status === readerStates.FETCHING) {
      return this.renderNotReady('Loading...one moment please.')
    } else if (status === readerStates.HAS_ERRORS) {
      return this.renderNotReady('Oh no.  Something went wrong.')
    } else if (status !== readerStates.READY) {
      return this.renderNotReady('Nothing is happening.  Must...wait...forever...')
    }

    const formattedProse = this.formatProse(scene.prose)

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
        {this.renderSignpost(scene)}
      </StoryTimePage>
    )
  }
}