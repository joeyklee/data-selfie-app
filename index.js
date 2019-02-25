const express = require('express');
const logger = require('morgan');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 3030;
const Datastore = require('nedb');
const pathToData = path.resolve(__dirname, "db/db")
const db = new Datastore({ filename: pathToData});
db.loadDatabase();

const app = express()


// add logging middleware
app.use(logger("dev"))

// Handling JSON data 
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb'}));

// set the path to the public assets
const publicPath = path.resolve(__dirname, 'public')
app.use( express.static(publicPath))

// Show submission page
app.get("/", (req, res) => {
    res.sendFile('index.html')
})

// Show all my submissions
app.get("/logs", (req, res) => {
    res.sendFile('/logs/logs.html')
})

// Show all my submissions
// our API
// GET - /api
app.get("/api", (req, res) => {    
    db.find({}, function (err, docs) {
        if(err){
            return err;
        } 
        res.json(docs);
    });
});

/**  
 * 
 * when we post to the database we will
 * query the weatherjs and get our results
 * and append them to the incoming geocoordinates
 * sent from the client as well as the 
 * selfie from the webcam.
 * */ 
app.post("/api", (req, res) => {
    // our unix timestamp
    const unixTimeCreated = new Date().getTime();
    // add our unix time as a "created" property and add it to our request.body
    const newData = Object.assign({"created": unixTimeCreated}, req.body)

    // add in our data object to our database using .insert()
    db.insert(newData, (err, docs) =>{
        if(err){
            return err;
        }
        res.json(docs);
    });
})


// use the http module to create an http server listening on the specified port
http.createServer(app).listen(port, () =>{
    console.log(`see the magic at: http://localhost:${port}`)
})

