import React, { Component } from 'react';

export default class Catalog extends Component {

    constructor() {
        super();

        this.state = {
            stories: []
        };
    }

    componentDidMount() {
        fetch('/api/stories')
            .then(res => res.json())
            .then(summaries => this.setState({ stories: summaries }))
            .catch(err => console.log('Failed to find stories.', err));
    }

    static renderCard(summary) {
        console.log('summary to render as card', summary);
        return (
            <div className="story-card" key={ summary.storyKey }>
                <div className="story-title">{ summary.title }</div>
                <div className="story-penName">{ summary.penName }</div>
                <div className="story-tagLine">{ summary.tagLine }</div>
                <div className="story-about">{ summary.about }</div>
                <div className="story-publishedAt">{ summary.publishedAt }</div>
                <a href={`/stories/${ summary.storyKey }/scenes/${ summary.firstSceneKey }`}>Read It!</a>
            </div>
        )
    }

    render() {
        const { stories } = this.state;
        console.log('rendering stories', this.state.stories);
        const cards = stories.map(story => Catalog.renderCard(story));
        return (
            <div id="catalog">
                {cards}
            </div>
        );
    }
}