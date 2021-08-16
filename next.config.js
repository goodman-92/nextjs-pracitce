const {i18n} = require('./next-18next.config');
const path = require('path')

module.exports = {
	i18n,
	sassOptions: {
		includedPaths: [path.join(__dirname, 'styles')]
	}
}

