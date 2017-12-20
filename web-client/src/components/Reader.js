import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { getSummary, getScene } from '../services/storyTimeService';
import Signpost from './Signpost';
import Scene from './Scene';

export default class Reader extends Component {
  constructor(props) {
    super(props);
    console.log(props.match);
    const storyKey = props.match.storyKey;
    this.state = {
      storyKey
    };
    this.handleSceneChange = this.handleSceneChange.bind(this);
  }

  processSummary = summary => {
    this.setState({ summary });
    getScene(summary.storyKey, summary.firstSceneKey, this.processScene);
  }

  processScene = scene => {
    this.setState({ scene });
  }

  handleSceneChange = sceneKey => {
    getScene(this.state.storyKey, sceneKey, this.processScene);
  };

  componentDidMount() {
    if (this.state.storySummary === undefined) {
      getSummary(this.state.storyKey);
    }
  }

  render() {
    const { summary, scene } = this.state;
    return (
      <Container id="reader" fluid={ true }>
        <h1 id="story-title">{ summary.title }, by { summary.author }</h1>
        <Scene scene={ scene }/>
        <Signpost signpost={ scene.signpost } onSceneChange={ this.handleSceneChange }/>
      </Container>
    );
  }
}
