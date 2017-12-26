import React, { Component } from 'react';
import { Container } from 'reactstrap';
import SceneCard from './SceneCard';
import { getSummary, getScene } from '../services/storyTimeService';

export function buildStoryPath(storyKey) {
  return `/reader/${storyKey}`;
}

// alias to indicate first scene of story
export const FIRST_SCENE = '__FIRST_SCENE__';

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
    let sceneKeyToUse = sceneKey;
    if (sceneKey === FIRST_SCENE) {
      sceneKeyToUse = this.state.summary.firstSceneKey;
    }
    getScene(this.state.storyKey, sceneKeyToUse, this.processScene);
  };

  componentDidMount() {
    if (this.state.summary === undefined) {
      getSummary(this.state.storyKey, this.processSummary);
    }
  }

  renderNavBar(title) {
    return (
      <nav>
        <div className="navbar-brand">{ title }</div>
      </nav>
    )
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
    const navBar = this.renderNavBar(summary.title);
    return (
      <Container id="reader" fluid={ true }>
        { navBar }
        <SceneCard scene={ scene } onSceneChange={ this.handleSceneChange } />
      </Container>
    );
  }
}
