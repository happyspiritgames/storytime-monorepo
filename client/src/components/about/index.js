import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './about.css'

export default class About extends Component {
  render() {
    return (
      <div id="about">
        <div className="message">
          <p>Greetings! <img className="float-right headshot" src="/img/DaveMount.png" width="150" alt="The Happy Spirit" /></p>
          <p>You have found StoryTime, the first game produced by Happy Spirit Games. If you are new to
            StoryTime, give <Link to="/reader/1-themission"><em>The Mission</em></Link> a try.  Go
            through a few times, making different choices each time. That will keep you entertained
            for anywhere from 15 to 30 minutes.</p>
          <p>You are one of the first people to play StoryTime.  I would love your feedback.  Anytime you
            reach "The End" of the story, one of the options will take you to a survey.  Answer the
            questions as candidly as you like.  Thanks!</p>
          <p>If you think this isn't much, I don't blame you.  I am just getting warmed up.  Have fun with
            what you see, and be sure to <a href="http://eepurl.com/c9mZIr">register for my
            Insider Newsletter</a> to stay in the loop about improvements throughout the year.</p>
          <p>You can
            also <a href="https://happyspiritgames.blog/">follow the Happy Spirit Games
            blog</a>.</p>
          <p>Have a blast!<br/><em>Dave Mount, a.k.a. The Happy Spirit</em></p>
        </div>
      </div>
    )
  }
}
