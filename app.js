const http = require('http');
const fs = require('fs');

const express = require('express');

const app = express();

const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

const bodyParser = require('body-parser');
require('dotenv/config');

const cors = require('cors');
app.use(cors()); //Allows one to bypass the CORS policy that stops cross domain access
app.use(bodyParser.json()); //Helps format the json so it can work between Mongo and JS

const server = http.Server(app);

var PORT = process.env.PORT || 5500;

async function main(){
    const uri = "mongodb+srv://admin:So92dFEV@cluster0.vldto.mongodb.net/poster?retryWrites=true&w=majority";

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
        await client.connect();

        await listDatabases(client);

    }
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
}   

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Here they are:");
    databasesList.databases.forEach(db => console.log(`- ${db.name}`));
}
//main().catch(console.error);

app.use(express.static('game'));


server.listen(PORT, () =>{
    console.log('Server running');
})