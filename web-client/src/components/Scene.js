import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

const Scene = props => {
  const { title, prose } = props.scene;
  const formatted = prose.split('\n').map(paragraph => {
    return <div>{ paragraph }</div>;
  });
  return (
    <Card id="scene">
      <CardBody>
        <CardTitle>{ title }</CardTitle>
        <CardText>{ formatted }</CardText>
      </CardBody>
    </Card>
  );
};

export default Scene;