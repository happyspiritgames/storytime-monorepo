import { Component } from 'react';
import { setIdToken, setAccessToken, setRoles } from '../util/authentication';
import { getRoles } from '../services/storyTimeService';

export default class Callback extends Component {

  // TODO make this more concise once it's working; use setRoles as callback to getRoles
  storeRolesLocally = (roles) => {
    console.log('Roles:', roles);
    setRoles(roles);
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();
    getRoles(this.storeRolesLocally);
    window.location.href = '/';
  }

  render() {
    return null;
  }
}
