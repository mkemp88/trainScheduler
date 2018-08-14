
var config = {
    apiKey: "AIzaSyBtbvyVXBGJYXa1USZ1EgvQL4bI0x-aFw0",
    authDomain: "awesomesauce-53245.firebaseapp.com",
    databaseURL: "https://awesomesauce-53245.firebaseio.com",
    projectId: "awesomesauce-53245",
    storageBucket: "awesomesauce-53245.appspot.com",
    messagingSenderId: "239201947001"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#trainInfo").on('click',function(event){
      event.preventDefault();
      var trainName = $("#trainName").val()
      var firstTime = $("#firstTime").val()
      var destination = $("#destination").val()
      var frequency = $("#frequency").val()

      database.ref("/trainInfo").push({
          trainName:trainName,
          destination:destination,
          firstTime:firstTime,
          frequency:frequency
      });

  });

  database.ref('/trainInfo').on('child_added', function(snapshot){
      var latestTrain = snapshot.val();
      var trainRow = $('<tr>');
      
      console.log("snapshot value is ", latestTrain);
      var name = $('<td>');
      name.text(latestTrain.trainName);
      
      var destination = $('<td>');
      destination.text(latestTrain.destination);
      
      var frequency = $('<td>');
      frequency.text(latestTrain.frequency);

      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % latestTrain.frequency;
      var minutesTillTrain = lastestTrain.frequency - tRemainder;
      var nextTrain = moment().add(minutesTillTrain, "minutes");
      var nextTrainFormatted = moment(nextTrain).format("hh:mm");

      var nextArrival = $('<td>');
      nextArrival.text("placeHolder");

      var timeRemaining = moment()

      var minutesAway = $('<td>');
      minutesAway.text("placeHolder");

      trainRow.append(name);
      trainRow.append(destination);
      trainRow.append(frequency);
      trainRow.append(nextArrival);
      trainRow.append(minutesAway);
      console.log(trainRow)
      $("#currentTrainBody").append(trainRow[0]);

  });