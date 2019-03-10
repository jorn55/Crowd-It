app.factory("questionSrv", function($q, $http){


    var questions = []; 
    
    function Question(id, owner, topic, title, description, op1image, op1title, op1descr, op2image, op2title, op2descr, op3image, op3title, op3descr, isActive) {

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
        }
  
 
    
    function getQuestions() {
      var async = $q.defer();
      if (wasEverLoaded) {
        async.resolve(actors);
      } else {       
      $http.get("app/model/data/actors.json").then(function(res) {
        // success
        for (var i = 0; i < res.data.length; i++) {
          actors.push(new Actor(res.data[i]));
        }
        wasEverLoaded = true;
        async.resolve(actors);
      }, function(err) {
        // error
        console.error(err);
        async.reject(err);
      });
    }
      return async.promise;
      }
  
      function addActor(id, firstName, lastName, birthday, picLink, pageLink) {
        var async = $q.defer();
  
        var newActor = new Actor(id, firstName, lastName, birthday, picLink, pageLink);
        actors.push(newActor);
        async.resolve(newActor);
      
        return async.promise;
      }
  
  
  
        
  
  return {
      getActors: getActors,
      addActor: addActor,
      addSelected: addSelected
  }
  
  });