import { getHeaders } from '../util/authentication';

export const getPlayers = (processResponse) => {
  fetch('/api/admin/players', { "headers": getHeaders() })
    .then(res => res.json())
    .then(players => processResponse(players))
    .catch(err => console.log('Failed to find players', err));
}
