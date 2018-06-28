import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { draftShape } from '../../datastore/dataShapes'
import StoryEditTabs from './StoryEditTabs'

export default class EditSignpost extends Component {
  static propTypes = {
    draft: draftShape,
    loadDraft: PropTypes.func,
    updateSignpost: PropTypes.func
  }

  state = {
    isLoading: false,
    draftSummary: {},
    draftScenes: {},
    draftScenesList: [],
    activeScene: {},
    activeSignpost: [],
    signToAdd: {
      teaser: '',
      destinationId: ''
    },
    signsToUpdate: {}
  }

  initSignsToUpdate = (signpost) => {
    let signsToUpdate = {}
    if (signpost) {
      signpost.forEach(sign => {
        signsToUpdate[sign.destinationId] = {
          ...sign,
          _original: sign
        }
      })
    }
    return signsToUpdate
  }

  initialize = (draft, sceneId) => {
    const draftSummary = draft.summary
    const draftScenes = draft.scenes
    const draftScenesList = Object.keys(draftScenes).map(sceneId => draftScenes[sceneId])
    const activeScene = draftScenes[sceneId]
    const activeSignpost = activeScene.signpost
    const signsToUpdate = this.initSignsToUpdate(activeSignpost)
    this.setState({
      isLoading: false,
      draftSummary,
      draftScenes,
      draftScenesList,
      activeScene,
      activeSignpost,
      signToAdd: {
        teaser: '',
        destinationId: ''
      },
      signsToUpdate
    })
  }

  handleChangeSignToAdd = (event) => {
    const { target } = event
    const { id, value } = target
    const signToAdd =  {
      ...this.state.signToAdd,
      [id]: value
    }
    this.setState({
      signToAdd
    })
  }

  handleAddSign = () => {
    const { draftSummary, activeScene, signToAdd } = this.state
    if (!signToAdd.teaser || signToAdd.teaser === '' || !signToAdd.destinationId || signToAdd.destinationId === '') {
      console.warn('Teaser or destination ID is missing')
      // TODO alert the user -- implement message box or popup, required field indicator
      return
    }
    this.props.updateSignpost(draftSummary.storyId, activeScene.sceneId, {
      toUpdate: [
        signToAdd
      ]
    })
  }

  handleChangeSign = (event) => {
    const { target } = event
    const { id, value } = target
    const destinationField = id.split('.')
    const destinationId = destinationField[0]
    const fieldId = destinationField[1]
    const sign = this.state.signsToUpdate[destinationId]
    const nextSignsToUpdate = {
      ...this.state.signsToUpdate,
      [destinationId]: {
        ...sign,
        [fieldId]: value
      }
    }
    this.setState({
      signsToUpdate: nextSignsToUpdate
    })
  }

  handleDeleteSign = (destinationId) => {
    const sign = this.state.signsToUpdate[destinationId]
    const nextDeleteValue = !sign.delete
    const nextSignsToUpdate = {
      ...this.state.signsToUpdate,
      [destinationId]: {
        ...sign,
        delete: nextDeleteValue
      }
    }
    this.setState({
      signsToUpdate: nextSignsToUpdate
    })
  }

  handleSaveSignpostUpdates = () => {
    const { draftSummary, activeScene, signsToUpdate } = this.state
    const signKeys = Object.keys(signsToUpdate)
    const updates = {
      toUpdate: [],
      toDelete: []
    }
    signKeys.forEach(key => {
      const toUpdate = signsToUpdate[key]
      if (toUpdate.delete) {
        updates.toDelete.push(key)
      } else {
        if (toUpdate._original.teaser !== toUpdate.teaser) {
          updates.toUpdate.push({
            destinationId: toUpdate.destinationId,
            teaser: toUpdate.teaser
          })
        }
      }
    })
    if (!updates.toUpdate.length && !updates.toDelete.length) {
      console.log('No changes')
      return
    }
    this.props.updateSignpost(draftSummary.storyId, activeScene.sceneId, updates)
  }

  handleCancelChanges = () => {
    this.setState({
      signsToUpdate: this.initSignsToUpdate(this.state.activeSignpost)
    })
  }

