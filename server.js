// Require Express to run server and routes
const express = require('express');
const app = express();


// Spin up the server
const port = 8080;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Initialize the main project folder
app.use(express.static('website'));

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


app.post("/add", async function(req, res) {
    const body = await req.body;
    projectData = body;
    res.send(projectData);
});

app.get("/all", async(req, res) => {
    console.log(projectData);
    res.send(projectData);
});

// Setup Server
app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
};