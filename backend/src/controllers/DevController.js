const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
//# Tipo do parametros

//# Query Params: request.query (filters, ordenate, paginate, ...)
//# Route Params: request.params (identificar um recurso na alteracao ou remocao)
// exemplo: app.put('users/:id', (req, res))...

//# Body: 
module.exports = {
    async index(request, response) {
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body // desestruturacao

        let dev = await Dev.findOne({ github_username })

        if (!dev) { // se dev for diferente de null
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            console.log(apiResponse.data)
            const { name = login , avatar_url, bio } = apiResponse.data // se nome nao existir, usara o login
            console.log(name, avatar_url, bio, github_username)
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
          return response.json(dev)
    }
}