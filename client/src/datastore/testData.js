export const testError = new Error('Bah')

export const testProfile = {
  id: '88888888-8888-4888-8888-888888888888',
  email: 'bubba@happyspiritgames.com',
  nickname: 'bubba',
  createdAt: '2018-01-26T00:02:21.635Z',
  status: 1,
  emailOptInAt: '2018-02-09T17:55:09.176Z',
  authorOptInAt: null,
  penName: null
}

export const testDraftSummary = {
  storyId: "o9n84u0h",
  authorId: "8a095fb3-8cd3-475b-a3c2-a842bac9ee39",
  title: "The Mission",
  tagLine: "Live the life of a secret double agent, as a 10-year-old.",
  about: "Find out what happens on your mission to retrieve the golden bars for the Supreme Leader.",
  firstSceneId: "fbw7x9cr",
  createdAt: "2018-02-08T21:27:12.602Z",
  updatedAt: "2018-02-08T21:27:12.645Z"
}

export const testDraftSummaries = [
  testDraftSummary,
  {
  storyId: "sc0a1sce",
  authorId: "8a095fb3-8cd3-475b-a3c2-a842bac9ee39",
  title: "Killer Whale Bites Man",
  tagLine: "See if you can avoid this freak of nature.",
  about: "What happens when you jump into the tank at Sea World? What did you think would happen, silly.",
  firstSceneId: "62vbkh9q",
  createdAt: "2018-02-23T17:31:38.498Z",
  updatedAt: "2018-02-23T17:32:53.703Z"
  }
]

export const testDraftScene = {
  sceneId: '42',
  title: 'Where Big Things Happen',
  prose: 'This is the scene where everything goes down.',
  endPrompt: 'Now you decide how this ends.'
}

export const testFullDraft = {
  summary: {
    storyId: "oajdg7qc",
    authorId: "8a095fb3-8cd3-475b-a3c2-a842bac9ee39",
    title: "Let's Get Serious",
    tagLine: "This is for reals.",
    about: "Wowie zowie.",
    firstSceneId: "twjj3gx3",
    createdAt: "2018-03-14T16:49:41.338Z",
    updatedAt: "2018-03-14T16:49:41.342Z"
  },
  scenes: [
    {
      sceneId: "twjj3gx3",
      title: "Start Here",
      prose: "Tell your story",
      endPrompt: "Now what?",
      createdAt: "2018-03-14T16:49:41.341Z",
      updatedAt: "2018-03-14T16:49:41.341Z"
    }
  ]
}

export const testSignpost = [
  {
    "destinationId": "fxzqwasr",
    "teaser": "Watch out!",
    "order": 1
  },
  {
    "destinationId": "numhuxyd",
    "teaser": "Yowza!",
    "order": 2
  }
]

export const testEdition = {
  editionKey: 'abcdef-1',
  storyId: 'abcdef',
  version: '1',
  summary: {
    storyId: 'abcdef',
    title: 'Blargy',
    penName: 'bubba',
    tagLine: 'Blargy blargy.',
    about: 'Blargy blargy, blargy blargy',
    firstSceneId: 'jhu3248'
  },
  rating: 'PG',
  genre: ['scifi'],
  publishedAt: '2018-01-26T00:02:21.635Z'
}

export const testEditions = [ testEdition ]

export const testEditionScene = {
  sceneId: 'blargy',
  title: 'Where Big Things Happen',
  prose: 'This is the scene where everything goes down.',
  endPrompt: 'Now you decide how this ends.',
  signpost: []
}

export const testCodes = [
  {
    code: 'blargy',
    displayName: 'Blargy',
    sortOrder: 1
  },
  {
    code: 'blargy-boo',
    displayName: 'Blargy Boo',
    sortOrder: 2
  },
  {
    code: 'blargy-do',
    displayName: 'Blargy Do',
    sortOrder: 3
  },
]