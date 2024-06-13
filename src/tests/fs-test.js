const fs = require('fs');

(async() => {
    try {
        const exemptions = await fs.readFileSync('./static/exempt.txt', 'utf-8').toString().toLowerCase();
        console.log(exemptions);
    } catch (err) {
        console.trace(err);
    }
})();