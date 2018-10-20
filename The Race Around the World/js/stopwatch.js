//Submitted by Andrew Chiang
//Email: alchian@emory.edu
//Cell: (908)210-4391

/* This program generates the history table by getting Time, location, and Time Elapsed*/

//Global variables
var timeHistory = [];
var locationHistory = [];
var started = false;

//Start/reset function for the site, clears timeHistory and locationHistory for a new run
function start() {
  timeHistory = [];
  locationHistory = [];

//getDate Function is called, which adds the date to the timeHistory array
  getDate();

  //checks if geolocation is implemented, ensures that latitude and longitude can be obtained
  if (!navigator.geolocation) {
    alert("Geolocation is not supported");
    return;
  }
  //calls showPosition to generate the latitude and longitude for the entry
  else {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

//Called by start function and stop function, adds date to timeHistory array
function getDate() {
  var newTimeHistory = new Date();
  timeHistory.push(newTimeHistory);
}

//called by start function and stop function, adds latitude and longitude as an object to locationHistory
function showPosition(position) {
  var newLocationHistory = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  //pushes newLocationHistory {latitude,longitude} to global coordinate array
  locationHistory.push(newLocationHistory);

  //calls on table constructor
  constructTable();

  //program has started, so stop() can be called
  started = true;

}

//stop() cannot be called before the historyTable is implmented
function stop() {

//promts user to start program first before pressing stop
  if ( !Boolean(started)) {
    alert("Start the stopwatch first");
    return;
  }

// function gets date and location
  getDate();
  navigator.geolocation.getCurrentPosition(showPosition);

}

//Function constructs table, also calculates time elapsed
function constructTable() {

//points to div where historyTable is generated, clears the div
  var tableLabels = document.getElementById("historyTable")
  tableLabels.innerHTML = ' ';

//Adds table axis
  var html ='';
  html += "<table id='tblCart' border='1|1'>";
  html += "<tr>"
  html += "<td>Time</td>";
  html += "<td>Latitude</td>";
  html += "<td>Longitude</td>";
  html += "<td>Time Elapsed(ms)</td>";
  html += "</tr>"

//checks how long array is, generates entries based on timeHistory and locationHistory
  for (var i = 0; i<timeHistory.length; i++ ) {
  html += "<tr>";
  html += "<td>" + timeHistory[i] + "</td>";
  html += "<td>" + locationHistory[i].latitude + "</td>";
  html += "<td>" + locationHistory[i].longitude + "</td>";

  //if there are two or more entries, the function will calculate the time difference between the two times
  if(i>=1) {
    var dateDif =  Math.abs(timeHistory[i]-timeHistory[i-1])
    html += "<td>" + dateDif + "</td>";
  }
  html += "</tr>";
  }

  html += "</table>";
  tableLabels.innerHTML = html;

}
