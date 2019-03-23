$(document).ready(function () {
  $("#menu-toggle").click(function () {
      $("#wrapper").toggleClass("toggled");
  });
});

app.controller("favQsCtrl", function($scope,  $location, questionSrv, userSrv) {

  if (!userSrv.isLoggedIn()) {
    $location.path("/");
    return;
}  

  $scope.activeUser = userSrv.getActiveUser();
  var myStars = userSrv.getActiveUser().favourites;
  
  questionSrv.getQuestionsFromId(myStars).then(function (favs) {
    $scope.percent = [];
    $scope.items = favs;
    $scope.quest = $scope.items[0];
    questionSrv.getVotesForQuestion($scope.quest.id).then(function (votes) {
      $scope.votes = votes;
      $scope.percent[0] = (questionSrv.getOccurrence(votes, 1) / $scope.votes.length) * 100;
      $scope.percent[1] = (questionSrv.getOccurrence(votes, 2) / $scope.votes.length) * 100;
      $scope.percent[2] = (questionSrv.getOccurrence(votes, 3) / $scope.votes.length) * 100;
    }, function (err) {
      $log.error(err);
    })
}, function (err) {
    console.log(err);
})

$scope.updateQuestion = function (item) {
  // console.log("item" + item);
  $scope.quest = item;
  questionSrv.getVotesForQuestion($scope.quest.id).then(function (votes) {
    $scope.votes = votes;
    $scope.percent[0] = (questionSrv.getOccurrence(votes, 1) / $scope.votes.length) * 100;
    $scope.percent[1] = (questionSrv.getOccurrence(votes, 2) / $scope.votes.length) * 100;
    $scope.percent[2] = (questionSrv.getOccurrence(votes, 3) / $scope.votes.length) * 100;

  }, function (err) {
    $log.error(err);
  })
  // console.log("quest" + $scope.quest);
}


    // $scope.quest = $scope.items[0];

    // $scope.cs1 = "fhvrd1";
    // $scope.cs2 = "fhvrd2";
    // $scope.cs3 = "fhvrd3";


// $scope.updateQuestion = function(item) {
//   $scope.quest = item;
//   // console.log(item);
// }

  
});