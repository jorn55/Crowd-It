app.factory("questionSrv", function ($q, $http) {


    var questions = [];
  
    function Question(parseQuestion) {
      this.id = parseQuestion.get("id");
      this.userId = parseQuestion.get("userId");
      this.topic = parseQuestion.get("topic");
      this.title = parseQuestion.get("title");
      this.description = parseQuestion.get("description");
      this.options = parseQuestion.get("options");
      this.isActive = parseQuestion.get("isActive");
    }
  
    function Option(parseOption) {
      this.image = parseOption.get("image");
      this.title = parseOption.get("title");
      this.description = parseOption.get("description");
    }
  
  
    function Vote(parseVote) {
      this.id = parseVote.get("id");
      this.questionId = parseVote.get("question");
      this.votedBy = parseVote.get("votedBy");
      this.voteOption = parseVote.get("voteOption");
      this.comment = parseVote.get("comment");
    }
  
    function getActiveUserQuestions() {
        var async = $q.defer();
        var activeUserId = userSrv.getActiveUser().id;

        var questions = [];

        const questionParse = Parse.Object.extend('Question');
        const query = new Parse.Query(questionParse);
        query.equalTo("userId",  Parse.User.current());
        query.find().then(function(results) {

          for (var i = 0; i < results.length; i++) {
            questions.push(new Question(results[i]));
          }

          async.resolve(recipes);

        }, function(error) {
            $log.error('Error while fetching Question', error);
            async.reject(error);
        });

        return async.promise;
    }
  

  
  function createQuestion(owner, topic, title, description, options) {
    var async = $q.defer();
  
    const RecipParse = Parse.Object.extend('Recipe');
    const newRecipe = new RecipeParse();
    
    newRecipe.set('name', name);
    newRecipe.set('description',description);
    newRecipe.set('image', new Parse.File(name+".jpg", { base64: img }));
    newRecipe.set('ingredients', ingredients);
    newRecipe.set('steps', steps);
    newRecipe.set('duration', duration);
    newRecipe.set('userId', Parse.User.current());
    
    newRecipe.save().then(
      function(result) {
        $log.info('Recipe created', result);
        var newRecipe = new Recipe(result);
        async.resolve(newRecipe);
      },
      function(error) {
        $log.error('Error while creating Recipe: ', error);
        async.reject(error);
      }
    );        
  
    return async.promise;
  }

  
  
  
    function addQuestion(owner, topic, title, description,
      op1image, op1title, op1descr, op2image, op2title, op2descr, op3image, op3title, op3descr) {
      var id = currentQId++;
      items.push(new Question(id, owner, topic, title, description, op1image, op1title, op1descr, op2image, op2title, op2descr, op3image, op3title, op3descr, true));
  
      return items;
    }
  
    function addVote(qId, votedBy, voteOption, comment) {
      var id = currentVId++;
      votes.push(new Vote(id, qId, votedBy, voteOption, comment));
  
      return votes;
    }
  
    function addUser(name, email, password) {
      var id = currentPId++;
      var stars = [];
      users.push(new User(id, name, email, password, stars));
  
      return votes;
    }
  
    // function addStar(pId, qId) {
    //   var pos = users.map(function(e) { return e.id; }).indexOf(pId);
    //   users[pos].stars.push(qId);
    // } 
  
    function addStar(pId, qId) {
      console.log(users);
      var pos = users.map(function(e) { return e.id; }).indexOf(pId);
      users[pos].stars.push(qId);
    } 
  
  
    return {
      getActiveUserQuestions : getActiveUserQuestions,
      getQuestions: getQuestions,
      addQuestion: addQuestion,
      addVote : addVote,
      addUser : addUser,
      addStar : addStar,
      getUsers : getUsers
    }
  
  });