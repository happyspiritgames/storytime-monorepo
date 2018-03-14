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
    loadDraftForEdit: PropTypes.func,
    saveDraft: PropTypes.func
  }

  render() {
    const {
      draftProjects, activeDraft, loadDrafts,loadDraftForEdit, saveDraft
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
              loadDraft={loadDraftForEdit}
              saveDraft={saveDraft}
              {...props}
            />
          }
        />
        <Route path="/writingdesk/:draftId/:sceneId"
          render={
            (props) => <EditScene
              draft={activeDraft}
              {...props}
            />
          }
        />
      </Switch>
    )
  }
}
