app.controller("toDoCtrl", function($scope) {
    function ToDoItem(parseItems) {
      this.desc = parseItems.get("description");
      this.state = parseItems.get("doneState");
      this.dueDate = parseItems.get("DueDate");
      this.priority = parseItems.get("Priority");
        // this.desc = desc;
        // this.state = state;
        // this.dueDate = dueDate;
        // this.priority = priority;
      }
    
    //   ToDoItem.prototype.isBirthday = function() {
    //     var currentMonth = new Date().getMonth();
    //     var currentDate = new Date().getDate();
    //     if (currentMonth === this.bday.getMonth() && currentDate === this.bday.getDate()) {
    //         return true;
    //     } else {
    //         return false; testing
    //     }
    //   }

    // $scope.toDoItems = [];
    // $scope.toDoItems.push(new ToDoItem("Do the laundry", false, new Date("2019-03-03"), "Normal"));
    // $scope.toDoItems.push(new ToDoItem("Go fishing", false, new Date("2019-03-03"), "Normal"));
    // $scope.toDoItems.push(new ToDoItem("help kids with homework", false, new Date("2019-03-03"), "High"));
    // $scope.toDoItems.push(new ToDoItem("fix the washing machine", false, new Date("2019-03-03"), "Low"));
    // $scope.toDoItems.push(new ToDoItem("Go see the new Avengers movie", false, new Date("2019-03-03"), "Normal"));
    
    function Recipe(parseRecipe) {
      this.id = parseRecipe.get("id");
      this.name = parseRecipe.get("name");

  }

    $scope.getList = function() {
      var async = $q.defer();
      $scope.toDoItems = [];
      const toDoParse = Parse.Object.extend('ToDoItem');
      const query = new Parse.Query(toDoParse);
      query.find().then(function(results) {
        for (var i = 0; i < results.length; i++) {
          $toDoItems.push(new ToDoItem(results[i]));
        }
        async.resolve(toDoItems);
      }, function(error) {
        $log.error('Error while fetching Recipe', error);
        async.reject(error);
      });
      return async.promise;
    }



       $scope.srt = "all";
       $scope.fltr = "";
    $scope.filterItems = function(type) {
      if (type === "completed") {
        $scope.srt = "completed";
        $scope.fltr = true;
      }
      if (type === "all") {
        $scope.srt = "all";
        $scope.fltr = "";
      }
      if (type === "active") {
        $scope.srt = "active";
        $scope.fltr = false;
      }
        
      }
      $scope.addToList = function(item,due,priority) {
        $scope.toDoItems.push(new ToDoItem(item, false, new Date(due), priority));
      }

      $scope.itemsDone = 0;
      $scope.countChecked = function(item) {
        console.log(item.checked);
        if (item.state === false) {
          item.state = true;
          $scope.itemsDone++;
        } else {
          item.state = false;
          $scope.itemsDone--;
        }
      }
    
      $scope.deleteThis = function(indx) {
        $scope.toDoItems.splice(indx,1);
      }

  $scope.orderProp = "";
  $scope.reverseOrder = false;
  $scope.orderByProp = function(propName) {
    if ($scope.orderProp === propName) {
      // Clicking header for the first time
      $scope.reverseOrder = !$scope.reverseOrder;
    } else {
      // Clicking header for the first time
      $scope.orderProp = propName;
      $scope.reverseOrder = false;
    }
  }
});