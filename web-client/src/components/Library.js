import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getStorySummaries } from '../services/storyTimeService';
import { buildStoryPath } from './Reader';

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

  renderCard(summary) {
    return (
      <Card key={summary.storyKey}>
        <CardBody>
          <CardTitle>{summary.title}</CardTitle>
          <CardSubtitle className="byline">by <span className="author">{ summary.penName }</span></CardSubtitle>
          <CardText className="story-about">{summary.about}</CardText>
          <Link to={buildStoryPath(summary.storyKey)}>{ summary.tagLine }</Link>
        </CardBody>
      </Card>
    )
  }

  render() {
    const { stories, selectedStoryKey } = this.state;
    const cards = stories.map(story => this.renderCard(story));
    const message = (selectedStoryKey)
      ? `You have selected a story (key=${selectedStoryKey}).`
      : 'Select a story to read.';

    return (
      <Container fluid={ true }>
        <h1>{ message }</h1>
        {cards}
      </Container>
    );
  }
}