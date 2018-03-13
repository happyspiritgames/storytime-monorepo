import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { draftShape, sceneShape } from '../../datastore/dataShapes'
import Desktop from './Desktop'
import EditStory from './EditStory'
import EditScene from './EditScene'

export default class WritingDesk extends Component {
  static propTypes = {
    draftProjects: PropTypes.array,
    activeDraft: draftShape,
    activeDraftScene: sceneShape,
    loadDrafts: PropTypes.func
  }

  render() {
    const { draftProjects, activeDraft, loadDrafts, activeDraftScene } = this.props
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
              {...props}
            />
          }
        />
        <Route path="/writingdesk/:draftId/:sceneId"
          render={
            (props) => <EditScene
              draftScene={activeDraftScene}
              {...props}
            />
          }
        />
      </Switch>
    )
  }
}
