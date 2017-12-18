import React, { Component } from 'react';
import { Container, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

export default class Catalog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };
    // this.handleSelectStory = this.handleSelectStory.bind(this);
  }

  componentDidMount() {
    fetch('/api/stories')
      .then(res => res.json())
      .then(summaries => this.setState({ stories: summaries }))
      .catch(err => console.log('Failed to find stories.', err));
  }

  handleSelectStory(selectedStoryKey) {
    console.log('clicked', selectedStoryKey);
    this.setState({ selectedStoryKey });
  }

  renderCard(summary) {
    return (
      <Card key={summary.storyKey}>
        <CardBody>
          <CardTitle>{summary.title}</CardTitle>
          <CardSubtitle className="byline">by <span className="author">{ summary.penName }</span></CardSubtitle>
          <CardText className="story-about">{summary.about}</CardText>
          <Button color="primary" onClick={this.handleSelectStory.bind(this, summary.storyKey)}>{ summary.tagLine }</Button>
          <button onClick={this.handleSelectStory}>Click Me</button>
        </CardBody>
      </Card>
    )
  }

  render() {
    console.log(this.state);
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