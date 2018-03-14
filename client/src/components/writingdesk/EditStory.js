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
    console.log('implement handleChangeSummary', event.target)
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

  componentDidMount() {
    const { draftId } = this.props.match.params
    const { draft, loadDraft } = this.props

    if (draft) {
      this.setState({
        isLoading: false,
        summary: draft.summary,
        scenes: draft.scenes
      })
    } else {
      if (draftId !== newDraftId) {
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
      this.props.history.replace(`/writingdesk/${nextProps.draft.summary.storyId}`)
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
    const { isLoading, draftSummary, draftScenes, newScene } = this.state
    console.log('active draft summary', draftSummary)
    if (isLoading) {
      return this.renderLoading()
    }
    console.log('draft summary', draftSummary)
    console.log('draft scenes', draftScenes)
    return (
      <div id="edit-story">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item">The Mission</li>
        </ol>
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
              <li className="list-group-item">
                <span>Scene A Title</span>
                <Link to="/writingdesk/themission/A"><i className="icon ion-edit float-right"></i></Link>
              </li>
              <li className="list-group-item">
                <span>Scene B Title</span>
                <Link to="/writingdesk/themission/B"><i className="icon ion-edit float-right"></i></Link>
              </li>
              <li className="list-group-item">
                <span>Scene C Title</span>
                <Link to="/writingdesk/themission/C"><i className="icon ion-edit float-right"></i></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
