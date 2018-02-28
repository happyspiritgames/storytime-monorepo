import React from 'react'
import PropTypes from 'prop-types'

const Sign = ({ text, onClick }) => {
  return (
    <li className="list-group-item">
      <a href=""
        onClick={e => {
          e.preventDefault()
          onClick()
        }}
      >
        {text}
      </a>
    </li>
  )
}

Sign.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
