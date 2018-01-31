import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import { getPlayers } from '../../services/adminService';
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
    return (
      <StoryTimePage id="player-admin" heading="Players">
        <PlayersList players={players} onSelect={this.handleSelectPlayer} />
        <hr />
        <PlayerDetails player={selectedPlayer} />
      </StoryTimePage>
    );
  }
}