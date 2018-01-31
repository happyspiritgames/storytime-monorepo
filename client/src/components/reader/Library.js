import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import StoryCard from './StoryCard';
import { getStorySummaries } from '../../services/storyTimeApi';

export default class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  loadSummaries = (summaries) => {
    this.setState({ stories: summaries });
  }

  componentDidMount() {
    getStorySummaries(this.loadSummaries);
  }

  render() {
    const { stories } = this.state;
    const cards = stories.map(story => <StoryCard key={story.storyKey} summary={story} />);

    return (
      <StoryTimePage id="library" heading="Choose a Story from the Library">
        <h3 className="text-center font-weight-light font-italic">Find something to read.</h3>
        {cards}
      </StoryTimePage>
    );
  }
}