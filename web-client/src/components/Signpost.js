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
            teaser="Click or tap here to play again."
            destination={FIRST_SCENE}
            onClick={this.props.onSceneChange}
          />
          <ListGroupItem>
            When you are finished exploring this story, try something else.
            <ul>
              <li><Link to="/library">Choose another story from the library.</Link></li>
              <li><a href="https://www.surveymonkey.com/r/DNXPPJG">Take a quick survey, and give feedback about StoryTime.</a></li>
            </ul>
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
