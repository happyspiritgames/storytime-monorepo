import { getHeaders } from '../util/authentication';

// TODO do not call these methods without admin role
// NOTE if someone adds admin role to client, service must still prevent access
export const getPlayers = (processResponse) => {
  fetch('/api/admin/players', { headers: getHeaders() })
    .then(res => res.json())
    .then(players => processResponse(players))
    .catch(err => console.log('Failed to get players', err));
}

export const getPlayer = (playerId, processPlayer) => {
  fetch(`/api/admin/players/${playerId}`, { headers: getHeaders() })
    .then(res => res.json())
    .then(player => processPlayer(player))
    .catch(err => console.log('Failed to get player', err));
}

export const suspendPlayer = (playerId, onSuccess) => {
  fetch(`/api/admin/players/${playerId}/suspend`,
    {
      method: 'PUT',
      headers: getHeaders()
    })
    .then(res => onSuccess(playerId))
    .catch(err => console.log('Failed to suspend player', err));
}

export const activatePlayer = (playerId, onSuccess) => {
  fetch(`/api/admin/players/${playerId}/activate`,
    {
      method: 'PUT',
      headers: getHeaders()
    })
    .then(res => onSuccess(playerId))
    .catch(err => console.log('Failed to activate player', err));
}

export const deletePlayer = (playerId, onSuccess) => {
  fetch(`/api/admin/players/${playerId}/delete`,
    {
      method: 'PUT',
      headers: getHeaders()
    })
    .then(res => onSuccess(playerId))
    .catch(err => console.log('Failed to delete player', err));
}
