import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import FormattedProse from './FormattedProse'
import Signpost from './Signpost'
import { readerStates } from '../../datastore/reducers/reader'
import { sceneShape, editionShape } from '../../datastore/dataShapes'
import './reader.css'

export default class Reader extends Component {
  static propTypes = {
    edition: editionShape,
    scene: sceneShape,
    loadAndPlay: PropTypes.func.isRequired,
    goToScene: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (!this.props.edition) {
      this.props.loadAndPlay(this.props.match.params.editionKey)
    }
  }

  renderNotReady(message) {
    return (
      <div id="reader">
        <h3 className="text-center">{message}</h3>
      </div>
    )
  }

  render() {
    const { edition, scene, goToScene } = this.props

    if (!edition) {
      return this.renderNotReady('Loading...one moment please.')
    } else if (!scene) {
      return this.renderNotReady('Please wait while we set the scene...this should only take a second or two.')
    }

    const summary = edition.summary
    const playAgain = () => this.props.loadAndPlay(edition.editionKey)
    const goToLibrary = () => { /*dispatch(push('/'))*/ console.log('go to library') }
    const goToContact = () => { /*dispatch(push('/contact'))*/ console.log('go to contact')}

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
          goToScene={goToScene}
          playAgain={playAgain}
          goToContact={goToContact}
          goToLibrary={goToLibrary}
        />
      </div>
    )
  }
}