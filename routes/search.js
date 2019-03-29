const loadJSON = require('../controllers/api.js');
const bodyParser = require('body-parser');

/* GET search. */
const search = async function (req, res, next) {

    try {
        const data = await loadJSON();
        let value = await req.body.value
        await res.render('search', { data });
    } catch (err) {
        console.log(err)
    }
};

module.exports = search;
