import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { draftShape } from '../../datastore/dataShapes'
import Desktop from './Desktop'
import EditStory from './EditStory'
import EditScene from './EditScene'
import EditSignpost from './EditSignpost'

export default class WritingDesk extends Component {
  static propTypes = {
    draftProjects: PropTypes.array,
    activeDraft: draftShape,
    loadDrafts: PropTypes.func,
    loadDraftForEdit: PropTypes.func,
    saveDraft: PropTypes.func,
    loadDraftScene: PropTypes.func,
    saveDraftScene: PropTypes.func,
    loadDraftSignpost: PropTypes.func,
    updateDraftSignpost: PropTypes.func
  }

  render() {
    const {
      draftProjects,
      activeDraft,
      loadDrafts,
      loadDraftForEdit,
      saveDraft,
      saveDraftScene,
      updateDraftSignpost
    } = this.props
    return (
      <Switch>
        <Route exact path="/writingdesk"
          render={
            (props) => <Desktop
              draftProjects={draftProjects}
              loadDrafts={loadDrafts}
              createDraft={saveDraft}
              {...props}
            />
          }
        />
        <Route exact path="/writingdesk/:draftId"
          render={
            (props) => <EditStory
              draft={activeDraft}
              loadDraft={loadDraftForEdit}
              saveDraft={saveDraft}
              addScene={saveDraftScene}
              {...props}
            />
          }
        />
        <Route exact path="/writingdesk/:draftId/:sceneId"
          render={
            (props) => <EditScene
              draft={activeDraft}
              loadDraft={loadDraftForEdit}
              saveScene={saveDraftScene}
              {...props}
            />
          }
        />
        <Route exact path="/writingdesk/:draftId/:sceneId/signpost"
          render={
            (props) => <EditSignpost
              draft={activeDraft}
              loadDraft={loadDraftForEdit}
              updateSignpost={updateDraftSignpost}
              {...props}
            />
          }
        />
      </Switch>
    )
  }
}
