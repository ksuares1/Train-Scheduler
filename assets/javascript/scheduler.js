var firebaseConfig = {
    apiKey: "AIzaSyCXwVwccn9piLscffNP3imTKq3WbJ-f3NE",
    authDomain: "train-scheduler-bede7.firebaseapp.com",
    databaseURL: "https://train-scheduler-bede7.firebaseio.com",
    projectId: "train-scheduler-bede7",
    storageBucket: "train-scheduler-bede7.appspot.com",
    messagingSenderId: "300780472675",
    appId: "1:300780472675:web:e1b925e92c3d0341bf2b56"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//   Button for add trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
   
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#train-time-input").val().trim() , "hh:mm a").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        train: trainName,
        destination: trainDestination,
        first: trainTime,
        frequency: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("train-time-input").val("");
    $("#frequency-input").val("");
});

// Create a firebase event add trains to the database
database.ref().on("child_added", function (childSnapshot) {
    console.log('childSnapshot is', childSnapshot.val());


// Snapshot changes are stored in variables
var trainName = childSnapshot.val().train;
var trainDestination = childSnapshot.val().destination;
var trainTime = childSnapshot.val().first;
var trainFrequency = childSnapshot.val().frequency;

// console.log the values
console.log(trainName);
console.log(trainDestination);
console.log(trainTime);
console.log(trainFrequency);

// Calculating the train arrival time in minutes and military hours

var trainTimeConv = moment(trainTime, "hh:mm a").subtract(1, "years");

var currentTime = moment().format("HH:mm a");
console.log("Current Time:" + currentTime);

// Difference of current Time and the first train time
var trnTimeCurrentTimeDiff = moment().diff(moment(trainTimeConv), "minutes");

// store time left
var timeLeft = trnTimeCurrentTimeDiff % trainFrequency;

// calculating and storing the minutes left until the next train arrives
var minutesAway= trainFrequency - timeLeft; 

var nextArrival= moment().add(minutesAway, "minutes").format("hh:mm a");

// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainTime),
    $("<td>").text(trainFrequency),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});