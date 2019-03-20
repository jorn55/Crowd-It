app.controller("myQsCtrl", function ($scope, questionSrv, userSrv) {


  if (!userSrv.isLoggedIn()) {
    $location.path("/");
    return;
  }

  questionSrv.getActiveUserQuestions().then(function (questions) {
    $scope.percent = [];
    $scope.items = questions;
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
    $log.error(err);
  })




  //   questionSrv.getVotesForQuestion($scope.quest.id).then(function (votes) {
  //     $scope.votes = votes;
  // }, function (err) {
  //     $log.error(err);
  // })


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

  $scope.addQ = function () {
    var options = [{
      "title": $scope.op1title,
      "description": $scope.op1descr,
      "image": $scope.op1image
    },
    {
      "title": $scope.op2title,
      "description": $scope.op2descr,
      "image": $scope.op2image
    },
    {
      "title": $scope.op3title,
      "description": $scope.op3descr,
      "image": $scope.op3image
    }
    ]

    questionSrv.createQuestion($scope.title, $scope.description, options).then(function () {
      questionSrv.getActiveUserQuestions().then(function (questions) {
        $scope.items = questions;
        $scope.quest = $scope.items[0];
      }, function (err) {
        $log.error(err);
      })
    }, function (err) {
      $log.error(err);
    })

  };



  // $scope.quest = $scope.items[0];

  $scope.cs1 = "fhvrd1";
  $scope.cs2 = "fhvrd2";
  $scope.cs3 = "fhvrd3";


});