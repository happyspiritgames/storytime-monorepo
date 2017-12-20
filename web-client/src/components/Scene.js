import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

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

export default Scene;