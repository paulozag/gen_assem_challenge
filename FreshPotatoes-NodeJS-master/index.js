const sqlite = require('sqlite'),
      Sequelize = require('sequelize'),
      request = require('request'),
      express = require('express'),
      app = express();

const { PORT=3000, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;

// START SERVER
Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });

// ROUTES
app.get('/films/:id/recommendations', getFilmRecommendations);

// ROUTE HANDLER
function getFilmRecommendations(req, res) {
  responseObject = getResponseObject();
  console.log(responseObject)
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(responseObject));
}

let getResponseObject = () => {
  return {
    recommendations: [],
    meta: {
      limit: false,
      offset: false
    }
  };
}

module.exports = app;
