function handleInternalServerError(error, res) {
  console.error('Error executing query:', error);
  return res.status(500).send('Internal Server Error');
}

module.exports = {
  handleInternalServerError,
};