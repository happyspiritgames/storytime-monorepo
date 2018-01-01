# Storytime Service and Application

## Introduction
This is code for the StoryTime Web application and micro-service backend.  StoryTime is a choose-your-destiny style game where you decide which direction to take after each scene in the story.

## Version 1.0 Release Notes
**Release Details**
* Release Date: 12/28/2017
* URL:  https://hsg-storytime.herokuapp.com

**Features**

An anonymous reader...
1. Sees list of published stories on Library page.
2. Clicks on a story summary to read / play the story.
3. Clicks on any of the choices at the end of a scene to go to the next scene.
4. Sees "The End" whenever a scene has no further options.
5. Replays the story from a story ending.
6. Returns to the Library from the navigation menu or from a story ending.

**Implementation Details**

* API is defined by src/StoryTimeReaderAPI_1.0.0.yaml.
* Story data is stored in JSON flatfiles under storyRepo.
* A story is published when it has a publishedAt timestamp.
* The game runs on Express using Node 8.9.0.
* The user interface is built with React, using create-react-app as a framework.

**Operations**

* The game and its data are auto-deployed to Heroku as hsg-storytime.
* Logs are collected by Papertrail, which is integrated into Heroku.
