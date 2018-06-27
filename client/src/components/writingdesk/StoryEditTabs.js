import React from 'react'
import { Link } from 'react-router-dom'

const renderLoading = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link disabled">Loading...</a>
      </li>
    </ul>
  )
}

const renderTabs = (summary, activeTab) => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className={`nav-link ${activeTab==='summary'?'active':''}`} to={`/writingdesk/${summary.storyId}`}>Summary</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeTab==='scenes'?'active':''}`} to={`/writingdesk/${summary.storyId}/scenes`}>Scenes</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Preview</a>
      </li>
      <li className="nav-item">
      <Link className={`nav-link ${activeTab==='publish'?'active':''}`} to={`/publish/${summary.storyId}`}>Publish</Link>
      </li>
    </ul>
  )
}

function StoryEditTabs(props) {
  const { summary, activeTab } = props

  if (!summary) {
    return renderLoading()
  } else {
    return renderTabs(summary, activeTab)
  }
}

export default StoryEditTabs