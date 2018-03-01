import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import FeaturedStory from './FeaturedStory';
import Catalog from './Catalog';

export default class Library extends Component {
  render() {
    const { catalog, featured } = this.props
    return (
      <StoryTimePage id="library">
        <FeaturedStory storySummary={featured} />
        <Catalog summaries={catalog} />
      </StoryTimePage>
    );
  }
}
