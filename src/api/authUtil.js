exports.verifyStoryAuthorization = async (playerId, storyId, res) => {
  const authorId = await draftModel.getStoryOwner(storyId)
  if (!authorId) {
    res.status(404).json(errorMessage('Story not found.'))
    return false
  }
  if (authorId !== playerId) {
    res.status(401).json(errorMessage('You do not have permission to edit that story.'))
    return false
  }
  return true
}
