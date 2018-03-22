import React from 'react'
import { Link } from 'react-router-dom'

function Breadcrumbs(props) {
  const { summary } = props
  const crumbs = []
  crumbs.push(<li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>)
  if (summary && summary.title) {
    crumbs.push(<li className="breadcrumb-item">{summary.title}</li>)
  } else {
    crumbs.push(<li className="breadcrumb-item">Loading...</li>)
  }

  return (
    <ol className="breadcrumb">
      {crumbs}
    </ol>
  )
}

export default Breadcrumbs