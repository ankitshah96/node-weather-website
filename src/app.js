const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')

const app = express()

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
        name: 'Ankit Shah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ankit Shah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ankit Shah'
    })
}) 

app.get("/products", (req,res)=> {
  if(!req.query.search){
    return res.send({
      error: 'You must provide a Search Term!'
    })
  }
  console.log(req.query.search)
  products=[{name: 'Instagram',rating:'4',category:'Social Media'},
  {name: 'RAM 4GB',rating:'5',category:'Electronics'},
  {name: 'SSD',rating:'5',category:'Electronics'}]
  res.send(
   products.filter(product => product.category===req.query.search)    
  )
  
})


app.get('/weather', (req, res) => {
    console.log("weather api Called: "+req.query.address);
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }    
        forecast(req.query.address, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            //console.log("Server returning: "+forecastData);
            res.send({
                forecast: forecastData,
                location: req.query.address,
                address: req.query.address
            })
        })
    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ankit Shah',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ankit Shah',
        errorMessage: 'Page not found.'
    })
})

const server = app.listen(3001, () => console.log('Server Ready!'))

process.on('SIGTERM', ()=>{
    server.close(() => {
            console.log('Server Terminated!');
    })
 
})

/*  Utilities - unused  */

// const ProgressBar = require('progress')

// const bar = new ProgressBar(':bar', { total: 10 })
// const timer = setInterval(() => {
//   bar.tick()
//   if (bar.complete) {
//     clearInterval(timer)
//   }
// }, 1000)

/* Time taken for Function execution */
// const doSomething = () => console.log('test')
// const measureDoingSomething = () => {
//   console.time('doSomething()')
//   //do something, and measure the time it takes
//   doSomething()
//   console.timeEnd('doSomething()')
// }
// measureDoingSomething()

// const inquirer = require('inquirer');

// inquirer
//   .prompt([
//     {
//       type: 'editor',
//       name: 'story',
//       message: 'Tell me a story, a really long one!',
//     },
//   ])
//   .then(answers => {
//     console.info('Answer:', answers.story);
//   });