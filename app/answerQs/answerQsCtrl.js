$(document).ready(function(){
  $("#menu-toggle").click(function() {
    $("#wrapper").toggleClass("toggled");
  });
});



app.controller("answerQsCtrl", function($scope) {

  $scope.items = ["Which country is the best?", 
  "Which movie should I see this weekend?", 
  "Which dress should I buy?",
  "Which shoes should I buy?",
  "Which car is best?",
  "Which song should I play at my wedding?", 
  "Which movie should I see this weekend1?", 
  "Which dress should I buy1?",
  "Which shoes should I buy1?",
  "Which car is best1?",
  "Which song should I play at my wedding1?", 
  "Which movie should I see this weekend2?", 
  "Which dress should I buy2?",
  "Which shoes should I buy2?",
  "Which car is best2?",
  "Which song should I play at my wedding2?"  
];
  });
  