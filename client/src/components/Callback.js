import { Component } from 'react';
import { setIdToken, setAccessToken, setRoles } from '../util/authentication';
import { getRoles } from '../services/storyTimeService';

export default class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    getRoles(setRoles);
    window.location.href = '/';
  }

  render() {
    return null;
  }
}
