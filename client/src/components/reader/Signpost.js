import React from 'react'
import PropTypes from 'prop-types'
import Sign from './Sign'
import { sceneShape } from '../../datastore/dataShapes'

const DEFAULT_PROMPT = 'What would you like to do?'
const DEFAULT_ENDING_PROMPT = 'The End'

const Signpost = ({ scene, goToScene, playAgain, goToLibrary, goToContact }) => {
  const { endPrompt, signpost } = scene
  let signs
  let prompt
  if (signpost) {
    prompt = endPrompt || DEFAULT_PROMPT
    signs = signpost.map(sign => {
      let signKey = `${sign.sceneId}|${sign.teaser}`
      return (<Sign key={signKey} onClick={() => { goToScene(sign.sceneId) }} text={sign.teaser} />)
    })
  } else {
    prompt = endPrompt || DEFAULT_ENDING_PROMPT
    signs = [
      <Sign
        key='replay'
        onClick={() => { playAgain() }}
        text='Go back to the beginning and try again.'
        icon='arrow-return-left'
      />,
      <Sign
        key='feedback'
        onClick={() => { goToContact() }}
        text='Give some feedback.'
        icon='email'
      />,
      <Sign
        key='library'
        onClick={() => { goToLibrary() }}
        text='Find another story.'
        icon='search'
      />
    ]
  }
  return (
    <div className="card">
      <div className="card-header prompt">
        <h5 className="mb-0">{prompt}</h5>
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
  goToContact: PropTypes.func,
  goToLibrary: PropTypes.func
}

export default Signpost
