/*
 * Main server
 */

//Required packages
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const countModule = require(path.join(__dirname, "countModule.js"));  //Required local module

const app = express();

//App uses ejs to render views in views folder
app.set("view engine", "ejs");

//Body parser for requests
app.use(bodyParser.urlencoded({extended: true}));

//Allows use of static files in public directory (css, images)
app.use(express.static(path.join(__dirname, "public")));

//Mongoose
//mongoose.connect("mongodb://localhost:27017/tasklist");
mongoose.connect("mongodb+srv://admin:adminpassword@philipjlin.9wd1zfh.mongodb.net/tasklist");





/******************** DATABASE CODE ********************/
/*
 * Task DOCUMENTS are stored in tasks COLLECTION in tasklist DB
 * Each task has day of the week and task name
 *
 */
//Schema for mongodb database
const taskSchema = new mongoose.Schema({

  day: String,
  task: {
    type: String,
    maxLength: 32
  }
});

//Model for mongodb database
const Task = mongoose.model("Task", taskSchema);

//(Sample) document to add to database
let sampleTask = new Task({

  day: "monday",
  task: "This is a sample task."
});



/******************** APP VARIABLES ********************/






/******************** SERVER ROUTES ********************/
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

  //NOTE: client-side dateScript.js will reroute default route to current day route using client time zone

  res.render("list", {listTitle: "", taskList: [], taskCount: 0});
});



//Render based on query parameter day
app.get("/:day", function(req, res){

  let day = req.params.day;

  //Find tasks in database of certain day
  Task.find({ day:day }, function(err, foundTasks){

    res.render("list", {listTitle: day[0].toUpperCase()+day.substring(1), taskList: foundTasks, taskCount: countModule.countTasks(foundTasks) });
  });

});





/*
 * POST routes
 *
 */
//Post request from add submit button
app.post("/", function(req, res){

  //Get info from the request
  let requestList = req.body.addList.toLowerCase();  //req.body.addList is list name from submit button with name "addList"
  let requestTask = req.body.addTask;                //req.body.addTask is task from input field with name "addTask"

  //Create task document to save to database
  let taskToAdd = new Task({

    day: requestList,
    task: requestTask
  });

  taskToAdd.save();

  res.redirect("/" + requestList); //Redirect to view

});



// POST request from remove submit button
app.post("/remove", function(req, res){

  if( req.body.removeId != null ){

    let requestList = req.body.removeList.toLowerCase();  //req.body.removeList is list name from hidden field of form
    let requestTaskId = req.body.removeId;                //req.body.removeId is task id from submit button with name "removeId"

    Task.findByIdAndRemove(requestTaskId, function(err){

      if(err)
        console.log(err);
      else
        console.log("Task Removed.");
    });

    res.redirect("/" + requestList); //Redirect to view
  }
});
