import { FETCHED_EDITIONS, FETCHED_EDITION } from '../../actions'

export const initialState = {
  editions: [],
  byRating: {},
  byGenre: {}
}

/*
 * Example of how to handle a single list
 */
const addToEditionList = (editions, editionKey) => {
  if (!editions.includes(editionKey)) {
    return [...editions, editionKey]
  } else {
    return editions
  }
}

/*
 * Example of how to handle a map of lists
 */
const mapToRatings = (byRating, edition) => {
  const editionKey = edition.editionKey
  const rating = edition.rating ? edition.rating : 'unrated'
  let ratingEditionList = byRating[rating]
  if (!ratingEditionList) {
    ratingEditionList = [editionKey]
  } else {
    ratingEditionList = addToEditionList(ratingEditionList, editionKey)
  }
  return {
    ...byRating,
    [rating]: ratingEditionList
  }
}

const mapGenreToGenreList = (editionsByGenre, genre, editionKey) => {
  let genreEditionsList = editionsByGenre[genre]
  if (!genreEditionsList) {
    genreEditionsList = [editionKey]
  } else {
    genreEditionsList = addToEditionList(genreEditionsList, editionKey)
  }
  return {
    ...editionsByGenre,
    [genre]: genreEditionsList
  }
}

const mapToGenre = (editionsByGenre, edition) => {
  const key = edition.editionKey
  const genreList = edition.genre ? edition.genre : ['unclassified']
  let nextEditionsByGenre = {...editionsByGenre}
  genreList.forEach(genre => {
    nextEditionsByGenre = mapGenreToGenreList(nextEditionsByGenre, genre, key)
  })
  return nextEditionsByGenre
}

const mapEditionToCatalog = (state, edition) => {
  return {
    editions: addToEditionList(state.editions, edition.editionKey),
    byRating: mapToRatings(state.byRating, edition),
    byGenre: mapToGenre(state.byGenre, edition)
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_EDITIONS:
      const { editions } = action.payload
      let nextState = state
      editions.forEach(edition => {
        nextState = mapEditionToCatalog(nextState, edition)
      })
      return nextState
    case FETCHED_EDITION:
      return mapEditionToCatalog(state, action.payload.edition)
    default:
      return state
  }
}