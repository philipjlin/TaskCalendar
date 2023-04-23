# Blog


## Repository
<https://github.com/philipjlin/TaskCalendar>


## Description
List used to keep track of daily tasks by adding and removing items.

The lists cover a week, and added tasks are stored in a database until removed.


## Technologies
Front-end development in HTML/CSS, with templating done using EJS.

Express framework used for Node.js runtime environment.

MongoDB used as the database.


## High Level Components
    * List for each day of the week
    * Database with defined schema to store tasks
    * CSS style sheet 
    * Script to display current date info


## Class Overview
    CSS
        - styles.css

<br>
    
    Node Application
        - app.js

<br>

    JavaScript
        - dateScript.js


## Views
    List
     - day
     - add 
     - remove


## Database Sketch
    MongoDB Schema: Task

    Description: Will store individual task for certain day

    Fields:
    ●	day: String
    ●	task: String
