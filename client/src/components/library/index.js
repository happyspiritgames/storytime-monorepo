import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import FeaturedStory from './FeaturedStory';
import Catalog from './Catalog';

const sampleStories = [
  {
    storyId: "themission",
    title: "The Mission",
    penName: "The Happy Spirit",
    tagLine: "The life of a secret agent is hard. That's why you love it. (Click to play.)",
    about: "You and only you can retrieve the Golden Bars and complete the mission. It is too late now to go back, but why would you?  You are a top agent of a secret spy organization, and you never walk away from a job. Today is no different.",
    firstSceneId: "1",
    publishedAt: "2017-12-21T14:51:37.000Z"
  },
  {
    storyId: "twistoffate",
    title: "A Twist of Fate",
    penName: "Bubba Gump",
    tagLine: "Blargy blargy blargy. Now read this.",
    about: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.",
    firstSceneId: "1",
    publishedAt: "2017-12-21T14:51:37.000Z"
  },
  {
    storyId: "hockeyshots",
    title: "Hockey Shots",
    penName: "Stix McClellan",
    tagLine: "He shoots, he scores, he's the greatest!!!",
    about: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.",
    firstSceneId: "1",
    publishedAt: "2017-12-21T14:51:37.000Z"
  },
  {
    storyId: "bubblelife",
    title: "The Life of a Bubble",
    penName: "Mr. Bubbles",
    tagLine: "Round and round, down the drain.",
    about: "Discover the fascinating life of a bubble as it travels down the drain and on to adventure.",
    firstSceneId: "1",
    publishedAt: "2018-01-31T14:51:37.000Z"
  }
];

export default class Library extends Component {
  render() {
    const featuredStory = sampleStories[0];
    const catalogStories = sampleStories.slice(1);
    return (
      <StoryTimePage id="library">
        <FeaturedStory storySummary={featuredStory} />
        <Catalog summaries={catalogStories} />
      </StoryTimePage>
    );
  }
}