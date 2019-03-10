$(document).ready(function(){
  $("#menu-toggle").click(function() {
    $("#wrapper").toggleClass("toggled");
  });
});



app.controller("answerQsCtrl", function($scope) {

//   $scope.items = ["Which country is the best?", 
//   "Which movie should I see this weekend?", 
//   "Which dress should I buy?",
//   "Which shoes should I buy?",
//   "Which car is best?",
//   "Which song should I play at my wedding?", 
//   "Which movie should I see this weekend1?", 
//   "Which dress should I buy1?",
//   "Which shoes should I buy1?",
//   "Which car is best1?",
//   "Which song should I play at my wedding1?", 
//   "Which movie should I see this weekend2?", 
//   "Which dress should I buy2?",
//   "Which shoes should I buy2?",
//   "Which car is best2?",
//   "Which song should I play at my wedding2?"  
// ];

// $scope.items = [];

 $scope.items = [
  {
      "id" : 1,
      "owner" : 101,
      "topic" : "travel",
      "title" : "Which country is the best?",
      "description" : "Which country is the best to live in from these options?",
      "op1image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1200px-Flag_of_Israel.svg.png",
      "op1title" : "Israel",
      "op1descr" : "A middle eastern country with lots of sun and beaches.",
      "op2image" : "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png",
      "op2title" : "USA",
      "op2descr" : "The richest country in the world, land of endless opportunities.",
      "op3image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_Iran_%28official%29.svg/2000px-Flag_of_Iran_%28official%29.svg.png",
      "op3title" : "Iran",
      "op3descr" : "Words escape me.",
      "isActive" : true
  },
  {
      "id" : 2,
      "owner" : 102,
      "topic" : "entertainment",
      "title" : "Which movie should I see this weekend?",
      "description" : "I can't decide between these three movies. Please help!",
      "op1image" : "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5c2274e08985837cb690b246/1545762021789/?format=2500w",
      "op1title" : "Captain Marvel",
      "op1descr" : "Cosmic superheroine.",
      "op2image" : "https://i.ytimg.com/vi/QkZxoko_HC0/maxresdefault.jpg",
      "op2title" : "Green Book",
      "op2descr" : "Won the academy award for best movie.",
      "op3image" : "https://www.foxmovies.com/s3/dev-temp/en-US/__5c637a3014f20.jpg",
      "op3title" : "Alita",
      "op3descr" : "Futuristic sci-fi movie.",
      "isActive" : true
  },
  {
      "id" : 3,
      "owner" : 101,
      "topic" : "travel",
      "title" : "Which country is the best?",
      "description" : "Which country is the best to live in from these options?",
      "op1image" : "https://media0.giphy.com/media/QpWDP1YMziaQw/giphy.gif",
      "op1title" : "Israel",
      "op1descr" : "A middle eastern country with lots of sun and beaches.",
      "op2image" : "https://media1.giphy.com/media/Fco9iOIbK69va/giphy.gif?cid=3640f6095c841a654d4937346b27d5f3",
      "op2title" : "USA",
      "op2descr" : "The richest country in the world, land of endless opportunities.",
      "op3image" : "https://media2.giphy.com/media/IJ5GX0hGQ3jiM/giphy.gif?cid=3640f6095c841a86574f324467a34a09",
      "op3title" : "Israel",
      "op3descr" : "A middle eastern country with lots of sun and beaches.",
      "isActive" : true
  },
  {
      "id" : 4,
      "owner" : 102,
      "topic" : "travel",
      "title" : "Which country is the best?",
      "description" : "Which country is the best to live in from these options?",
      "op1image" : "https://media0.giphy.com/media/QpWDP1YMziaQw/giphy.gif",
      "op1title" : "Israel",
      "op1descr" : "A middle eastern country with lots of sun and beaches.",
      "op2image" : "https://media1.giphy.com/media/Fco9iOIbK69va/giphy.gif?cid=3640f6095c841a654d4937346b27d5f3",
      "op2title" : "USA",
      "op2descr" : "The richest country in the world, land of endless opportunities.",
      "op3image" : "https://media2.giphy.com/media/IJ5GX0hGQ3jiM/giphy.gif?cid=3640f6095c841a86574f324467a34a09",
      "op3title" : "Israel",
      "op3descr" : "A middle eastern country with lots of sun and beaches.",
      "isActive" : true
  },
  {
      "id" : 1,
      "owner" : 101,
      "topic" : "travel",
      "title" : "Which country is the best?",
      "description" : "Which country is the best to live in from these options?",
      "op1image" : "https://media0.giphy.com/media/QpWDP1YMziaQw/giphy.gif",
      "op1title" : "Israel",
      "op1descr" : "A middle eastern country with lots of sun and beaches.",
      "op2image" : "https://media1.giphy.com/media/Fco9iOIbK69va/giphy.gif?cid=3640f6095c841a654d4937346b27d5f3",
      "op2title" : "USA",
      "op2descr" : "The richest country in the world, land of endless opportunities.",
      "op3image" : "https://media2.giphy.com/media/IJ5GX0hGQ3jiM/giphy.gif?cid=3640f6095c841a86574f324467a34a09",
      "op3title" : "Israel",
      "op3descr" : "A middle eastern country with lots of sun and beaches.",
      "isActive" : true
  },
  {
      "id" : 1,
      "owner" : 101,
      "topic" : "travel",
      "title" : "Which country is the best?",
      "description" : "Which country is the best to live in from these options?",
      "op1image" : "https://media0.giphy.com/media/QpWDP1YMziaQw/giphy.gif",
      "op1title" : "Israel",
      "op1descr" : "A middle eastern country with lots of sun and beaches.",
      "op2image" : "https://media1.giphy.com/media/Fco9iOIbK69va/giphy.gif?cid=3640f6095c841a654d4937346b27d5f3",
      "op2title" : "USA",
      "op2descr" : "The richest country in the world, land of endless opportunities.",
      "op3image" : "https://media2.giphy.com/media/IJ5GX0hGQ3jiM/giphy.gif?cid=3640f6095c841a86574f324467a34a09",
      "op3title" : "Israel",
      "op3descr" : "A middle eastern country with lots of sun and beaches.",
      "isActive" : true
  },
  {
      "id" : 1,
      "owner" : 101,
      "topic" : "travel",
      "title" : "Which country is the best?",
      "description" : "Which country is the best to live in from these options?",
      "op1image" : "https://media0.giphy.com/media/QpWDP1YMziaQw/giphy.gif",
      "op1title" : "Israel",
      "op1descr" : "A middle eastern country with lots of sun and beaches.",
      "op2image" : "https://media1.giphy.com/media/Fco9iOIbK69va/giphy.gif?cid=3640f6095c841a654d4937346b27d5f3",
      "op2title" : "USA",
      "op2descr" : "The richest country in the world, land of endless opportunities.",
      "op3image" : "https://media2.giphy.com/media/IJ5GX0hGQ3jiM/giphy.gif?cid=3640f6095c841a86574f324467a34a09",
      "op3title" : "Israel",
      "op3descr" : "A middle eastern country with lots of sun and beaches.",
      "isActive" : true
  },
  {
      "id" : 1,
      "owner" : 101,
      "topic" : "travel",
      "title" : "Which country is the best?",
      "description" : "Which country is the best to live in from these options?",
      "op1image" : "https://media0.giphy.com/media/QpWDP1YMziaQw/giphy.gif",
      "op1title" : "Israel",
      "op1descr" : "A middle eastern country with lots of sun and beaches.",
      "op2image" : "https://media1.giphy.com/media/Fco9iOIbK69va/giphy.gif?cid=3640f6095c841a654d4937346b27d5f3",
      "op2title" : "USA",
      "op2descr" : "The richest country in the world, land of endless opportunities.",
      "op3image" : "https://media2.giphy.com/media/IJ5GX0hGQ3jiM/giphy.gif?cid=3640f6095c841a86574f324467a34a09",
      "op3title" : "Israel",
      "op3descr" : "A middle eastern country with lots of sun and beaches.",
      "isActive" : true
  }
];

$scope.quest = $scope.items[0];

$scope.updateQuestion = function(item) {
  $scope.quest = item;
  // console.log(item);
}
  });


  