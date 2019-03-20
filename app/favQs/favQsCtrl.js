app.controller("favQsCtrl", function($scope, questionSrv, userSrv) {

  if (!userSrv.isLoggedIn()) {
    $location.path("/");
    return;
}  

  $scope.activeUser = userSrv.getActiveUser();
  var myStars = userSrv.getActiveUser().favourites;
  
  questionSrv.getQuestionsFromId(myStars).then(function (favs) {
    $scope.items = favs;
    $scope.quest = $scope.items[0];
}, function (err) {
    console.log(err);
})


    // $scope.quest = $scope.items[0];

    // $scope.cs1 = "fhvrd1";
    // $scope.cs2 = "fhvrd2";
    // $scope.cs3 = "fhvrd3";


// $scope.updateQuestion = function(item) {
//   $scope.quest = item;
//   // console.log(item);
// }

  
});