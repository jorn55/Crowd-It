app.controller("questionCtrl", function($scope, userSrv) {
    $scope.isUserLoggedIn = true;
    // $scope.isUserLoggedIn = function() {
    //     return userSrv.isLoggedIn();
    // }

    // $scope.logout = function() {
    //     userSrv.logout();
    //     $location.path("/");
    // }
})