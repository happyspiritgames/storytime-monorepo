import React, { Component } from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import { format } from '../util/formatter';

class SignOption extends Component {
  handleSceneChange = () => {
    const { destination, onClick } = this.props;
    onClick(destination);
  };

  render() {
    const { teaser } = this.props;
    const formatted = format(teaser);
    return (
      <ListGroupItem color="default" action={ true } onClick={ this.handleSceneChange }>
        { formatted }
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
    <SignOption key={ option.sceneKey }
                teaser={ option.teaser }
                destination={ option.sceneKey }
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

export default Signpost;
