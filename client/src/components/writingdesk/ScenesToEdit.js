import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { draftShape } from '../../datastore/dataShapes'
import Breadcrumbs from './Breadcrumbs'
import StoryEditTabs from './StoryEditTabs'
import SceneList from './SceneList'
import AddScene from './AddScene'

export default class EditStory extends Component {
  static propTypes = {
    draft: draftShape,
    startDraft: PropTypes.func,
    loadDraft: PropTypes.func,
    saveDraft: PropTypes.func,
    addScene: PropTypes.func
  }

  handleAddScene = (scene) => {
    this.props.addScene(this.props.draft.summary.storyId, scene)
  }

  componentDidMount() {
    this.props.loadDraft(this.props.match.params.draftId)
  }

  render() {
    const { draft } = this.props
    const summary = draft ? draft.summary : undefined

    return (
      <div id="edit-story">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <Breadcrumbs summary={summary} />
        <StoryEditTabs summary={summary} activeTab="scenes" />
        <h5>Scenes</h5>
        <div id="scenes">
        { draft && Object.values(draft.scenes).length !== 0 &&
          <SceneList scenes={draft.scenes} storyId={draft.summary.storyId} />
        }
        { summary && summary.storyId &&
          <AddScene addScene={this.handleAddScene} />
        }
        </div>
      </div>
    )
  }
}
