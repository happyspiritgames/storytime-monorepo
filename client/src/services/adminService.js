import { getHeaders } from '../util/authentication';

// TODO do not call these methods with admin role
// NOTE if someone adds admin role to client, service must still prevent access
export const getPlayers = (processResponse) => {
  fetch('/api/admin/players', { "headers": getHeaders() })
    .then(res => res.json())
    .then(players => processResponse(players))
    .catch(err => console.log('Failed to find players', err));
}
