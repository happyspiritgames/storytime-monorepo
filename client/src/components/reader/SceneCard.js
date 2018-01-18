import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardBody, CardFooter } from 'reactstrap';
import { format } from '../../util/formatter';
import Signpost from './Signpost';

export default class SceneCard extends Component {

  static propTypes = {
    scene: PropTypes.object,
    onSceneChange: PropTypes.func
  };

  render() {
    const { scene, onSceneChange } = this.props;
    const { title, prose, signpost } = scene;

    const formattedProse = prose.split('\n').map((paragraph, index) => {
      return <CardText key={index}>{ format(paragraph) }</CardText>;
    });

    return (
      <Card id="scene" outline color="info">
        <CardHeader className="text-center">
          <h5 className="mb-0">{ title }</h5>
        </CardHeader>
        <CardBody>
          { formattedProse }
        </CardBody>
        <CardFooter>
          <Signpost signpost={ signpost } onSceneChange={ onSceneChange } />
        </CardFooter>
      </Card>
    );
  }
}
