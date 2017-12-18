import React, { Component } from 'react';
import { Container, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

export default class Catalog extends Component {

  constructor() {
    super();

    this.state = {
      stories: []
    };
    this.handleSelectStory.bind(this);
  }

  componentDidMount() {
    fetch('/api/stories')
      .then(res => res.json())
      .then(summaries => this.setState({ stories: summaries }))
      .catch(err => console.log('Failed to find stories.', err));
  }

  handleSelectStory = (event) => {
    console.log('clicked', event);
  }

  static renderCard(summary) {
    return (
      <Card key={summary.storyKey}>
        <CardBody>
          <CardTitle>{summary.title}</CardTitle>
          <CardSubtitle className="story-author">by <span className="author">{summary.penName}</span></CardSubtitle>
          <CardText>{summary.about}</CardText>
          <Button color="primary" onClick={ this.handleSelectStory }>{summary.tagLine}</Button>
        </CardBody>
      </Card>
    )
  }

  render() {
    const { stories } = this.state;
    const cards = stories.map(story => Catalog.renderCard(story));
    return (
      <Container fluid={ true }>
        {cards}
      </Container>
    );
  }
}