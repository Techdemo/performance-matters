const fs = require('fs');
const path = require('path')

const loadJSON = () => {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, 'results.json')
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                reject(err)
            } else {
                try {
                    resolve(JSON.parse(content));
                } catch (err) {
                    reject(err)
                }
            }
        })
    });
}

module.exports = loadJSON