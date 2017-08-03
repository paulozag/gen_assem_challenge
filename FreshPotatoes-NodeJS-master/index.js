const sqlite = require('sqlite3'),
      Sequelize = require('sequelize'),
      request = require('request'),
      express = require('express'),
      app = express();

const { PORT=3000, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;


// CREATE DB CONNECTION
var db = new sqlite.Database('./db/database.db');

// START SERVER
Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });


// ROUTES
app.get('/films/:id/recommendations', getFilmRecommendations);

// ROUTE HANDLER
function getFilmRecommendations(req, res) {
  let filmID = req.params.id

  let getFilmByID = new Promise(function(resolve,reject){
    db.all('select * from films where id=?', filmID, function(err, rows){
      resolve(rows[0])
    })
  })

  let buildQuery = function(film){
    // pull necessary fields from film and build query to :
    // select all films of same genre filtered by (review count > 5 AND average review > 4)
    // filtered by +/- 15 year date range
    // ordered by id
    // paginated and limited if requested
    // return query string
  }

  let getMatchingFilms = new Promise(function(resolve, reject){
    // build query string
    // perform query
    // resolve (queried collection)
  })


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
