app.controller("favQsCtrl", function($scope, questionSrv) {

    var temp = questionSrv.getQuestions();

    var myFavs = [1,2,4,7];

    function myFav(qstn) {
        return myFavs.includes(qstn.id);
      }
      
    function myFunction() {
        $scope.items = temp.filter(myFav);
      }

      myFunction();

    // $scope.items = temp;

    $scope.quest = $scope.items[0];

    $scope.cs1 = "fhvrd1";
    $scope.cs2 = "fhvrd2";
    $scope.cs3 = "fhvrd3";


$scope.updateQuestion = function(item) {
  $scope.quest = item;
  // console.log(item);
}

  
});