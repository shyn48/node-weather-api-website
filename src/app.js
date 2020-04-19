const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shyn'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shyn'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Shyn'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        res.send({
            error: 'You must provide a address'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longtitude, loaction} = {}) =>{
            if(error){
                res.send({error})
            } else {
                console.log(latitude,loaction,longtitude)
                forecast(latitude,longtitude, (error, data)=>{
                    if(error){
                        res.send({error})
                    } else {
                        res.send({
                            data,
                            loaction,
                            address: req.query.address
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shyn',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shyn',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})