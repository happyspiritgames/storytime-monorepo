import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import SceneCard from './SceneCard';
import { getSummary, getScene } from '../../services/storyTimeService';

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

  render() {
    const { summary, scene } = this.state;
    let title = 'Loading'
    let content;
    if (!summary) {
      content = (
        <h1 id="story-title">Loading story...please wait.</h1>
      );
    } else if (!scene) {
      content = (
        <h1 id="story-title">Loading first scene...please wait.</h1>
      );
    } else {
      title = summary.title;
      content = (
        <SceneCard scene={scene} onSceneChange={this.handleSceneChange} />
      )
    }
    return (
      <StoryTimePage id="reader" heading={title}>
        {content}
      </StoryTimePage>
    );
  }
}
