import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import { format } from '../../util/formatter';
import './reader.css';

// const sampleSummary = {
//   storyId: "themission",
//   title: "The Mission",
//   penName: "The Happy Spirit",
//   tagLine: "The life of a secret agent is hard. That's why you love it. (Click to play.)",
//   about: "You and only you can retrieve the Golden Bars and complete the mission. It is too late now to go back, but why would you?  You are a top agent of a secret spy organization, and you never walk away from a job. Today is no different.",
//   firstSceneId: "1",
//   publishedAt: "2017-12-21T14:51:37.000Z"
// };

// const sampleScene = {
//   sceneId: "1",
//   title: "Your Mission",
//   prose: "You are 10 years old.  You are no ordinary 10-year-old.  You are a trusted agent of an elite spy network, and you are on a mission to recover the Golden Bars from a high-security warehouse in a location that you know only too well.  The Supreme Commander has equipped you with a handful of coins and notes that are used by the locals of this region to exchange for valuables.  Your mission is to enter the warehouse, locate the Golden Bars, bribe the security guard, and return to Headquarters.\nShould you be captured in pursuit of your mission, there is no telling what foul consequences await you.  It is best not to be seen.  Your knack for blending in and ability to disappear in a whisper are, without a doubt, why you were chosen for this mission.\nAs you dismount the stairs that lead from Headquarters to the main street, you face your first decision.  Should you head down the street toward your objective or sneak around to the back and take the Forgotten Trail?",
//   endPrompt: "What would you like to do? (Click or tap one of the choices below.)",
//   signpost: [
//     {
//       sceneId: "2",
//       teaser: "Play it cool, and walk directly toward the location where the Golden Bars were last spotted."
//     },
//     {
//       sceneId: "5",
//       teaser: "Use the Forgotten Trail behind Headquarters so that you are less likely to be seen."
//     }
//   ]
// }

export default class Reader extends Component {
  renderSignpost(scene) {
    const { endPrompt, signpost } = scene;
    let signs;
    if (signpost) {
      signs = signpost.map(sign =>
        (<li key={`${sign.sceneId}|${sign.teaser}`} className="list-group-item"><a href={`#${sign.sceneId}`}><span>{sign.teaser}</span></a></li>)
      );
    } else {
      // must be an ending
      signs = [
        <li className="list-group-item"><span>Go back to the beginning and try again.</span></li>,
        <li className="list-group-item"><span>Give some feedback.</span></li>,
        <li className="list-group-item"><span>Find another story.</span></li>
      ];
    }
    return (
      <div className="card">
        <div className="card-header prompt">
          <h5 className="mb-0">{endPrompt}</h5>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {signs}
          </ul>
        </div>
    </div>
    )
  }

  formatProse(prose) {
    return prose.split('\n').map((paragraph, index) =>
      (<p className="card-text" key={index}>{ format(paragraph) }</p>)
    );
  }

  render() {
    const { summary, scene } = this.props;
    const formattedProse = this.formatProse(scene.prose);

    return (
      <StoryTimePage id="reader">
        <h3 className="text-center">{summary.title}</h3>
        <h6 className="text-center"><em>by {summary.penName}</em></h6>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">{scene.title}</h5>
          </div>
          <div className="card-body">
            {formattedProse}
          </div>
        </div>
        {this.renderSignpost(scene)}
      </StoryTimePage>
    );
  }
}