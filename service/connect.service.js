const axios = require('axios');

const {config: {API, KEY}} = require('../configs');

module.exports = {
    connecting: async (data) => {
        return  axios.get(`${API}` + `${KEY}` + `${data}`);
    }
}

