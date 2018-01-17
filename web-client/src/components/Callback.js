import { Component } from 'react';
import { setIdToken, setAccessToken } from '../services/authService';

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
