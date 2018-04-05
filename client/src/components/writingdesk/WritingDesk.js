import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { draftShape, proofShape, codeLookupShape } from '../../datastore/dataShapes'
import Desktop from './Desktop'
import EditPublishingInfo from './EditPublishingInfo'
import EditStory from './EditStory'
import EditScene from './EditScene'
import EditSignpost from './EditSignpost'
import PublishingSummary from './PublishingSummary'

export default class WritingDesk extends Component {
  static propTypes = {
    draftProjects: PropTypes.array,
    activeDraft: draftShape,
    proofs: PropTypes.array,
    activeProof: proofShape,
    ratingCodes: PropTypes.arrayOf(codeLookupShape),
    genreCodes: PropTypes.arrayOf(codeLookupShape),
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
    loadRatingCodes: PropTypes.func,
    loadGenreCodes: PropTypes.func,
    updateProof: PropTypes.func,
    publish: PropTypes.func
  }

  render() {
    const {
      draftProjects,
      activeDraft,
      proofs,
      activeProof,
      ratingCodes,
      genreCodes,
      loadDrafts,
      loadDraftForEdit,
      saveDraft,
      saveDraftScene,
      updateDraftSignpost,
      prepareToPublish,
      getProofs,
      getProof,
      loadRatingCodes,
      loadGenreCodes,
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
            (props) => <PublishingSummary
              draft={activeDraft}
              proofs={proofs}
              loadDraft={loadDraftForEdit}
              loadProofs={getProofs}
              begin={prepareToPublish}
              {...props}
            />
          }
        />
        <Route exact path="/publish/:draftId/:version"
          render={
            (props) => <EditPublishingInfo
              draft={activeDraft}
              proof={activeProof}
              ratingCodes={ratingCodes}
              genreCodes={genreCodes}
              loadDraft={loadDraftForEdit}
              loadProof={getProof}
              loadRatingCodes={loadRatingCodes}
              loadGenreCodes={loadGenreCodes}
              saveProof={updateProof}
              publish={publish}
              {...props}
            />
          }
        />
      </Switch>
    )
  }
}
