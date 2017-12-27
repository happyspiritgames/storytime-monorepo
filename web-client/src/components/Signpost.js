import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { format } from '../util/formatter';
import { FIRST_SCENE } from './Reader';

class SignOption extends Component {
  handleSceneChange = () => {
    const { destination, onClick } = this.props;
    onClick(destination);
  };

  render() {
    const { teaser } = this.props;
    const formattedTeaser = format(teaser);
    return (
      <ListGroupItem color="default" action={true} onClick={this.handleSceneChange}>
        {formattedTeaser}
      </ListGroupItem>
    );
  }
}

const isTheEnd = (signpost) => {
  return !signpost || !signpost.options || signpost.options.length === 0;
}

export default class Signpost extends Component {
  static propTypes = {
    signpost: PropTypes.object,
    onSceneChange: PropTypes.func
  }

  renderTheEnd() {
    return (
      <div>
        <h5 className="text-center">The End</h5>
        <ListGroup>
          <SignOption
            key={FIRST_SCENE}
            teaser="Play again. Try a different path, and see what else can happen."
            destination={FIRST_SCENE}
            onClick={this.props.onSceneChange}
          />
          <ListGroupItem color="default" action={true}>
            <Link to="/library">Go to the StoryTime library, and play another story.</Link>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }

  render() {
    const { signpost, onSceneChange } = this.props;
    if (isTheEnd(signpost)) {
      return this.renderTheEnd();
    }
    const nextSceneOptions = signpost.options.map(option => (
      <SignOption key={option.sceneKey}
        teaser={option.teaser}
        destination={option.sceneKey}
        onClick={onSceneChange}
      />
    ));
    const promptToRender = signpost.prompt || 'Choose your destiny.';
    return (
      <div>
        <h5>{promptToRender}</h5>
        <ListGroup>
          {nextSceneOptions}
        </ListGroup>
      </div>
    );
  }
};
