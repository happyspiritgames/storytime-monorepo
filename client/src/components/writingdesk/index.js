import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WritingDesk from './WritingDesk'

export default class WritingDeskPage extends Component {
  render() {
    return (
      <div id="writing-desk-page">
        <div style={{color: 'purple', textAlign: 'center'}}>
          <h1>Thanks for becoming an author.</h1>
          <h3><i>This is a preview of things to come in the next release.</i></h3>
        </div>
        <hr />
        <WritingDesk />
      </div>
    )
  }
}
