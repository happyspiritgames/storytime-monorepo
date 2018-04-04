import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { proofShape, draftSummaryShape } from '../../datastore/dataShapes'
import EditProof from './EditProof'
import PublishingList from './PublishingList'

export default class Publishing extends Component {
  static propTypes = {
    draftSummary: draftSummaryShape,
    activeProof: proofShape,
    proofs: PropTypes.array,
    prepareToPublish: PropTypes.func,
    getProofs: PropTypes.func,
    getProof: PropTypes.func,
    updateProof: PropTypes.func,
    publish: PropTypes.func
  }

  render() {
    const {
      draftSummary,
      activeProof,
      proofs,
      prepareToPublish,
      getProofs,
      getProof,
      updateProof,
      publish
    } = this.props
    return (
      <Switch>
        <Route exact path="/publish/:draftId"
          render={
            (props) => <PublishingList
              draftSummary={draftSummary}
              proofs={proofs}
              loadProofs={ (draftId) => getProofs(draftId) }
              begin={ (draftId) => prepareToPublish(draftId) }
              publish={ (draftId, version) => publish(draftId, version)}
              {...props}
            />
          }
        />
        <Route exact path="/publish/:draftId/:version"
          render={
            (props) => <EditProof
              draftSummary={draftSummary}
              proof={activeProof}
              updateProof={ (draftId, version, proofUpdate) => updateProof(draftId, version, proofUpdate) }
              getProof={ (draftId, version) => getProof(draftId, version) }
              {...props}
            />
          }
        />
      </Switch>
    )
  }
}
