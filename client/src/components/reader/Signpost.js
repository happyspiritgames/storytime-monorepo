import React from 'react'
import PropTypes from 'prop-types'
import { sceneShape } from '../../datastore/dataShapes'

const Signpost = ({ scene, goToScene, playAgain, goToLibrary }) => {
  const { endPrompt, signpost } = scene
  let signs
  if (signpost) {
    signs = signpost.map(sign => {
      let signKey = `${sign.sceneId}|${sign.teaser}`
      return (<li key={signKey} className="list-group-item" onClick={() => { goToScene(sign.sceneId) }}>{sign.teaser}</li>)
    })
  } else {
    signs = [
      <li key='replay' className="list-group-item" onClick={() => { playAgain() }}>Go back to the beginning and try again.</li>,
      <li key='feedback' className="list-group-item">Give some feedback.</li>,
      <li key='somethingElse' className="list-group-item" onClick={() => { goToLibrary() }}>Find another story.</li>
    ]
  }
  return (
    <div className="card">
      <div className="card-header prompt">
        <h5 className="mb-0">{endPrompt}</h5>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {signs}
        </ul>
      </div>
  </div>
  )
}

Signpost.propTypes = {
  scene: sceneShape,
  goToScene: PropTypes.func,
  playAgain: PropTypes.func,
  goToLibrary: PropTypes.func
}

export default Signpost
