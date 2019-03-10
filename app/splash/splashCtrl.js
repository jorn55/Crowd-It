app.controller("splashCtrl", function($scope, questionSrv) {

    var temp = questionSrv.getQuestions();
    $scope.quest = temp[0];
});