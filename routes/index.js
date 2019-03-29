/* GET home page. */
const index =  async function(req, res, next) {
  console.log(res['Cache-Control'])
  await res.render('index', { title: 'Oba sheet music' });
};

module.exports = index;
