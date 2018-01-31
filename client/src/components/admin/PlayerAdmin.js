import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import { getPlayers } from '../../services/adminService';
import PlayersList from './PlayersList';
import PlayerDetails from './PlayerDetails';

const samplePlayerData = [
  {
    id: '10001000-1000-4000-1000-100010001000',
    email: 'bubba@hsg.com',
    nickname: 'BubbaBubbaGump',
    joinedAt: '01/15/2018',
    optInAt: '01/15/2018'
  },
  {
    id: '20002000-2000-4000-2000-200020002000',
    email: 'hercules@olympus.gr',
    nickname: 'My Hero',
    joinedAt: '01/23/2018'
  }
];

export default class PlayerAdmin extends Component {
  constructor() {
    super();
    this.state = {
      players: []
    };
  }

  loadPlayers = (players = []) => {
    console.log('found players', players);
    if (players && Array.isArray(players)) {
      const playersById = {};
      players.forEach(player => {
        console.log('adding player to map', player.id);
        playersById[player.id] = player;
      });
      console.log('by ID', playersById);
      this.setState({
        players,
        playersById
      });
    }
  }

  handleSelectPlayer = (playerId) => {
    this.setState({
      selectedPlayer: playerId
    });
  }

  componentDidMount() {
    getPlayers(this.loadPlayers);
  }

  renderPlayerDetails = () => {
    const { selectedPlayer } = this.state;
    if (selectedPlayer) {
      const player = this.state.playersById[selectedPlayer];
      if (player) {
        return <PlayerDetails player={player} />;
      }
    }
  }

  render() {
    const { players, selectedPlayer } = this.state;
    return (
      <StoryTimePage id="player-admin" heading="Players">
        <PlayersList players={players} onSelect={this.handleSelectPlayer} />
        <hr />
        {this.renderPlayerDetails()}
      </StoryTimePage>
    );
  }
}