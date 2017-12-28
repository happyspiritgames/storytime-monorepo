import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { buildStoryPath } from './Reader';

export default class StoryCard extends Component {
  static propTypes = {
    summary: PropTypes.object
  }

  render() {
    const { summary } = this.props;

    return (
      <Card key={summary.storyKey} id={summary.storyKey} outline color="info" className="story-card">
        <CardBody>
          <CardTitle>{summary.title}</CardTitle>
          <CardSubtitle className="font-italic byline">by <span className="font-weight-bold">{summary.penName}</span></CardSubtitle>
          <CardText className="story-about">{summary.about}</CardText>
          <Link to={buildStoryPath(summary.storyKey)}>{summary.tagLine}</Link>
        </CardBody>
      </Card>
    )
  }
}