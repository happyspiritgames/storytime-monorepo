import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { draftShape } from '../../datastore/dataShapes'

export default class EditScene extends Component {
  static propTypes = {
    draft: draftShape,
    loadDraft: PropTypes.func,
    loadScene: PropTypes.func,
    saveScene: PropTypes.func
  }

  state = {
    draftSummary: {},
    draftScene: {
      title: '',
      prose: '',
      endPrompt: '',
      signpost: []
    },
    draftScenes: [],
    isLoading: false,
    isSignpostDirty: false,
    signpostChanges: {
    },
    newSign: {
      teaser: '',
      destinationId: ''
    }
  }

  establishInitialDraftState = (draft, sceneId) => {
    const draftSummary = draft.summary
    const draftScenesList = Object.keys(draft.scenes).map(sceneId => draft.scenes[sceneId])
    const draftScene = draft.scenes[sceneId]
    this.setState({
      draftSummary,
      draftScene,
      draftScenesList,
      isSignpostDirty: false,
      signpostChange: {},
      isLoading: false
    })
  }

  handleChangeScene = (event) => {
    const target = event.target
    let updateValue = target.value
    let draftScene = {
      ...this.state.draftScene,
      [target.id]: updateValue
    }
    this.setState({ draftScene })
  }

  handleSaveScene = () => {
    this.props.saveScene(this.state.draftSummary.storyId, this.state.draftScene)
  }

  handleAddOrUpdateSign = (destinationId, teaser) => {
    console.log('implement addOrUpdateSign')
  }

  handleDeleteSign = () => {
    console.log('implement deleteSign')
  }

  componentDidMount() {
    const { draftId, sceneId } = this.props.match.params
    if (!draftId || !sceneId) {
      throw new Error('Routing issue: got to EditScene without a draft ID or scene ID')
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
      this.establishInitialDraftState(draft, sceneId)
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
      this.establishInitialDraftState(draft, nextSceneId)
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

  render() {
    const { isLoading, draftSummary, draftScene } = this.state

    if (isLoading) {
      return this.renderLoading()
    }

    return (
      <div id="edit-scene">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${draftSummary.storyId}`}>{draftSummary.title}</Link></li>
          <li className="breadcrumb-item">{draftScene.title}</li>
        </ol>
        <div className="row section">
          <div className="col">
            <h3>Scene</h3>
            <form>
              <fieldset>
                <legend className="text-info">Write to your heart's content…</legend>
                <div className="form-group">
                  <label>Scene Title</label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    value={draftScene.title}
                    onChange={this.handleChangeScene}
                  />
                </div>
                <div className="form-group">
                  <label>Prose</label>
                  <small className="form-text text-muted">This is what people will read when they visit the scene.</small>
                  <textarea
                    className="form-control"
                    id="prose"
                    value={draftScene.prose}
                    onChange={this.handleChangeScene}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Next Scene Prompt</label>
                  <input
                    className="form-control"
                    type="text"
                    id="endPrompt"
                    value={draftScene.endPrompt}
                    onChange={this.handleChangeScene}
                  />
                  <small className="form-text text-muted">Optional text to display before the signpost of next scene options.</small>
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.handleSaveScene}>Save Scene</button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="row section">
          <div className="col">
            <h3>Signpost</h3>
            <form>
              <fieldset>
                <legend className="text-info">Add a sign (where to go next)</legend>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Teaser</span>
                  </div>
                  <input className="form-control" type="text" name="teaser" placeholder="Explains the option to the player." />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Goes to</span>
                  </div>
                  <select className="form-control" name="destinationScene">
                    <option value="new">Create new scene...</option>
                    <option value="sceneA">Scene A</option>
                    <option value="sceneB">Scene B</option>
                    <option value="sceneC">Scene C</option>
                  </select>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="icon ion-plus"></i> Add
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
            <form>
              <fieldset>
                <legend className="text-info">Signs. Change whatever you like…</legend>
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Teaser</span>
                      </div>
                      <input className="form-control" type="text" value="Go to the left." />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="icon ion-trash-a"></i> Remove
                        </button>
                      </div>
                    </div>
                    <input className="form-control-plaintext" type="text" value="Goes to Scene: You Went Left (ID)" readonly="" />
                  </li>
                  <li className="list-group-item">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Teaser</span>
                      </div>
                      <input className="form-control" type="text" value="Go to the right." />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="icon ion-trash-a"></i> Remove
                        </button>
                      </div>
                    </div>
                    <input className="form-control-plaintext" type="text" value="Goes to Scene: You Went Right (ID)" readonly="" />
                  </li>
                  <li className="list-group-item">
                    <button className="btn btn-primary" type="button">
                      Save Changes to Signs
                    </button>
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
