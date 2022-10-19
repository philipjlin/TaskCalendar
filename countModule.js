/*
 * Count module provides counting functions for lists
 *
 */

//Required packages
let path = require('path');
const appVars = require(path.join(__dirname, "app.js"));  //Required local module


//Module exports used in other files
module.exports.countTasks = countTasks;



/*
 * Gets number of tasks remaining in the current list
 *
 */
function countTasks( list ){

  let count = 0;

  for( var i=0; i<list.length; i++ ){

    count++;
  }

  return count;
}
