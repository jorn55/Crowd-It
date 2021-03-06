$(document).ready(function () {
    $("#menu-toggle").click(function () {
        $("#wrapper").toggleClass("toggled");
    });
});



app.controller("answerQsCtrl", function ($scope, $location, questionSrv, userSrv) {

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }  

    $scope.items = [];
    $scope.cmnt = "";
    $scope.world = true;

    $scope.selected = -1;
    $scope.myStars = [];

    $scope.activeUser = userSrv.getActiveUser();
    $scope.myStars = userSrv.getActiveUser().favourites;



    questionSrv.getActiveUserToAnswer().then(function (questions) {
        $scope.items = questions;
        $scope.quest = $scope.items[0];
        // console.log("toAnswer: " + $scope.items);
        // console.log(`myStars: ${$scope.myStars} qID: ${$scope.quest.id}`);
    }, function (err) {
        console.log(err);
    })



    $scope.makeVote = function () {

        if ($scope.selected === -1) {
            alert("You must select on option to vote!!");
        } else {
            questionSrv.addMyVote($scope.quest, $scope.selected, $scope.cmnt);
            questionSrv.getActiveUserToAnswer().then(function (questions) {
                $scope.items = questions;
                $scope.quest = $scope.items[0];
            }, function (err) {
                console.log(err);
            })
        }
    };



    $scope.quest = $scope.items[0];
    $scope.isStarred = "";

    $scope.cs1 = "hvrd1";
    $scope.cs2 = "hvrd2";
    $scope.cs3 = "hvrd3";

    $scope.updateQuestion = function (item) {
        console.log("item" + item);
        $scope.quest = item;
        if ($scope.myStars.includes($scope.quest.id)) {
            $scope.isStarred = "stard";
        } else {
            $scope.isStarred = false;
        }
    }

    $scope.answerQuestion = function (slctd) {
        if (slctd === 0) {
            alert("You must select on option to vote!!");
        } else {
            var voteTemp = questionSrv.addVote($scope.quest.id, myId, slctd, $scope.cmnt);
            answered.push($scope.quest.id);
            $scope.selected = -1;
            $scope.cmnt = "";
            // filterForMe();
            $scope.quest = $scope.items[0];
            $scope.clk1 = "";
            $scope.clk2 = "";
            $scope.clk3 = "";
        }
    }



    $scope.starQuestion = function () {
        if (!($scope.myStars.includes($scope.quest.id))) {
            $scope.myStars.push($scope.quest.id);
            userSrv.updateStars($scope.myStars);
            $scope.isStarred = "stard";
            console.log(`myStars: ${$scope.myStars} qID: ${$scope.quest.id}`);
        } else {
            $scope.myStars.splice($scope.myStars.indexOf($scope.quest.id), 1);
            $scope.isStarred = "";
            userSrv.updateStars($scope.myStars);
            console.log(`myStars: ${$scope.myStars} qID: ${$scope.quest.id}`);
        }
    }

    //     if ($scope.isStarred === "") {
    //         userSrv.addStar($scope.quest.id).then(function (stars) {
    //             $scope.myStars = stars;
    //         }, function (err) {
    //             console.log(err);
    //         })
    //         $scope.isStarred = checkStarred();
    //     } else {
    //         $scope.isStarred = "";
    //         $scope.myStars.splice(myStars.indexOf($scope.quest.id), 1);
    //         questionSrv.removeStar($scope.quest.id);
    //     }
    // }

    function checkStarred() {
        if ($scope.myStars.includes($scope.quest.id)) {
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