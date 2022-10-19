//Script variables
let date = getDate();
let dayName = getDay();

/*
 * GET request redirect for home route
 * Changes the home route view to the current day view
 */
$.get({
  url: "/",
  type: "GET",
  data: { "day" : dayName },
  datatype: "json",
  success: function(response) {

      let base_url = window.location.origin + "/";
      let current_url = window.location.href;

      if( current_url == base_url )
        window.location.href = "/" + dayName.toLowerCase();
  }
});


//JQuery to update footer message with current date
$(".footer-msg").html("Today is " + date);





/*
 * Gets the full date (Monday, January 1)
 *
 */
function getDate(){

  let date = new Date();

  let options = {

    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return date.toLocaleDateString("en-US", options);
}



/*
 * Gets current day of the week (Monday)
 *
 */
function getDay(){

  let date = new Date();

  let options = {

    weekday: "long"
  };

  return date.toLocaleDateString("en-US", options);
}
