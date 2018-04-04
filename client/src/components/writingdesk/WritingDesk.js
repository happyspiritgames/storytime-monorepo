import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { draftShape, proofShape } from '../../datastore/dataShapes'
import Desktop from './Desktop'
import EditStory from './EditStory'
import EditScene from './EditScene'
import EditSignpost from './EditSignpost'
import PublishingList from '../publishing/PublishingList'
import EditProof from '../publishing/EditProof'

export default class WritingDesk extends Component {
  static propTypes = {
    draftProjects: PropTypes.array,
    activeDraft: draftShape,
    proofs: PropTypes.array,
    activeProof: proofShape,
    loadDrafts: PropTypes.func,
    loadDraftForEdit: PropTypes.func,
    saveDraft: PropTypes.func,
    loadDraftScene: PropTypes.func,
    saveDraftScene: PropTypes.func,
    loadDraftSignpost: PropTypes.func,
    updateDraftSignpost: PropTypes.func,
    prepareToPublish: PropTypes.func,
    getProofs: PropTypes.func,
    getProof: PropTypes.func,
    updateProof: PropTypes.func,
    publish: PropTypes.func
  }

  render() {
    const {
      draftProjects,
      activeDraft,
      proofs,
      activeProof,
      loadDrafts,
      loadDraftForEdit,
      saveDraft,
      saveDraftScene,
      updateDraftSignpost,
      prepareToPublish,
      getProofs,
      getProof,
      updateProof,
      publish
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
        <Route exact path="/publish/:draftId"
          render={
            (props) => <PublishingList
              draft={activeDraft}
              proofs={proofs}
              loadDraft={loadDraftForEdit}
              loadProofs={getProofs}
              begin={prepareToPublish}
              publish={publish}
              {...props}
            />
          }
        />
        <Route exact path="/publish/:draftId/:version"
          render={
            (props) => <EditProof
              draft={activeDraft}
              proof={activeProof}
              loadDraft={loadDraftForEdit}
              updateProof={updateProof}
              getProof={getProof}
              {...props}
            />
          }
        />
      </Switch>
    )
  }
}
