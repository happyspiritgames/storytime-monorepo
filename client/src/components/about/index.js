import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './about.css'

export default class About extends Component {
  render() {
    return (
      <div id="about">
        <div className="message">
          <h1>About StoryTime</h1>
          <p>Greetings! <img className="float-right headshot" src="/img/HappySpirit.png" width="150" alt="The Happy Spirit" /></p>
          <p>You have found StoryTime, the flagship game of <a href="https://happyspiritgames.blog/about/">Happy Spirit Games</a>.
            If you are new to StoryTime, give <Link to="/reader/1-themission"><em>The Mission</em></Link> a try.  Go
            through a few times, making different choices each time. That should keep you entertained
            for anywhere from 5 to 30 minutes.</p>
          <p>Not too impressed? Sure, no hard feelings. Why not create your own story-game? StoryTime has everything you need.</p>
          <ol>
            <li>Sign in. (Click on the upper right corner.)</li>
            <li>Navigate to your new account using the Account menu.</li>
            <li>Agree to the terms of being an author.</li>
          </ol>
          <p>At that point, you will have full access to the StoryTime Writing Desk. Begin a new story, add scenes,
            and assemble some signposts to tie the scenes together. When your masterpiece is ready, publish it. Your story will
            appear in the library, ready for the world to play.</p>
          <p>Fun stuff!</p>
          <p>Have fun with it, and be sure to <a href="https://happyspiritgames.blog/subscribe-to-the-insider-newsletter/">register for my
            Insider Newsletter</a> to stay in the know about improvements to StoryTime.</p>
          <p>You can also <a href="https://happyspiritgames.blog/">follow the Happy Spirit Games
            blog</a>.</p>
          <p>Have a blast!<br/><em>Dave Mount, a.k.a. The Happy Spirit</em></p>
        </div>
      </div>
    )
  }
}
