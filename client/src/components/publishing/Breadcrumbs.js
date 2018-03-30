import React from 'react'
import { Link } from 'react-router-dom'

function Breadcrumbs(props) {
  const { proof } = props
  const crumbs = []

  // TODO make this work for publishing page
  
  crumbs.push(<li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>)
  if (proof && proof.title) {
    crumbs.push(<li className="breadcrumb-item">{proof.title}</li>)
  } else {
    crumbs.push(<li className="breadcrumb-item">Publishing</li>)
  }

  return (
    <ol className="breadcrumb">
      {crumbs}
    </ol>
  )
}

export default Breadcrumbs