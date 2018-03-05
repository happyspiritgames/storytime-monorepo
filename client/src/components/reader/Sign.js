import React from 'react'
import PropTypes from 'prop-types'

const Sign = ({ text, onClick }) => {
  return (
    <li className="list-group-item" onClick={onClick}>
      {text}
    </li>
  )
}

Sign.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Sign
