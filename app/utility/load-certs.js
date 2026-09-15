
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
	key: fs.readFileSync(path.resolve(process.cwd(), './app/certs/localhost.key')),
	cert: fs.readFileSync(path.resolve(process.cwd(), './app/certs/localhost.crt'))
};
