import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { getStorySummaries } from '../services/storyTimeService';
import StoryCard from './StoryCard';

export default class Library extends Component {

  // TODO turn this into the top-level container that redux is plugged into.
  // TODO extract CardCatalog component for searching stories.

  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    getStorySummaries(this.loadSummaries);
  }

  loadSummaries = (summaries) => {
    this.setState({ stories: summaries });
  }

  render() {
    const { stories } = this.state;
    const cards = stories.map(story => <StoryCard summary={story} />);

    return (
      <Container id="library" fluid={ true }>
        <h1>Welcome to the StoryTime Library.</h1>
        <h3 className="font-weight-light font-italic">Find something to read.</h3>
        {cards}
      </Container>
    );
  }
}