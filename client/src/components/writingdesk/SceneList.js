import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class SceneList extends Component {
  static propTypes = {
    scenes: PropTypes.object.isRequired,
    storyId: PropTypes.string.isRequired
  }

  render() {
    const { storyId, scenes } = this.props

    const renderedScenes = Object.values(scenes).map(scene => (
      <li key={scene.sceneId} className="list-group-item">
        <Link to={`/writingdesk/${storyId}/scenes/${scene.sceneId}`}>
          {scene.title} [id: {scene.sceneId}]
        </Link>
        <Link to={`/writingdesk/${storyId}/scenes/${scene.sceneId}`}>
          <i className="icon ion-edit float-right"></i>
        </Link>
      </li>
    ))

    return (
      <ul className="list-group">
        {renderedScenes}
      </ul>
    )
  }
}