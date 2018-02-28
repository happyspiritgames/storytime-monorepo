import React, { Component } from 'react';
import { storySummaryShape } from '../../services/dataShapes';

export default class FeaturedStory extends Component {
  static propTypes = {
    storySummary: storySummaryShape
  };

  render() {
    const { storyId, title, penName, tagLine, about } = this.props.storySummary;
    return (
      <div className="jumbotron">
        <h1>{title}</h1>
        <h4 className="text-muted">by {penName}</h4>
        <p><em>{tagLine}</em></p>
        <p>{about}</p>
        <p><a className="btn btn-primary" role="button" href={`/reader/${storyId}`}>Play</a></p>
      </div>
    );
  }
}