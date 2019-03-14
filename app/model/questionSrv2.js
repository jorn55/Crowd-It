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
  

  
  
    var items = [];
    var votes = [];
    var users = [];
    var wasDoneQ = false;
    var wasDoneP = false;
    var wasDoneV = false;
    var currentQId = 8;
    var currentVId = 0;
    var currentPId = 0;
  
  

  
    function getUsers() {
      if (wasDoneP) {
        return users;
      } else {
        wasDoneP = true;
        users = [{
          "id": 101,
          "name": "Peter Parker",
          "email": "spidey@avengers.org",
          "password": "1234",
          "stars": [1,3],
          "answered" : []
        },
        {
          "id": 102,
          "name": "Bruce Wayne",
          "email": "Batsey@jla.org",
          "password": "1234",
          "stars": [5,6],
          "answered" : []
        }
      ];
      return users;
    }
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
      getQuestions: getQuestions,
      addQuestion: addQuestion,
      addVote : addVote,
      addUser : addUser,
      addStar : addStar,
      getUsers : getUsers
    }
  
  });