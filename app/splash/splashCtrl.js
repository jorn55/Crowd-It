app.controller("splashCtrl", function($scope, $q, $location, questionSrv, userSrv) {

    // var temp = questionSrv.getQuestions();
    // $scope.quest = temp[0];
    userSrv.logout();
    $scope.invalidLogin = false;
    $scope.selected === -1;
    var i = 0;
    // $scope.email = "spidey@marvel.com";
    // $scope.pwd = "1234";

    $scope.login = function() {

        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $location.path("/answerQs");
        }, function() {
            $scope.invalidLogin = true;
        });

    }

    $scope.signUp = function() {

        userSrv.signUp($scope.sUsername, $scope.sEmail, $scope.sPassword).then(function(activeUser) {
            $location.path("/");
        }, function() {
            $scope.invalidLogin = true;
        });

    }


    questionSrv.getAllQuestions().then(function (questions) {
        $scope.items = questions;
        
        $scope.quest = $scope.items[i];
        // console.log("toAnswer: " + $scope.items);
        // console.log(`myStars: ${$scope.myStars} qID: ${$scope.quest.id}`);
    }, function (err) {
        console.log(err);
    })

    $scope.answerQuestion = function (slctd) {
        if (slctd === 0) {
            alert("You must select on option to vote!!");
        } else {
            var voteTemp = questionSrv.addVote($scope.quest.id, -1, slctd, $scope.cmnt);
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
    $scope.logout = function () {
        userSrv.logout();
    }

    $scope.makeVote = function () {

        if ($scope.selected === -1) {
            alert("You must select on option to vote!!");
        } else {
            questionSrv.addAnonymousVote($scope.quest, $scope.selected, $scope.cmnt);
            
                i++;
                $scope.quest = $scope.items[i];
                $scope.selected = -1;
            
        }
    };


    // const user = new Parse.User()
    // user.set('username', 'A string');
    // user.set('email', 'A string');
    // user.set('password', '#Password123');
    
    // user.signUp().then((user) => {
    //   if (typeof document !== 'undefined') document.write(`User signed up: ${JSON.stringify(user)}`);
    //   console.log('User signed up', user);
    // }).catch(error => {
    //   if (typeof document !== 'undefined') document.write(`Error while signing up user: ${JSON.stringify(error)}`);
    //   console.error('Error while signing up user', error);
    // });




});