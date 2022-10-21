/*
 * Main server with routes
 */

//Required packages
let path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const countModule = require(path.join(__dirname, "countModule.js"));  //Required local module

const app = express();

//App uses ejs to render views in views folder
app.set("view engine", "ejs");

//Body parser for requests
app.use(bodyParser.urlencoded({extended: true}));

//Allows use of static files in public directory (css, images)
app.use(express.static(path.join(__dirname, "public")));





/*
 * App variables
 */
//Lists for each day of the week
let mondayList = ["Fill out this list"];
let tuesdayList = ["Fill out this list"];
let wednesdayList = ["Fill out this list"];
let thursdayList = ["Fill out this list"];
let fridayList = ["Fill out this list"];
let saturdayList = ["Fill out this list"];
let sundayList = ["Fill out this list"];





/*
 * LISTEN route
 * process.env.port listens for Heroku server
 * local port 3000 for testing
 *
 */
app.listen(process.env.PORT || "3000", function(req, res){

  console.log("Listening on web server or localhost:3000)");
});



/*
 * GET routes
 *
 *
 */
app.get("/", function(req, res){
  //Client side dateScript will reroute to current day
  res.render("list", {listTitle: "", taskList: [], taskCount: 0});
});

//Render based on query parameter day
app.get("/:day", function(req, res){

  let day = req.params.day;
  let list = eval(day + "List");

  res.render("list", {listTitle: day[0].toUpperCase()+day.substring(1), taskList: list, taskCount: countModule.countTasks(list) });
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
