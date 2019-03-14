app.controller("navbarCtrl", function($scope, $location, userSrv) {
    // $scope.isUserLoggedIn = true;
   
    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.activeUser = userSrv.getActiveUser();
    console.log("hello " + $scope.activeUser.id);
    

    // $scope.isUserLoggedIn = function() {
    //     return userSrv.isLoggedIn();
    // }

    // $scope.logout = function() {
    //     userSrv.logout();
    //     $location.path("/");
    // }
})