  componentDidMount() {
    const { draftId, sceneId } = this.props.match.params
    if (!draftId || !sceneId) {
      throw new Error('Routing issue: got to EditSignpost without a draft ID or scene ID')
    }

    const { draft } = this.props

    if (!draft) {
      this.setState({
        isLoading: true,
        draftScene: undefined
      })
      this.props.loadDraft(draftId)
      return
    }

    if (draft.scenes[sceneId]) {
      this.initialize(draft, sceneId)
      return
    } else {
      console.error('No scene?!?')
      throw new Error('No scene; should already be part of draft in store')
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextSceneId = nextProps.match.params.sceneId
    const { draft } = nextProps

    // end loading once draft has been located
    if (this.state.isLoading
        && draft
        && this.state.draftScene !== draft.scenes[nextSceneId]) {
      this.initialize(draft, nextSceneId)
    }

    if (draft && this.state.activeScene.signpost !== nextProps.draft.scenes[nextSceneId].signpost) {
      this.initialize(draft, nextSceneId)
    }
  }

  renderLoading() {
    return (
      <div id="edit-story">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item">Loading...</li>
        </ol>
        <h3>Loading...</h3>
      </div>
    )
  }

  renderSceneOptionList = () => {
    const { draftScenesList, activeScene } = this.state
    if (!draftScenesList) {
      return null
    }
    const availableSceneOptions = draftScenesList.filter(scene => scene.sceneId !== activeScene.sceneId)
    return availableSceneOptions.map(scene => (
      <option key={scene.sceneId} value={scene.sceneId}>{scene.title}</option>
    ))
  }

  renderAddSign = () => {
    const { signToAdd } = this.state
    return (
      <form>
        <fieldset>
          <legend className="text-info">Add a sign</legend>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">The sign says:</span>
            </div>
            <input
              className="form-control"
              type="text"
              id="teaser"
              value={signToAdd.teaser}
              onChange={this.handleChangeSignToAdd}
            />
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">And takes player to:</span>
            </div>
            <select
              className="form-control"
              id="destinationId"
              value={signToAdd.destinationId}
              onChange={this.handleChangeSignToAdd}
            >
              <option value="">--Select a scene--</option>
              {this.renderSceneOptionList()}
            </select>
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={this.handleAddSign}>
                <i className="icon ion-plus"></i> Add Sign
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }

  renderSignsToEdit() {
    const { draftScenes, activeSignpost, signsToUpdate } = this.state

    if (!draftScenes || !activeSignpost) {
      return null
    }

    return activeSignpost.map(sign => (
      <li key={sign.destinationId} className="list-group-item">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">The sign says:</span>
          </div>
          <input
            className="form-control"
            type="text"
            id={`${sign.destinationId}.teaser`}
            value={signsToUpdate[sign.destinationId].teaser}
            disabled={signsToUpdate[sign.destinationId].delete}
            onChange={this.handleChangeSign}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              id={`delete.${sign.destinationId}`}
              onClick={() => { this.handleDeleteSign(sign.destinationId) }}
            >
              <i className="icon ion-trash-a float-right"></i>
            </button>
          </div>
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">And takes player to:</span>
          </div>
          <div className="form-control">
            {`${draftScenes[sign.destinationId].title} [${sign.destinationId}]`}
          </div>
        </div>
      </li>
    ))
  }

  renderEditSigns = () => {
    const signsToEdit = this.renderSignsToEdit()
    if (!signsToEdit) {
      return null
    }
    return (
      <form>
        <fieldset>
          <legend className="text-info">Make changes and click "Save" to keep them. Click "Clear" to reset.</legend>
          <ul className="list-group">
            {signsToEdit}
            <li className="list-group-item">
              <button className="btn btn-primary" type="button" onClick={this.handleSaveSignpostUpdates}>
                <i className="icon ion-checkmark"></i> Save
              </button>
              <button className="btn btn-warning" type="button" onClick={this.handleCancelChanges}>
                <i className="icon ion-close"></i>  Clear
              </button>
            </li>
          </ul>
        </fieldset>
      </form>
    )
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoading()
    }

    const { draftSummary, activeScene } = this.state

    return (
      <div id="edit-scene">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${draftSummary.storyId}`}>{draftSummary.title}</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${draftSummary.storyId}/scenes/${activeScene.sceneId}`}>{activeScene.title}</Link></li>
          <li className="breadcrumb-item">Signpost</li>
        </ol>
        <StoryEditTabs summary={draftSummary} activeTab="scenes" />
        <div className="row section">
          <div className="col">
            <h5>Signpost</h5>
            {this.renderAddSign()}
            {this.renderEditSigns()}
          </div>
        </div>
      </div>
    )
  }
}
