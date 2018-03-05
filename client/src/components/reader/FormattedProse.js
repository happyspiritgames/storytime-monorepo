import React from 'react'
import PropTypes from 'prop-types'
import { format } from '../../util/formatter'

const FormattedProse = ({ prose }) => {
  return prose.split('\n').map((paragraph, index) =>
    (<p className="card-text" key={index}>{ format(paragraph) }</p>)
  )
}

FormattedProse.propTypes = {
  prose: PropTypes.string.isRequired
}

export default FormattedProse
