var app = angular.module("crowditApp", ["ngRoute"]);



app.config(function($routeProvider) {
    
    $routeProvider.when("/", {
        templateUrl: "app/splash/splash.html",
        controller: "splashCtrl"
    }).when("/signUp", {
        templateUrl: "app/signUp/signUp.html",
        controller: "signUpCtrl"
    }).when("/answerQs", {
        templateUrl: "app/answerQs/answerQs.html",
        controller: "answerQsCtrl"
    }).when("/favQs", {
        templateUrl: "app/favQs/favQs.html",
        controller: "favQsCtrl"
    }).when("/myQs", {
        templateUrl: "app/myQs/myQs.html",
        controller: "myQsCtrl"
    }).when("/new" , {
        templateUrl: "app/myQs/newQ.html",
        controller: "newQCtrl"
    }).otherwise({
        redirectTo: "/"
    })
})