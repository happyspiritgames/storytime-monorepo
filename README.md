# Storytime Service and Application

## Introduction
This is code for the StoryTime Web application and micro-service backend.  StoryTime is a choose-your-destiny style game where you decide which direction to take after each scene in the story.  This kind of game is also called Interactive Fiction.  Neat.

## Version 1.4 - Writing Desk

**Release Date:** 3/22/2018

**Features**
* Interface for creating and editing draft story-games. Create as many drafts as you like.
* The summary information for each draft can be changed.
* Scenes can be added to a draft and changed. The Scene editor is where most of the storywriting happens.
* Each scene can have a signpost that points to one or more scenes to go to next.
* A signpost can be changed by adding signs, changing what the signs say, and removing signs.
* The Navigation has been improved, especially with respect to the logged-in state of the player.

**Known Issues**
* An expiring access token causes lots of trouble, which spills out in the logs and leaves the UI in a funky state.
* There is no way to delete drafts or scenes.
* There is no way to publish. How can anyone show their masterpiece to the world? Coming soon...in the next release.
* It would be nice to have a preview of what a player would see. That will done by publishing to a limited audience of you and your trusted pals.
* Lots of improvement ideas...so little time.


## Version 1.3 - API and UI Improvements (Prep for Writing Desk)

**Release Date:** 3/8/2018

**Features**
* Expanded service API to enable authoring, including accepting terms and working on draft stories.
  * Rewrote Swagger definition to follow OAS 3.0, the latest standard.
* Revamped UI design to use straight-up Bootstrap 4.
  * Dropped Reactstrap from new pages.  It just got in the way, since the project hasn't kept up and doc is spotty.
* Integrated Redux, implemented actions and reducers, and wired pages into data store.
  * Story summaries and scenes, player profile, and other goodies are cached in Redux store.


## Version 1.2 - Player Administration

**Release Date:** ~2/4/2018

**Features**
* Introduces notion of roles assigned to users
* Admin role is allowed to see list of players
* Admin can modify any player's status: active, suspended, deleted
  * Nothing happens yet other than the status change

**Operation Notes**
* Started using Heroku pipeline, with staging that flows to production


## Version 1.1 - Identity

**Release Date:** 1/25/2018

**Features**
An anonymous player can
* Create an account by logging in with Facebook or Google.
* Log in and log out of StoryTime.
* Modify his nickname and express a preference to receive email

**Operation Notes**
* Added Postgres database for managing player data


## Version 1.0 - Launch, StoryTime Reader

**Release Date:** 12/28/2017

**Features**

* A complete, original story-game
* Also, players can:
  * See list of published stories on Library page
  * Click on a story summary to read / play the story.
  * Click on any of the choices at the end of a scene to go to the next scene.
  * See "The End" whenever a scene has no further options.
  * Replay the story from a story ending.
  * Return to the Library from the navigation menu or from a story ending.

**Implementation Details**

* API is defined by src/StoryTimeReaderAPI_1.0.0.yaml.
* Story data is stored in JSON flatfiles under storyRepo.
* A story is published when it has a publishedAt timestamp.
* The game runs on Express using Node 8.9.0.
* The user interface is built with React, using create-react-app as a framework.

**Operation Notes**

* The game and its data are auto-deployed to Heroku as hsg-storytime.
* Logs are collected by Papertrail, which is integrated into Heroku.
