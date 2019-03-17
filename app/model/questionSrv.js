app.factory("questionSrv", function ($q, $http, userSrv, $log) {


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

          async.resolve(questions);

        }, function(error) {
            $log.error('Error while fetching Question', error);
            async.reject(error);
        });

        return async.promise;
    }

    
  function questionsVotedByMe() {
    var async = $q.defer();
    var activeUserId = userSrv.getActiveUser().id;
    var myVoted = [];

    const votedParse = Parse.Object.extend('Vote');
    const query = new Parse.Query(votedParse);
    query.equalTo("votedBy",  Parse.User.current());
    query.find().then(function(results) {

        for (var i = 0; i < results.length; i++) {
          myVoted.push(new Question(results[i]));
        }

        async.resolve(myVoted);

      }, function(error) {
          $log.error('Error while fetching myVoted', error);
          async.reject(error);
      });

      return async.promise;
  }
  
  
  function getActiveUserToAnswer() {
      var async = $q.defer();
      var activeUserId = userSrv.getActiveUser().id;

      var toAnswer = [];

      const questionParse = Parse.Object.extend('Question');

      var notMyQuestions = new Parse.Query(questionParse);
      notMyQuestions.notEqualTo("userId",  Parse.User.current());

      var isActive = new Parse.Query(questionParse);
      isActive.equalTo("isActive",  true);

      var query = Parse.Query.and(notMyQuestions, isActive);

      query.find().then(function(results) {

        questionsVotedByMe().then(function(result2){
          var myVoted = results2;
        },
        function(error) {
          $log.error('Error while fetching My Voted', error);
          async.reject(error);
        });
        
        var finalResults = results.filter(myVoted);

        for (var i = 0; i < finalResults.length; i++) {
          toAnswer.push(new Question(finalResults[i]));
        }

        async.resolve(toAnswer);

      }, function(error) {
          $log.error('Error while fetching Question', error);
          async.reject(error);
      });

      return async.promise;
  }

    function getOption(optionId) {
      var async = $q.defer();

      const optionParse = Parse.Object.extend('Option');
      const query = new Parse.Query(optionParse);
      query.equalTo("optionId",  Parse.User.current());
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
  
    const QuestionParse = Parse.Object.extend('Question');
    const newQuestion = new QuestionParse();
    
    newQuestion.set('userId', owner);
    newQuestion.set('topic', topic);
    newQuestion.set('description',description);
    newQuestion.set('options',options);
    
    newQuestion.save().then(
      function(result) {
        $log.info('Question created', result);
        var newQuestion = new Question(result);
        async.resolve(newQuestion);
      },
      function(error) {
        $log.error('Error while creating Question: ', error);
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
      createQuestion : createQuestion,
      questionsVotedByMe : questionsVotedByMe,
      getActiveUserToAnswer : getActiveUserToAnswer,
      // getQuestions: getQuestions,
      addQuestion: addQuestion,
      addVote : addVote,
      addUser : addUser,
      addStar : addStar,
      // getUsers : getUsers
    }
  
  });