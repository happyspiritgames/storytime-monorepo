const db = require('./postgres');

const mapCodesToApi = codesFromDb => {
  return codesFromDb.map(code => ({
    code: code.code,
    displayName: code.display_name,
    sortOrder: code.sort_order
  }))
}

const mapTypeToTableName = (type) => {
  let tableName
  switch (type) {
    case 'player-status':
      tableName = 'player_status_codes'
      break

    case 'genre':
      tableName = 'genre_codes'
      break

    case 'rating':
      tableName = 'rating_codes'
      break

    default:
  }
  return tableName
}

exports.getCodeLookup = async (type) => {
  console.log('systemModel.getCodeLookup')
  const tableName = mapTypeToTableName(type)
  if (tableName) {
    const SELECT = `select * from ${tableName}`
    const dbResult = await db.query(SELECT)
    if (dbResult.rowCount > 0) {
      const results = mapCodesToApi(dbResult.rows)
      return results
    }
  }
}
