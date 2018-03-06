import React, { Component } from 'react'
import './footer.css'

export default class Footer extends Component {

  render() {
    return (
      <div className="footer-basic">
        <footer>
          <div className="social">
            <a href="https://www.instagram.com/"><i className="icon ion-social-instagram"></i></a>
            <a href="https://www.snapchat.com/"><i className="icon ion-social-snapchat"></i></a>
            <a href="https://twitter.com/"><i className="icon ion-social-twitter"></i></a>
            <a href="https://www.facebook.com/"><i className="icon ion-social-facebook"></i></a>
          </div>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="/about">About</a></li>
            <li className="list-inline-item"><a href="https://happyspiritgames.blog/terms-of-service/">Terms</a></li>
            <li className="list-inline-item"><a href="https://happyspiritgames.blog/privacy-policy/">Privacy Policy</a></li>
            <li className="list-inline-item"><a href="/contact">Contact Us</a></li>
          </ul>
          <p className="copyright">Happy Spirit Games © 2018</p>
        </footer>
      </div>
    )
  }
}