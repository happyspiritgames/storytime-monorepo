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
    draftScenesList: [],
    activeScene: {},
    activeSignpost: [],
    signpostChanges: {
      toUpdate: [
        {
          destinationId: '42',
          teaser: 'Go here',
          signOrder: 10
        }
      ],
      toDelete: []
    },
    newSign: {
      teaser: '',
      destinationId: ''
    }
  }

  // TODO extract signpostChangeUtil once it's working here

  initialize = (draft, sceneId) => {
    const draftSummary = draft.summary
    const draftScenesList = Object.keys(draft.scenes).map(sceneId => draft.scenes[sceneId])
    const activeScene = draft.scenes[sceneId]
    this.setState({
      isLoading: false,
      draftSummary,
      draftScenesList,
      activeScene,
      activeSignpost: activeScene.signpost,
      signpostChanges: {
        toUpdate: [],
        toDelete: []
      },
      newSign: {
        teaser: '',
        destinationId: ''
      }
    })
  }

  handleSaveSignpostUpdates = () => {
    console.log('handleUpdateSignpost')
    const { draftSummary, activeScene, signpostChanges } = this.state
    this.props.updateSignpost(draftSummary.storyId, activeScene.sceneId, signpostChanges)
  }

  handleAddSign = (destinationId, teaser) => {
    console.log('implement handleAddSign')
    // const target = event.target
    // let updateValue = target.value
    // let draftScene = {
    //   ...this.state.draftScene,
    //   [target.id]: updateValue
    // }
    // this.setState({ draftScene })
  }

  handleDeleteSign = () => {
    console.log('implement handleDeleteSign')
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

  render() {
    const { isLoading, draftSummary, activeScene } = this.state

    if (isLoading) {
      return this.renderLoading()
    }

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
                          <i className="fa fa-remove float-right"></i>
                        </button>
                      </div>
                    </div>
                    <input className="form-control-plaintext"
                      type="text"
                      value="Goes to Scene: You Went Left (ID)"
                      readonly=""
                    />
                  </li>
                  <li className="list-group-item">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Teaser</span>
                      </div>
                      <input className="form-control" type="text" value="Go to the right." />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fa fa-remove float-right"></i>
                        </button>
                      </div>
                    </div>
                    <input className="form-control-plaintext"
                      type="text"
                      value="Goes to Scene: You Went Right (ID)"
                      readonly=""
                    />
                  </li>
                  <li className="list-group-item">
                    <button className="btn btn-primary" type="button">Save Changes to Signs</button>
                  </li>
                </ul>
              </fieldset>
            </form>
            <form>
              <fieldset>
                <legend className="text-info">Add a sign (where to go next)</legend>
                <input className="form-control" type="text" name="sceneTitle" placeholder="Teaser (what the option says)" />
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Goes to</span>
                  </div>
                  <input className="form-control" type="text" placeholder="scene select goes here" />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      Add Sign&nbsp;<i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-11">
                      <select className="form-control">
                        <option value="new">Create new scene...</option>
                        <option value="sceneA" selected="">Scene A</option>
                        <option value="sceneB">Scene B</option>
                        <option value="sceneC">Scene C</option>
                      </select>
                    </div>
                    <div className="col-1">
                      <button className="btn btn-primary" type="button">
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
