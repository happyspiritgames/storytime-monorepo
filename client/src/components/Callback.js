import { Component } from 'react';
import { setIdToken, setAccessToken } from '../util/authentication';

export default class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = '/';
  }

  render() {
    return null;
  }
}
