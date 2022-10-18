let date = getDate();
let day = getDay();


$(".footer-msg").innerHTML = date;

/*
 * Gets the full date
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
 * Gets current day of the week
 *
 */
function getDay(){

  let date = new Date();

  let options = {

    weekday: "long"
  };

  return date.toLocaleDateString("en-US", options);
}
