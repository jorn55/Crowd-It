$(document).ready(function () {
    $("#menu-toggle").click(function () {
        $("#wrapper").toggleClass("toggled");
    });
});



app.controller("answerQsCtrl", function ($scope, questionSrv, userSrv) {


 
    $scope.items = [];
    var myStars = [];
    $scope.cmnt = "";

    $scope.selected = -1;

    $scope.activeUser = userSrv.getActiveUser();


    // var promises = [];
    // promises.push(questionSrv.questionsVotedByMe());
    // promises.push(questionSrv.getActiveUserToAnswer());

    // Promise.all(promises).then(function(results) {

    // })


    // questionSrv.questionsVotedByMe().then(function (questions) {
    //     var myVoted = questions;
    //     console.log("myVoted: " + myVoted);
    // }, function (err) {
    //     $log.error(err);
    // })

    questionSrv.getActiveUserToAnswer().then(function (questions) {
        $scope.items = questions;
        $scope.quest = $scope.items[0];
        console.log("toAnswer: " + $scope.items);
    }, function (err) {
        console.log(err);
    })

    questionSrv.questionsVotedByMe().then(function (meQuestions) {
        var votedByMe = meQuestions;
        console.log("voted by me: " + votedByMe.length);
    }, function (err) {
        console.log(err);
    })


    // var questionPointer = {"_type":'Pointer',"className":'Question', "objectId":$scope.quest.id};
    // $scope.makeVote = questionSrv.addMyVote({"_type":'Pointer',"className":'Question', "objectId":$scope.quest.id}, $scope.selected, $scope.cmnt);
        

    $scope.makeVote = function() {
        
        // var questionPointer = {"_type":'Pointer',"className":'Question', "objectId":$scope.quest.id};
        // console.log("voting qID  " + $scope.quest.id);
        
        questionSrv.addMyVote($scope.quest, $scope.selected, $scope.cmnt);
        $scope.quest = $scope.items[0];
    };


    // questionSrv.addMyVote(question, voteOption, comment)

    // questionSrv.getActiveUserQuestions().then(function (questions) {
    //     var myFavs = questions.favourites;
    //     console.log("myFavs: " + myFavs);
    // }, function (err) {
    //     $log.error(err);
    // })





    // function filterForMe() {
    //     $scope.items = $scope.items.filter(myVoted);
    //     console.log("hello")
    // }

    // filterForMe();
    

    $scope.quest = $scope.items[0];
    $scope.isStarred = "";

    $scope.cs1 = "hvrd1";
    $scope.cs2 = "hvrd2";
    $scope.cs3 = "hvrd3";

    $scope.updateQuestion = function (item) {
        console.log("item" + item);
        $scope.quest = item;
        // console.log("quest" + $scope.quest.optionsData);
    }

    $scope.answerQuestion = function (slctd) {
        if (slctd === 0) {
            alert("You must select on option to vote!!");
        } else {
            var voteTemp = questionSrv.addVote($scope.quest.id, myId, slctd, $scope.cmnt);
            answered.push($scope.quest.id);
            $scope.selected = -1;
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
            $scope.selected = -1;
        }
        console.log("selected" + $scope.selected);
    }
});


