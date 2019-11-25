const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const path = require('path');
const sanitize = require('mongo-sanitize');

//for testing only
const loadTestData = require('./testData');

// connects our back end code with the database
mongoose.connect(config.DB,
 { useNewUrlParser: true , 
    useUnifiedTopology: true
 }, 
 );
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
    loadTestData();
});
db.on('error', (err) => console.log('Error ' + err));



// import routes
const postRoutes = require('./routes/post.routes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use('/api', postRoutes);


//Serve static files from the React app
//app.use(express.static(path.join(__dirname, '/../client/build')));

// sanitize
// app.use(sanitize());
// app.post('*', (req, res) => {
//     const cleaned = req.sanitize(req.body);
//     res.send(cleaned);
// });

//  app.get('*', (req, res) => {
//      res.sendFile(path.join(__dirname + '/../client/build/index.html'));
//    });

app.listen(config.PORT, () => {
    console.log('Server is running on port:', config.PORT );
});