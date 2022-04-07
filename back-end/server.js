const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  app = express();

require('dotenv').config()


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not connected: ' + error)
  }
)

app.use(bodyParser.json());
app.use(cors());



app.use(express.static(path.join(__dirname, 'public')));


// Routes
const datasetRoute = require("./routes/dataset.route");
app.use('/', datasetRoute);


app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
});

app.get('/dataset')

module.exports = app;




