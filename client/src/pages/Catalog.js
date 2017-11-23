import React, { Component } from 'react';
import { getRecommendations } from '../services/storyTimeServiceApi';

export default class Catalog extends Component {

    constructor() {
        super();

        this.state = {
            stories: []
        };
        this.fetchStories();
    }

    fetchStories() {
        getRecommendations().then(summaries => {
            this.setState({ stories: summaries });
        }).catch(err => {
            console.log('Failed to find stories.', err);
        });
    }

    renderCard(summary) {
        console.log(summary);
        return (
            <div className="story-card" key={ summary.storyKey }>
                <div className="story-title">{ summary.title }</div>
                <div className="story-penName">{ summary.penName }</div>
                <div className="story-tagLine">{ summary.tagLine }</div>
                <div className="story-about">{ summary.about }</div>
                <div className="story-publishedAt">{ summary.publishedAt }</div>
                <a href={`/stories/${ summary.storyKey }/scenes/${ summary.firstScene }`}>Read It!</a>
            </div>
        )
    }

    render() {
        const { stories } = this.state;
        const cards = stories.map(story => this.renderCard(story.summary));
        return (
            <div id="catalog">
                {cards}
            </div>
        );
    }
}