app.controller("myQsCtrl", function($scope, questionSrv) {

    var temp = questionSrv.getQuestions();

    var myId = 101;

    function myQuestion(qstn) {
        return (qstn.owner === myId);
      }
      
    function myFunction() {
        $scope.items = temp.filter(myQuestion);
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

this.id = id;
            this.owner = owner;
            this.topic = topic;
            this.title = title;
            this.description = description;
            this.op1image = op1image;
            this.op1title = op1title;
            this.op1descr = op1descr;
            this.op2image = op2image;
            this.op2title = op2title;
            this.op2descr = op2descr;
            this.op3image = op3image;
            this.op3title = op3title;
            this.op3descr = op3descr;
            this.isActive = isActive;