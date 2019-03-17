app.controller("splashCtrl", function($scope, $q, $location, questionSrv, userSrv) {

    // var temp = questionSrv.getQuestions();
    // $scope.quest = temp[0];

    $scope.invalidLogin = false;
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