import React from 'react'
import { Link } from 'react-router-dom'

function Breadcrumbs(props) {
  const { summary } = props
  const crumbs = []
  crumbs.push(<li key="projects" className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>)
  if (summary && summary.title) {
    crumbs.push(<li key="title" className="breadcrumb-item active">{summary.title}</li>)
  } else {
    crumbs.push(<li key="loading" className="breadcrumb-item active">Loading...</li>)
  }

  return (
    <ol className="breadcrumb">
      {crumbs}
    </ol>
  )
}

export default Breadcrumbs