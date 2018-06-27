import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { draftShape, editionShape, codeLookupShape } from '../../datastore/dataShapes'
import Desktop from './Desktop'
import EditEdition from './EditEdition'
import EditScene from './EditScene'
import EditSignpost from './EditSignpost'
import EditStory from './EditStory'
import PublishingSummary from './PublishingSummary'
import ScenesToEdit from './ScenesToEdit'

export default class WritingDesk extends Component {
  static propTypes = {
    draftProjects: PropTypes.array,
    activeDraft: draftShape,
    editions: PropTypes.arrayOf(editionShape),
    activeEdition: editionShape,
    ratingCodes: PropTypes.arrayOf(codeLookupShape),
    genreCodes: PropTypes.arrayOf(codeLookupShape),
    loadDrafts: PropTypes.func,
    loadDraftForEdit: PropTypes.func,
    saveDraft: PropTypes.func,
    loadDraftScene: PropTypes.func,
    saveDraftScene: PropTypes.func,
    loadDraftSignpost: PropTypes.func,
    updateDraftSignpost: PropTypes.func,
    startNewEdition: PropTypes.func,
    loadEditions: PropTypes.func,
    loadEdition: PropTypes.func,
    loadRatingCodes: PropTypes.func,
    loadGenreCodes: PropTypes.func,
    saveEdition: PropTypes.func,
    publish: PropTypes.func
  }

  render() {
    const {
      draftProjects,
      activeDraft,
      editions,
      activeEdition,
      ratingCodes,
      genreCodes,
      loadDrafts,
      loadDraftForEdit,
      saveDraft,
      saveDraftScene,
      updateDraftSignpost,
      startNewEdition,
      loadEditions,
      loadEdition,
      loadRatingCodes,
      loadGenreCodes,
      saveEdition,
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
        <Route exact path="/writingdesk/:draftId/scenes"
          render={
            (props) => <ScenesToEdit
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
              editions={editions}
              loadDraft={loadDraftForEdit}
              loadEditions={loadEditions}
              startNewEdition={startNewEdition}
              {...props}
            />
          }
        />
        <Route exact path="/publish/:draftId/:editionKey"
          render={
            (props) => <EditEdition
              draft={activeDraft}
              edition={activeEdition}
              ratingCodes={ratingCodes}
              genreCodes={genreCodes}
              loadDraft={loadDraftForEdit}
              loadEdition={loadEdition}
              loadRatingCodes={loadRatingCodes}
              loadGenreCodes={loadGenreCodes}
              saveEdition={saveEdition}
              publish={publish}
              {...props}
            />
          }
        />
      </Switch>
    )
  }
}
