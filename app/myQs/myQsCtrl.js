app.controller("myQsCtrl", function($scope, questionSrv) {

    var temp = questionSrv.getQuestions();

    var myId = 101;

    function myQuestions(qstn) {
        return (qstn.owner === myId);
      }
      
    function filterMine() {
        $scope.items = temp.filter(myQuestions);
      }

      filterMine();

    $scope.addQ = function() {
        var temp = questionSrv.addQuestion(myId, "topic1", $scope.title, $scope.description, 
        $scope.op1image, $scope.op1title, $scope.op1descr, $scope.op2image, $scope.op2title, $scope.op2descr, $scope.op3image, $scope.op3title, $scope.op3descr); 
        function filterMine() {
            $scope.items = temp.filter(myQuestions);
          }
          filterMine();
    };



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

