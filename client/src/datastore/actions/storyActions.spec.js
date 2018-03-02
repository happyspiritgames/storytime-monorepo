import * as actions from './index'

describe('reader actions', () => {
  const testError = new Error('bah')

  it('creates FETCH_CATALOG action', () => {
    expect(
      actions.fetchCatalog()
    ).toEqual({
      type: actions.FETCH_CATALOG
    })
  })

  it('creates FETCHED_CATALOG action', () => {
    const catalog = [{ storyId: 'blah', title: 'Blah' }, { storyId: 'blargy', title: 'Blargy' }]
    expect(
      actions.fetchedCatalog(catalog)
    ).toEqual({
      type: actions.FETCHED_CATALOG,
      payload: {
        summaries: catalog
      }
    })
  })

  it('creates FETCH_CATALOG_FAILED action', () => {
    expect(
      actions.fetchCatalogFailed(testError)
    ).toEqual({
      type: actions.FETCH_CATALOG_FAILED,
      payload: testError,
      error: true
    })
  })

  it('creates FETCH_SUMMARY action', () => {
    expect(
      actions.fetchSummary('blah')
    ).toEqual({
        type: actions.FETCH_SUMMARY,
        payload: {
          storyId: 'blah'
        }
    })
  })

  it('creates FETCHED_SUMMARY action', () => {
    expect(
      actions.fetchedSummary({ storyId: 'blah', title: 'Blargy Blah' })
    ).toEqual({
        type: actions.FETCHED_SUMMARY,
        payload: {
          summary: { storyId: 'blah', title: 'Blargy Blah' }
        }
    })
  })

  it('creates FETCH_SUMMARY_FAILED action', () => {
    expect(
      actions.fetchSummaryFailed(testError, 'blah')
    ).toEqual({
      type: actions.FETCH_SUMMARY_FAILED,
      payload: testError,
      error: true,
      meta: {
        storyId: 'blah'
      }
    })
  })

  it('creates FETCH_SCENE action', () => {
    expect(
      actions.fetchScene('blah', '37')
    ).toEqual({
      type: actions.FETCH_SCENE,
      payload: {
        storyId: 'blah',
        sceneId: '37'
      }
    })
  });

  it('loadScene should create FETCHED_SCENE action', () => {
    expect(
      actions.fetchedScene('blah', { sceneId: '37', title: 'Getting Things Done' })
    ).toEqual({
      type: actions.FETCHED_SCENE,
      payload: {
        storyId: 'blah',
        scene: { sceneId: '37', title: 'Getting Things Done' }
      }
    })
  });

  it('creates FETCH_SCENE_FAILED action', () => {
    expect(
      actions.fetchSceneFailed(testError, 'blah', '42')
    ).toEqual({
      type: actions.FETCH_SCENE_FAILED,
      payload: testError,
      error: true,
      meta: {
        storyId: 'blah',
        sceneId: '42'
      }
    })
  })

  // TODO handle error payloads
})
