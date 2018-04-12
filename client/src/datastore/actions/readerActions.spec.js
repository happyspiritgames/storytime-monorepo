import * as actions from './index'

describe('reader actions', () => {
  let testTimestamp

  it('creates READER_FETCHING action', () => {
    expect(actions.readerFetching()).toEqual({
      type: actions.READER_FETCHING
    })
  })

  it('creates READER_READY action', () => {
    expect(actions.readerReady()).toEqual({
      type: actions.READER_READY
    })
  })

  it('creates READER_NOT_READY action', () => {
    expect(actions.readerNotReady()).toEqual({
      type: actions.READER_NOT_READY
    })
  })

  it('creates action BEGIN_STORY', () => {
    testTimestamp = Date.now()
    expect(actions.beginStory('abcdefgh-1', 'qwertyui', testTimestamp))
    .toEqual({
      type: actions.BEGIN_STORY,
      payload: {
        editionKey: 'abcdefgh-1',
        sceneId: 'qwertyui',
        startTime: testTimestamp
      }
    })
  })

  it('creates VISIT_SCENE action', () => {
    testTimestamp = Date.now()
    expect(actions.visitScene('blah', testTimestamp))
    .toEqual({
      type: actions.VISIT_SCENE,
      payload: {
        sceneId: 'blah',
        timestamp: testTimestamp
      }
    })
  })

})