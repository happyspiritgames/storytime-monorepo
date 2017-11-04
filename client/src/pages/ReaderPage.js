import React, { Component } from 'react';
import { Container, Col, Row, Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { getStoryInfo, getScene } from "../services/storyTimeServiceApi";

class SignOption extends Component {
  handleSceneChange = () => {
    const { destination, onClick } = this.props;
    onClick(destination);
  };

  render() {
    const { teaser } = this.props;
    return (
      <ListGroupItem color="primary" action={ true } onClick={ this.handleSceneChange }>
        { teaser }
      </ListGroupItem>
    );
  }
}

const Signpost = props => {
  const { signpost, onSceneChange } = props;
  if (signpost === undefined || signpost.options === undefined || signpost.options.length === 0) {
    return (
      <div>The End</div>
    );
  }

  const nextSceneOptions = signpost.options;
  const options = nextSceneOptions.map(option => (
    <SignOption key={ option.destination }
                teaser={ option.teaser }
                destination={ option.destination }
                onClick={ onSceneChange }
    />
  ));
  const optionList = (
    <ListGroup>
      { options }
    </ListGroup>
  );
  return (
    <Card>
      <CardBody>
        <CardTitle>{ signpost.prompt }</CardTitle>
        <CardText tag="div">
          <Row>
            <Col xs="2"><img src="/img/signpost.jpg" className="img-fluid" alt="Choose a direction"/></Col>
            <Col>{ optionList }</Col>
          </Row>
        </CardText>
      </CardBody>
    </Card>
  );
};

const Scene = props => {
  const { title, prose } = props.scene;
  return (
    <Card id="scene">
      <CardBody>
        <CardTitle>{ title }</CardTitle>
        <CardText>{ prose }</CardText>
      </CardBody>
    </Card>
  );
};

export default class ReaderPage extends Component {

  constructor() {
    super();
    const story = getStoryInfo('blargy');
    const scene = getScene(story.summary.key, story.summary.firstScene);
    this.state = {
      currentStory: story,
      currentScene: scene
    };
    console.log(this.state);

    this.handleSceneChange = this.handleSceneChange.bind(this);
  }

  handleSceneChange = sceneKey => {
    const { currentStory } = this.state;
    const scene = getScene(currentStory.summary.key, sceneKey);  // TODO use thunk to invoke action
    if (scene) {
      this.setState({ currentScene: scene });
    } else {
      console.log('Scene not found for:', sceneKey);
    }
  };

  render() {
    const { currentStory, currentScene } = this.state;
    return (
      <Container id="reader" fluid={ true }>
        <h1 id="story-title">{ currentStory.summary.title }, by { currentStory.summary.author }</h1>
        <Scene scene={ currentScene }/>
        <Signpost signpost={ currentScene.signpost } onSceneChange={ this.handleSceneChange }/>
      </Container>
    );
  }
}
