import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { draftShape } from '../../datastore/dataShapes'
import Breadcrumbs from './Breadcrumbs'
import EditSummary from './EditSummary'
import StoryEditTabs from './StoryEditTabs'

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
        <StoryEditTabs summary={summary} activeTab="summary" />
        <h5>Cover Jacket</h5>
        <EditSummary id="summary" draftSummary={summary} save={this.props.saveDraft} />
      </div>
    )
  }
}
