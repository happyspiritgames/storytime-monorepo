import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { draftShape } from '../../datastore/dataShapes'
import Desktop from './Desktop'
import EditStory from './EditStory'
import EditScene from './EditScene'

export default class WritingDesk extends Component {
  static propTypes = {
    draftProjects: PropTypes.array,
    activeDraft: draftShape,
    loadDrafts: PropTypes.func,
    startNewDraft: PropTypes.func,
    loadDraftForEdit: PropTypes.func,
    saveDraft: PropTypes.func,
    loadDraftScene: PropTypes.func,
    saveDraftScene: PropTypes.func,
    loadDraftSignpost: PropTypes.func,
    updateDraftSignpost: PropTypes.func
  }

  render() {
    const {
      draftProjects, activeDraft, loadDrafts, startNewDraft,
      loadDraftForEdit, saveDraft, saveDraftScene, loadDraftScene,
      loadDraftSignpost, updateDraftSignpost
    } = this.props
    return (
      <Switch>
        <Route exact path="/writingdesk"
          render={
            () => <Desktop
              draftProjects={draftProjects}
              loadDrafts={loadDrafts}
            />
          }
        />
        <Route exact path="/writingdesk/:draftId"
          render={
            (props) => <EditStory
              draft={activeDraft}
              startDraft={startNewDraft}
              loadDraft={loadDraftForEdit}
              saveDraft={saveDraft}
              addScene={saveDraftScene}
              {...props}
            />
          }
        />
        <Route path="/writingdesk/:draftId/:sceneId"
          render={
            (props) => <EditScene
              draft={activeDraft}
              loadDraft={loadDraftForEdit}
              loadScene={loadDraftScene}
              saveScene={saveDraftScene}
              loadSignpost={loadDraftSignpost}
              updateSignpost={updateDraftSignpost}
              {...props}
            />
          }
        />
      </Switch>
    )
  }
}
