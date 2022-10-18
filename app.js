//Required packages
let path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const dateModule = require(path.join(__dirname, "dateModule.js"));  //Require local js file

const app = express();

//App uses ejs to render views in views folder
app.set("view engine", "ejs");

//Body parser for requests
app.use(bodyParser.urlencoded({extended: true}));

//Allows use of static files in public directory (css, images)
app.use(express.static(path.join(__dirname, "public")));

//Lists for each day of the week
let mondayList = ["Fill out this list"];
let tuesdayList = ["Fill out this list"];
let wednesdayList = ["Fill out this list"];
let thursdayList = ["Fill out this list"];
let fridayList = ["Fill out this list"];
let saturdayList = ["Fill out this list"];
let sundayList = ["Fill out this list"];

//Current date
let date = dateModule.getDate();



/*
 * LISTEN route
 * process.env.port listens for Heroku server
 * local port 3000 for testing
 *
 */
app.listen(process.env.PORT || "3000", function(req, res){

  console.log("Listening on localhost:3000)");
});





/*
 * GET routes
 *
 *
 */
app.get("/", function(req, res){

  let currentDay = dateModule.getDay();
  let listToPass = currentDay.toLowerCase() + "List"; //String name of list
  listToPass = eval(listToPass); //Convert string name to actual list array

  res.render("list", {currentDate: date, listTitle: currentDay, taskList: listToPass});
});

app.get("/monday", function(req, res){

  res.render("list", {currentDate: date, listTitle: "Monday", taskList: mondayList});
});

app.get("/tuesday", function(req, res){

  res.render("list", {currentDate: date, listTitle: "Tuesday", taskList: tuesdayList});
});

app.get("/wednesday", function(req, res){

  res.render("list", {currentDate: date, listTitle: "Wednesday", taskList: wednesdayList});
});

app.get("/thursday", function(req, res){

  res.render("list", {currentDate: date, listTitle: "Thursday", taskList: thursdayList});
});

app.get("/friday", function(req, res){

  res.render("list", {currentDate: date, listTitle: "Friday", taskList: fridayList});
});

app.get("/saturday", function(req, res){

  res.render("list", {currentDate: date, listTitle: "Saturday", taskList: saturdayList});
});

app.get("/sunday", function(req, res){

  res.render("list", {currentDate: date, listTitle: "Sunday", taskList: sundayList});
});





/*
 * POST routes
 *
 */
app.post("/", function(req, res){

  // POST request came from add submit button
  if( req.body.addList != null ){

    let currentList = req.body.addList;  //req.body.addList from submit button with name "addList"
    let listToPass = eval(currentList.toLowerCase() + "List"); //Obtain in-use list array from submit button value in POST req

    listToPass.push(req.body.task); //Add task from input of POST req form to in-use list

    res.redirect("/" + currentList.toLowerCase()); //Redirect to view
  }

  // POST request came from remove submit button
  if( req.body.remove != null ){

    let currentList = req.body.removeList; //req.body.removeList from submit button with name "removeList"
    let listToPass = eval(currentList.toLowerCase() + "List"); //Obtain in-use list array from submit button value in POST req

    let indexToRemove = listToPass.indexOf(req.body.remove); //Find and remove from in-use list task in POST req associated with clicked submit button
    listToPass.splice(indexToRemove, 1);

    res.redirect("/" + currentList.toLowerCase()); //Redirect to view
  }
});
