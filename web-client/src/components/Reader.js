import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { getSummary, getScene } from '../services/storyTimeService';
import Signpost from './Signpost';
import Scene from './Scene';

export default class Reader extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const storyKey = params.storyKey;
    this.state = {
      storyKey
    };
    this.processSummary = this.processSummary.bind(this);
    this.processScene = this.processScene.bind(this);
    this.handleSceneChange = this.handleSceneChange.bind(this);
  }

  processScene = scene => {
    this.setState({ scene });
  }

  processSummary = summary => {
    this.setState({ summary });
    getScene(summary.storyKey, summary.firstSceneKey, this.processScene);
  }

  handleSceneChange = sceneKey => {
    getScene(this.state.storyKey, sceneKey, this.processScene);
  };

  componentDidMount() {
    if (this.state.summary === undefined) {
      getSummary(this.state.storyKey, this.processSummary);
    }
  }

  render() {
    const { summary, scene } = this.state;
    if (!summary) {
      return (
        <Container id="reader" fluid={ true }>
          <h1 id="story-title">Loading story...please wait.</h1>
        </Container>
      );
    } else if (!scene) {
      return (
        <Container id="reader" fluid={ true }>
          <h1 id="story-title">Loading first scene...please wait.</h1>
        </Container>
      );
    }
    return (
      <Container id="reader" fluid={ true }>
        <h1 id="story-title">{ summary.title }, by { summary.penName }</h1>
        <Scene scene={ scene }/>
        <Signpost signpost={ scene.signpost } onSceneChange={ this.handleSceneChange }/>
      </Container>
    );
  }
}
