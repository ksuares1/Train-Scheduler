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

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
    // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var destination = $("#role-input").val().trim();
  var firstTrainTime = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
  var frequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    train: trainName,
    destination:trainDestination,
    first: trainTime,
    Frequency: trainFrequency
  };
