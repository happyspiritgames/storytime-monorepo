import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { format } from '../util/formatter';

const Scene = props => {
  const { title, prose } = props.scene;
  const formatted = prose.split('\n').map((paragraph, index) => {
    return <CardText key={index}>{ format(paragraph) }</CardText>;
  });
  return (
    <Card id="scene">
      <CardBody>
        <CardTitle>{ title }</CardTitle>
        { formatted }
      </CardBody>
    </Card>
  );
};

export default Scene;