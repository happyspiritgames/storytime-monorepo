import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { draftShape } from '../../datastore/dataShapes'

export const newDraftId = '--newDraft--'

export default class EditStory extends Component {
  static propTypes = {
    draft: draftShape,
    loadDraft: PropTypes.func,
    saveDraft: PropTypes.func
  }

  state = {
    isLoading: false,
    draftSummary: {
      title: '',
      tagLine: '',
      about: ''
    },
    draftScenes: {},
    newScene: {
      title: ''
    }
  }

  handleChangeSummary = (event) => {
    const target = event.target
    let updateValue = target.value
    let nextSummary = {
      ...this.state.draftSummary,
      [target.id]: updateValue
    }
    this.setState({ draftSummary: nextSummary })
  }

  handleChangeNewScene = (event) => {
    console.log('implement handleChangeNewScene', event.target)
  }

  handleAddScene = () => {
    console.log('implement handleAddScene')
  }

  handleSave = () => {
    this.props.saveDraft(this.state.draftSummary)
  }

  setDraftAndStopLoading = (draft) => {
    this.setState({
      isLoading: false,
      draftSummary: draft.summary,
      draftScenes: draft.scenes
    })
  }

  componentDidMount() {
    const { draftId } = this.props.match.params
    const { draft, loadDraft } = this.props

    if (draft) {
      console.log('already have draft')
      this.setDraftAndStopLoading(draft)
    } else {
      if (draftId !== newDraftId) {
        console.log('start loading draft')
        this.setState({
          isLoading: true
        })
        loadDraft(draftId)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)

    // redirect page if isNew and draft is set
    if (nextProps.match.params.draftId === newDraftId && nextProps.draft) {
      console.log('just created draft')
      this.props.history.replace(`/writingdesk/${nextProps.draft.summary.storyId}`)
    }

    // end loading once draft has been located
    if (this.state.isLoading && nextProps.draft) {
      console.log('stop loading draft')
      this.setDraftAndStopLoading(nextProps.draft)
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

  renderSceneList() {
    if (!this.state.draftSummary  || !this.state.draftScenes) {
      return null
    }
    const storyId = this.state.draftSummary.storyId
    const sceneIds = Object.keys(this.state.draftScenes)
    const sceneList = sceneIds.map(sceneId => (
      <li key={sceneId} className="list-group-item">
        <span>{this.state.draftScenes[sceneId].title} [id: {this.state.draftScenes[sceneId].sceneId}]</span>
        <Link to={`/writingdesk/${storyId}/${sceneId}`}><i className="icon ion-edit float-right"></i></Link>
      </li>
    ))
    return sceneList
  }

  render() {
    const { isLoading, draftSummary, draftScenes, newScene } = this.state
    if (isLoading) {
      return this.renderLoading()
    }
    return (
      <div id="edit-story">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item">{draftSummary.title}</li>
        </ol>
        <h4 className="text-center">{draftSummary.title}</h4>
        <div className="row section">
          <div className="col">
            <h3>Story Information</h3>
            <form>
              <fieldset>
                <legend className="text-info">Make changes if you like…</legend>
                <div className="form-group">
                  <label>Story Title</label>
                  <input className="form-control" type="text" id="title" value={draftSummary.title} onChange={this.handleChangeSummary} />
                </div>
                <div className="form-group">
                  <label>Tag Line</label>
                  <input className="form-control" type="text" id="tagLine" value={draftSummary.tagLine} onChange={this.handleChangeSummary} />
                  <small className="form-text text-muted">A catchy phrase or sentence to attract readers to your story.</small>
                </div>
                <div className="form-group">
                  <label>About</label>
                  <textarea className="form-control" id="about" value={draftSummary.about} onChange={this.handleChangeSummary}></textarea>
                  <small className="form-text text-muted">A paragraph or two that explains what your story is about.</small>
                </div>
                <button className="btn btn-primary" type="button" onClick={this.handleSave}>Save Story Information</button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="row section">
          <div className="col">
            <h3>Scenes</h3>
            <form>
              <fieldset>
                <legend className="text-info">Add a scene</legend>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Title</span>
                  </div>
                  <input className="form-control" type="text" id="newSceneTitle" value={newScene.title} onChange={this.handleChangeNewScene} />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={this.handleAddScene}>
                      <i className="icon ion-plus float-right"></i>
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
            <ul className="list-group">
              {this.renderSceneList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
