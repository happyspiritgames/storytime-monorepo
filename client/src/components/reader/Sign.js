import React from 'react'
import PropTypes from 'prop-types'

const Sign = ({ text, icon, onClick }) => {
  console.log('icon', icon)
  let renderIcon
  if (icon) {
    renderIcon = (<i className={`icon ion-${icon}`}></i>)
  }
  return (
    <li className="list-group-item" onClick={onClick}>
      {renderIcon} {text}
    </li>
  )
}

Sign.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Sign
