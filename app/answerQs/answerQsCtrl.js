$(document).ready(function () {
  $("#menu-toggle").click(function () {
    $("#wrapper").toggleClass("toggled");
  });
});



app.controller("answerQsCtrl", function ($scope, questionSrv, userSrv) {



  var temp = questionSrv.getQuestions();
  // var qusers = questionSrv.getUsers();
  // $scope.items = temp;

  var myId = 101;
  var answered = [];
  var myStars = [];
  $scope.cmnt = "";

  $scope.selected = 0;

  $scope.userName = userSrv.getActiveUser();


  function notMyQuestions(qstn) {
    return (qstn.owner !== myId);
  }

  function notActive(qstn) {
    return (qstn.isActive);
  }

  function answeredByMe(qstn) {
    return !(answered.includes(qstn.id));
  }

  function filterForMe() {
    var temp1 = temp.filter(notActive);
    var temp2 = temp1.filter(answeredByMe);
    $scope.items = temp2.filter(notMyQuestions);
  }

  filterForMe();

  $scope.quest = $scope.items[0];
  $scope.isStarred = "";

  $scope.cs1 = "hvrd1";
  $scope.cs2 = "hvrd2";
  $scope.cs3 = "hvrd3";

  $scope.updateQuestion = function (item) {
    $scope.quest = item;
  }

  $scope.answerQuestion = function (slctd) {
    if (slctd === 0) {
      alert("You must select on option to vote!!");
    } else {
      var voteTemp = questionSrv.addVote($scope.quest.id, myId, slctd, $scope.cmnt);
      answered.push($scope.quest.id);
      $scope.selected = 0;
      $scope.cmnt = "";
      filterForMe();
      $scope.quest = $scope.items[0];
      $scope.clk1 = "";
      $scope.clk2 = "";
      $scope.clk3 = "";
    }
  }

  $scope.starQuestion = function () {
    if ($scope.isStarred === "") {
      myStars.push($scope.quest.id)
      $scope.isStarred = checkStarred();
    } else {
      $scope.isStarred = "";
      myStars.splice(myStars.indexOf($scope.quest.id), 1);
    }
  }

  function checkStarred() {
    if (myStars.includes($scope.quest.id)) {
      return "stard";
    } else {
      return "";
    }
  }

  $scope.select = function (option) {
    if (option === 1 && $scope.selected !== option) {
      $scope.clk1 = " clicked";
      $scope.clk2 = "";
      $scope.clk3 = "";
      $scope.selected = 1;
    } else if (option === 2 && $scope.selected !== option) {
      $scope.clk2 = " clicked";
      $scope.clk1 = "";
      $scope.clk3 = "";
      $scope.selected = 2;
    } else if (option === 3 && $scope.selected !== option) {
      $scope.clk3 = " clicked";
      $scope.clk2 = "";
      $scope.clk1 = "";
      $scope.selected = 3;
    } else {
      $scope.clk1 = "";
      $scope.clk2 = "";
      $scope.clk3 = "";
      $scope.selected = 0;
    }
  }
});


  //   $scope.items = ["Which country is the best?", 
  //   "Which movie should I see this weekend?", 
  //   "Which dress should I buy?",
  //   "Which shoes should I buy?",
  //   "Which car is best?",
  //   "Which song should I play at my wedding?", 
  //   "Which movie should I see this weekend1?", 
  //   "Which dress should I buy1?",
  //   "Which shoes should I buy1?",
  //   "Which car is best1?",
  //   "Which song should I play at my wedding1?", 
  //   "Which movie should I see this weekend2?", 
  //   "Which dress should I buy2?",
  //   "Which shoes should I buy2?",
  //   "Which car is best2?",
  //   "Which song should I play at my wedding2?"  
  // ];

  // $scope.items = [];