var express = require('express');
var router = express.Router();

const model = {
  names: require('../models/name.js')
};



/* GET home page. */
router.get('/', async function(req, res, next) {
  let names = await model.names.getRandom(10);

  res.render('index', {names: names});
});

router.get('/name/:name', async function(req, res, next) {
  
  let name = await model.names.get(req.params.name);

  if (name === null)
    res.status('404').send('Name not found');
  else
    res.render('name', name)
});

module.exports = router;
