import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import { getPlayers, getPlayer, suspendPlayer, activatePlayer } from '../../apis/adminApi';
import { getPlayerStatusCodes } from '../../apis/storyTimeApi';
import PlayersList from './PlayersList';
import PlayerDetails from './PlayerDetails';

export default class PlayerAdmin extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      playerStatusCodes: {}
    };
  }

  // TODO someday load earlier along with all other static lookups
  loadStatusCodes = (codes = []) => {
    const playerStatusCodes = {};
    codes.forEach(code => {
      playerStatusCodes[code.id] = code;
    });
    this.setState({
      playerStatusCodes
    });
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
      playersById: currentPlayersById,
      selectedPlayer: updatedPlayer
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

  lookupPlayerStatusCode = (codeId) => {
    return this.state.playerStatusCodes[codeId];
  }

  componentDidMount() {
    getPlayerStatusCodes(this.loadStatusCodes);
    getPlayers(this.loadPlayers);
  }

  render() {
    const { players, selectedPlayer } = this.state;
    const statusChangeCallbacks = {
      suspend: this.handleSuspendPlayer,
      activate: this.handleActivatePlayer
    };
    return (
      <StoryTimePage id="player-admin">
        <PlayersList
          players={players}
          onSelect={this.handleSelectPlayer}
          statusCodeLookup={this.lookupPlayerStatusCode}
        />
        <hr />
        <PlayerDetails
          player={selectedPlayer}
          onStatusChange={statusChangeCallbacks}
          statusCodeLookup={this.lookupPlayerStatusCode}
        />
      </StoryTimePage>
    );
  }
}