import { connect } from 'react-redux'
import WritingDesk from './WritingDesk'
import {
  retrieveDraftProjects,
  saveDraftSummary,
  retrieveDraft,
  startNewDraft,
  retrieveDraftScene,
  updateDraftScene,
  retrieveDraftSignpost,
  updateDraftSignpost,
  createEdition,
  getEditions,
  getEdition,
  updateEdition,
  publish,
  loadRatingCodes,
  loadGenreCodes
} from '../../datastore/actions'

// TODO ============== START HERE ==================

const mapStateToProps = state => {
  const writingDesk = state.writingDesk
  const draftProjects = writingDesk.draftProjects.map(storyId => state.drafts[storyId])
  const activeEdition = state.writingDesk.activeEdition
    ? state.writingDesk.editions[state.writingDesk.activeEdition]
    : undefined
  const editions = writingDesk.editions ? Object.values(state.writingDesk.editions) : undefined
  return {
    draftProjects,
    activeDraft: writingDesk.activeDraft,
    editions,
    activeEdition,
    ratingCodes: state.codes.rating,
    genreCodes: state.codes.genre
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDrafts: () => dispatch(retrieveDraftProjects()),
    startNewDraft: () => dispatch(startNewDraft()),
    loadDraftForEdit: (storyId) => dispatch(retrieveDraft(storyId)),
    saveDraft: (summary) => dispatch(saveDraftSummary(summary)),
    loadDraftScene: (storyId, sceneId) => dispatch(retrieveDraftScene(storyId, sceneId)),
    saveDraftScene: (storyId, scene) => dispatch(updateDraftScene(storyId, scene)),
    loadDraftSignpost: (storyId, sceneId) => dispatch(retrieveDraftSignpost(storyId, sceneId)),
    updateDraftSignpost: (storyId, sceneId, signpostUpdates) => dispatch(updateDraftSignpost(storyId, sceneId, signpostUpdates)),
    startNewEdition: (storyId) => dispatch(createEdition(storyId)),
    loadEditions: (storyId) => dispatch(getEditions(storyId)),
    loadEdition: (storyId, editionKey) => dispatch(getEdition(storyId, editionKey)),
    loadRatingCodes: () => dispatch(loadRatingCodes()),
    loadGenreCodes: () => dispatch(loadGenreCodes()),
    saveEdition: (storyId, editionKey, editionUpdate) => dispatch(updateEdition(storyId, editionKey, editionUpdate)),
    publish: (storyId, editionKey) => dispatch(publish(storyId, editionKey))
  }
}

const WritingDeskPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WritingDesk)

export default WritingDeskPage
