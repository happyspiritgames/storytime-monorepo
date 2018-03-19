import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { draftShape } from '../../datastore/dataShapes'

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
    signsToUpdate: {},
    signsToDelete: []
  }

  /*
    signpostChanges: {
      toUpdate: [
        {
          destinationId: '42',
          teaser: 'Go here',
          order: 10
        }
      ],
      toDelete: ['sceneId1']
    },
  */

  // TODO extract signpostChangeUtil ??

  initialize = (draft, sceneId) => {
    const draftSummary = draft.summary
    const draftScenes = draft.scenes
    const draftScenesList = Object.keys(draftScenes).map(sceneId => draftScenes[sceneId])
    const activeScene = draftScenes[sceneId]
    const activeSignpost = activeScene.signpost
    let signsToUpdate = {}
    if (activeSignpost) {
      activeSignpost.forEach(sign => {
        console.log('adding sign to update', sign)
        signsToUpdate[sign.destinationId] = sign
      })
    }
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
    console.log('handleChangeSignToAdd', id, value)
    const signToAdd =  {
      ...this.state.signToAdd,
      [id]: value
    }
    this.setState({
      signToAdd
    })
  }

  handleAddSign = (destinationId, teaser) => {
    console.log('implement handleAddSign')
    const { draftSummary, activeScene, signToAdd } = this.state
    if (!signToAdd.teaser || signToAdd.teaser === '' || !signToAdd.destinationId || signToAdd.destinationId === '') {
      console.log('Teaser or destination ID is missing')
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
    console.log('handleChangeSign', id, value)
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
    console.log('nextSignsToUpdate', nextSignsToUpdate)
    this.setState({
      signsToUpdate: nextSignsToUpdate
    })
  }

  handleDeleteSign = (event) => {
    console.log('implement handleDeleteSign', event)
  }

  handleSaveSignpostUpdates = () => {
    console.log('handleSaveSignpostUpdates')
    const { draftSummary, activeScene, signsToUpdate } = this.state
    const updates = {
      toUpdate: Object.keys(signsToUpdate).map(key => signsToUpdate[key])
    }
    console.log('updates being saved', updates)
    this.props.updateSignpost(draftSummary.storyId, activeScene.sceneId, updates)
  }

  handleCancelChanges = () => {
    console.log('handleCancelChanges')
    const { draftSummary, activeScene, signpostChanges } = this.state
    this.props.updateSignpost(draftSummary.storyId, activeScene.sceneId, signpostChanges)
  }

  componentDidMount() {
    const { draftId, sceneId } = this.props.match.params
    if (!draftId || !sceneId) {
      throw new Error('Routing issue: got to EditSignpost without a draft ID or scene ID')
    }

    const { draft } = this.props

    if (!draft) {
      console.log('draft is missing')
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
    console.log('componentWillReceiveProps', nextProps)
    const nextSceneId = nextProps.match.params.sceneId
    const { draft } = nextProps

    // end loading once draft has been located
    if (this.state.isLoading
        && draft
        && this.state.draftScene !== draft.scenes[nextSceneId]) {
      console.log('stop loading draft')
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

  renderSignToEdit() {
    const { draftScenes, activeSignpost, signsToUpdate } = this.state

    if (!draftScenes || !activeSignpost) {
      return null
    }

    return activeSignpost.map(sign => (
      <li key={sign.destinationId} className="list-group-item">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Teaser</span>
          </div>
          <input
            className="form-control"
            id={`${sign.destinationId}.teaser`}
            type="text"
            value={signsToUpdate[sign.destinationId].teaser}
            onChange={this.handleChangeSign}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="icon ion-trash float-right"></i>
            </button>
          </div>
        </div>
        <div className="form-control-plaintext">
          {`${draftScenes[sign.destinationId].title} [${sign.destinationId}]`}
        </div>
      </li>
    ))
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

  render() {
    console.log('props', this.props)
    console.log('state', this.state)

    if (this.state.isLoading) {
      return this.renderLoading()
    }

    const { draftSummary, activeScene, signToAdd } = this.state
    const signsToEdit = this.renderSignToEdit()
    const sceneOptions = this.renderSceneOptionList()

    return (
      <div id="edit-scene">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${draftSummary.storyId}`}>{draftSummary.title}</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${draftSummary.storyId}/${activeScene.sceneId}`}>{activeScene.title}</Link></li>
          <li className="breadcrumb-item">Signpost</li>
        </ol>
        <div className="row section">
          <div className="col">
            <h3>Signpost</h3>
            <form>
              <fieldset>
                <legend className="text-info">Add a sign (where to go next)</legend>
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
                    {sceneOptions}
                  </select>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={this.handleAddSign}>
                      <i className="icon ion-plus"></i> Add Sign
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          { signsToEdit &&
            <form>
              <fieldset>
                <legend className="text-info">Signs. Change whatever you like…</legend>
                <ul className="list-group">
                  {signsToEdit}
                  <li className="list-group-item">
                    <button className="btn btn-primary" type="button" onClick={this.handleSaveSignpostUpdates}>
                      <i className="icon ion-checkmark"></i> Save Changes
                    </button>
                    <button className="btn btn-primary" type="button" onClick={this.handleCancelChanges}>
                      <i className="icon ion-close"></i>  Cancel Changes
                    </button>
                  </li>
                </ul>
              </fieldset>
            </form>
          }
          </div>
        </div>
      </div>
    )
  }
}
