
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000

mongoose.connect('mongodb://localhost:27017/MyDB', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  Organisation : String,
  firstName : String,
  lastName : String,
  npiNumber : Number
});

const Lookup = mongoose.model("provider", userSchema)

const provider1 = new Lookup({
  Organisation : "HIMERX PHARMACY LLC",
  npiNumber : 1568912004
});
provider1.save();

const provider2 = new Lookup({
  firstName : "GASTON",
  lastName : "BIANCA",
  npiNumber : 1477124121
});
provider2.save();

const provider3 = new Lookup({
  firstName : "SMITH",
  lastName : "LISA",
  npiNumber : 1801069596
});
provider3.save();

const provider4 = new Lookup({
  Organisation : "EMERALD HILLS HAND THERAPY LLC",
  npiNumber : 1144852872
});
provider4.save();

app.get('/providerlookup', (req, res) => {
  res.sendFile(__dirname + "/lookup.html")
});

app.post('/providerlookup', (req, res) => {
  if (req.body.n1) {
    if (req.body.n2) {
      Lookup.find( {firstName : req.body.n1, lastName : req.body.n2} , (function(err, result_list){

        if(result_list){
          res.render('table', {'result' : result_list});
        }
      }))
    } else if (req.body.n3) {
      Lookup.find( {firstName : req.body.n1, npiNumber : req.body.n3} , (function(err, result_list){

        if(result_list){
          res.render('table', {'result' : result_list});
        }
      }))
    } else {
      Lookup.find( {firstName : req.body.n1} , (function(err, result_list)
      {
        if(result_list)
        {
          res.render('table', {'result' : result_list});
        }
      }))
    }}
    else if (req.body.n2) {
      if (req.body.n1) {
        Lookup.find( {firstName : req.body.n1, lastName : req.body.n2} , (function(err, result_list){

          if(result_list){
            res.render('table', {'result' : result_list});
          }
        }))
      } else if (req.body.n3) {
        Lookup.find( {lastName : req.body.n2, npiNumber : req.body.n3} , (function(err, result_list){

          if(result_list){
            res.render('table', {'result' : result_list});
          }
        }))
      } else {
        Lookup.find( {lastName : req.body.n2} , (function(err, result_list){

          if(result_list){
            res.render('table', {'result' : result_list});
          }
        }))
      }
    }
    else if (req.body.n3) {
      if (req.body.n1) {
        Lookup.find( {firstName : req.body.n1, npiNumber : req.body.n3} , (function(err, result_list){

          if(result_list){
            res.render('table', {'result' : result_list});
          }
        }))
      } else if (req.body.n2) {
        Lookup.find( {lastName : req.body.n2, npiNumber : req.body.n3} , (function(err, result_list){

          if(result_list){
            res.render('table', {'result' : result_list});
          }
        }))
      } else {
        Lookup.find( {npiNumber : req.body.n3} , (function(err, result_list){

          if(result_list){
            res.render('table', {'result' : result_list});
          }
        }))
      }}

      else{
        res.send("No Data Found");
      }
    })
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`)
      })
