const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// console.log(__dirname)
// console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manish Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Manish Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Manish Sharma',
        message: 'Pass the desired location name to get the weather condition'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                address: req.query.address,
                place,
                geocode: latitude +',' + longitude,
                forecast: forecastData
            })

        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Manish Sharma',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manish Sharma',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('the server is up and running on port '+ port + '...')
})