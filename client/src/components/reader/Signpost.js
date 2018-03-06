import React from 'react'
import PropTypes from 'prop-types'
import Sign from './Sign'
import { sceneShape } from '../../datastore/dataShapes'

const Signpost = ({ scene, goToScene, playAgain, goToLibrary }) => {
  const { endPrompt, signpost } = scene
  let signs
  if (signpost) {
    signs = signpost.map(sign => {
      let signKey = `${sign.sceneId}|${sign.teaser}`
      return (<Sign key={signKey} onClick={() => { goToScene(sign.sceneId) }} text={sign.teaser} />)
    })
  } else {
    signs = [
      <Sign key='replay' onClick={() => { playAgain() }} text='Go back to the beginning and try again.' />,
      <Sign key='feedback' onClick={() => { console.log('implement feedback') }} text='Give some feedback.' />,
      <Sign key='library' onClick={() => { goToLibrary() }} text='Find another story.' />
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
