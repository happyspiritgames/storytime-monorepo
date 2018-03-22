import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { draftShape } from '../../datastore/dataShapes'
import Breadcrumbs from './Breadcrumbs'
import EditSummary from './EditSummary'
import AddScene from './AddScene'
import SceneList from './SceneList'

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
        <h4 className="text-center">Story Editor</h4>
        <div>
        { draft && draft.summary &&
          <div id="summary">
            <EditSummary draftSummary={draft.summary} save={this.props.saveDraft} />
          </div>
        }
          <div id="scenes">
            <h3>Scenes</h3>
          { draft && Object.values(draft.scenes).length !== 0 &&
            <SceneList scenes={draft.scenes} storyId={draft.summary.storyId} />
          }
          { summary && summary.storyId &&
            <AddScene addScene={this.handleAddScene} />
          }
          </div>
        </div>
      </div>
    )
  }
}
