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
      players: samplePlayerData,
      selectedPlayer: samplePlayerData[0]
    }
  }

  loadPlayers = (players = []) => {
    console.log('found players', players);
    if (players) {
      const selected = (players && players[0]) ? players[0] : null;
      this.setState({
        players: players,
        selectedPlayer: selected
      });
    }
  }

  componentDidMount() {
    getPlayers(this.loadPlayers);
  }

  render() {
    const { players, selectedPlayer } = this.state;
    return (
    <StoryTimePage id="player-admin" heading="Players">
      <PlayersList players={players} />
      <hr />
      <PlayerDetails player={selectedPlayer} />
    </StoryTimePage>
    )
  }
}