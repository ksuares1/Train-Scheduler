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

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var trainTime = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
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
    $("#train-destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log('childSnapshot is', childSnapshot.val());
});

var trainName = childSnapshot.val().train;
var trainDestination = childSnapshot.val().destination;
var trainTime = childSnapshot.val().first;
var trainFrequency = childSnapshot.val().frequency;