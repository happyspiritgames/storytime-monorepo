import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import { getPlayers, getPlayer, suspendPlayer, activatePlayer } from '../../services/adminApi';
import PlayersList from './PlayersList';
import PlayerDetails from './PlayerDetails';

export default class PlayerAdmin extends Component {
  constructor() {
    super();
    this.state = {
      players: []
    };
  }

  loadPlayers = (players = []) => {
    if (players && Array.isArray(players)) {
      const playersById = {};
      players.forEach(player => {
        playersById[player.id] = player;
      });
      this.setState({
        players,
        playersById
      });
    }
  }

  handleSelectPlayer = (playerId) => {
    const selectedPlayer = this.state.playersById[playerId];
    this.setState({
      selectedPlayer
    });
  }

  loadPlayer = (updatedPlayer) => {
    const currentPlayers = this.state.players;
    const playerIndex = currentPlayers.findIndex((player) => player.id === updatedPlayer.id);
    if (playerIndex > -1) {
      currentPlayers.splice(playerIndex, 1, updatedPlayer);
    }
    const currentPlayersById = this.state.playersById;
    currentPlayersById[updatedPlayer.id] = updatedPlayer;
    this.setState({
      players: currentPlayers,
      playersById: currentPlayersById
    });
  }

  handlePlayerUpdate = (playerId) => {
    getPlayer(playerId, this.loadPlayer);
  }

  handleSuspendPlayer = (playerId) => {
    suspendPlayer(playerId, this.handlePlayerUpdate);
  }

  handleActivatePlayer = (playerId) => {
    activatePlayer(playerId, this.handlePlayerUpdate);
  }

  componentDidMount() {
    getPlayers(this.loadPlayers);
  }

  // renderPlayerDetails = () => {
  //   const { selectedPlayer } = this.state;
  //   if (selectedPlayer) {
  //     const player = this.state.playersById[selectedPlayer];
  //     if (player) {
  //       return <PlayerDetails player={player} />;
  //     }
  //   }
  // }

  render() {
    const { players, selectedPlayer } = this.state;
    const statusChangeCallbacks = {
      suspend: this.handleSuspendPlayer,
      activate: this.handleActivatePlayer
    }
    return (
      <StoryTimePage id="player-admin" heading="Players">
        <PlayersList players={players} onSelect={this.handleSelectPlayer} />
        <hr />
        <PlayerDetails player={selectedPlayer} onStatusChange={statusChangeCallbacks} />
      </StoryTimePage>
    );
  }
}