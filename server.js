const express = require('express');
const hbs = require('hbs');
const fs = require(`fs`);

// use local path variable for port, otherwise use port 3000
const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let logs = `${now}: ${req.method} ${req.url}`;
  console.log(logs);
  fs.appendFile('server.log', logs + '\n', (err) => {
    if(err) {
      console.log(`unable to update logs`);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

hbs.registerHelper('siteName', () => {
  return 'some bullshit site'
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home',
    welcomeMessage: 'sup nubs'
    });
  });

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About'
  });
});

app.use(express.static(__dirname + '/public'));

// app.get('/404', (req, res) => {
//   res.send({
//     error: 404,
//     message: 'page not found'
//   });
// });
//
// app.get('/json', (req, res) => {
//   res.send({
//     name: 'joe grotto',
//     likes: [
//       'pizza',
//       'traveling',
//       'adventures',
//       'ice cream',
//       'pups'
//     ]
//   });
// });

app.listen(port, () => {
  console.log(`Application Launched on port:${port}`);
});
