/**
 * Generates a random universally unique identifier, i.e., UUID version 4, variant 1.
 * @returns {string} UUID that is virtually guaranteed not to collide with any other
 */
exports.generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-axxx-xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
    const r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};

/**
 * Generates a random key of the specified length.
 * @param length of the generated string, 8 characters by default
 * @returns {string} the generated key
 */
exports.generateRandomString = (length = 8) => {
  const offset = 2;
  return Math.random().toString(36).substr(offset, length + offset).toLowerCase();
};
