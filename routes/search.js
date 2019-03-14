var loadJSON = require('../public/javascripts/api.js');

/* GET search. */
const search = async function (req, res, next) {
    try {
        const data = await loadJSON();
        await res.render('search', { data });
    } catch (err) {
        console.log(err)
    }
};

module.exports = search;
