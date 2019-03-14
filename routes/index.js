const showNav = require ('../public/javascripts/collection.js')


/* GET home page. */
const index =  async function(req, res, next) {
  await res.render('index', { title: 'Oba sheet music' });
};

module.exports = index;
