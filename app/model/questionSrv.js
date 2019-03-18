app.factory("questionSrv", function ($q, $http, userSrv, $log) {

  // var myVoted = null;
  var questions = [];

  function Question(parseQuestion) {
    this.id = parseQuestion.id;
    this.userId = parseQuestion.get("userId");
    this.topic = parseQuestion.get("topic");
    this.title = parseQuestion.get("title");
    this.description = parseQuestion.get("description");
    this.options = parseQuestion.get('optionsData');
    this.isActive = parseQuestion.get("isActive");
  }

  function Option(parseOption) {
    this.image = parseOption.get("image");
    this.title = parseOption.get("title");
    this.description = parseOption.get("description");
  }


  function Vote(parseVote) {
    this.id = parseVote.id;
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
    query.equalTo("userId", Parse.User.current());
    query.find().then(function (results) {
      
      for (var i = 0; i < results.length; i++) {
        questions.push(new Question(results[i]));
      }
      async.resolve(questions);

    }, function (error) {
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
    query.equalTo("votedBy", Parse.User.current());
    query.find().then(function (results) {

      for (var i = 0; i < results.length; i++) {
        myVoted.push(new Question(results[i]));
      }

      async.resolve(myVoted);

    }, function (error) {
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
    notMyQuestions.notEqualTo("userId", Parse.User.current());

    var isActive = new Parse.Query(questionParse);
    isActive.equalTo("isActive", true);

    var query = Parse.Query.and(notMyQuestions, isActive);

    query.find().then(function (results) {
      console.log("toAnswer1" + results);

      // var myVotd = questionsVotedByMe().then(function(result2){
      //   console.log("myVotd" + result2);
      //   async.resolve(result2);
      // },
      // function(error) {
      //   $log.error('Error while fetching My Voted', error);
      //   async.reject(error);
      // });

      // var finalResults = results.filter(myVotd);

      for (var i = 0; i < results.length; i++) {
        toAnswer.push(new Question(results[i]));
      }

      async.resolve(toAnswer);

    }, function (error) {
      $log.error('Error while fetching Question', error);
      async.reject(error);
    });

    return async.promise;
  }

  // function getOption(optionId) {
  //   var async = $q.defer();

  //   const optionParse = Parse.Object.extend('Option');
  //   const query = new Parse.Query(optionParse);
  //   query.equalTo("optionId", Parse.User.current());
  //   query.find().then(function (results) {

  //     for (var i = 0; i < results.length; i++) {
  //       questions.push(new Question(results[i]));
  //     }

  //     async.resolve(recipes);

  //   }, function (error) {
  //     $log.error('Error while fetching Question', error);
  //     async.reject(error);
  //   });

  //   return async.promise;
  // }




  function createQuestion(title, description, options) {
    var async = $q.defer();

    const QuestionParse = Parse.Object.extend('Question');
    const newQuestion = new QuestionParse();

    newQuestion.set('userId', Parse.User.current());
    newQuestion.set('topic', "general");
    newQuestion.set('title', title);
    newQuestion.set('description', description);
    newQuestion.set('optionsData', options);
    newQuestion.set('isActive', true);

    newQuestion.save().then(
      function (result) {
        $log.info('Question created', result);
        var newQuestion = new Question(result);
        async.resolve(newQuestion);
      },
      function (error) {
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

  function addMyVote(question, voteOption, comment) {
    const Vote = Parse.Object.extend('Vote');
    const myNewObject = new Vote();
    // const Question = Parse.Object.extend('Question');
    // const myNewQuestion = new Question();
    // myNewQuestion.id = question.objectId;
    // const myNewQuestion2 = JSON.parse(JSON.stringify(myNewQuestion));
    // var x = myNewQuestion2;
    // console.log(`service: ${JSON.stringify(myNewQuestion)}`);
    // console.log(`service: ${JSON.stringify(angular.toJson(myNewQuestion))}`);

    // myNewObject.set('question', questionptr);
    // var pointer = Question.createWithoutData(question.id);

    
    myNewObject.set('votedBy', Parse.User.current());
    myNewObject.set('comment', comment);
    myNewObject.set('voteOption', voteOption);
    myNewObject.set('question', question);
    // myNewObject.set('parent', questionptr);

    myNewObject.save().then(
      (result) => {
        if (typeof document !== 'undefined') console.log(`Vote created: ${JSON.stringify(result)}`);
        // console.log('Vote created', result);
      },
      (error) => {
        if (typeof document !== 'undefined') console.log(`Error while creating Vote: ${JSON.stringify(error)}`);
        console.error('Error while creating Vote: ', error);
      }
    );

    // return votes;
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
    var pos = users.map(function (e) {
      return e.id;
    }).indexOf(pId);
    users[pos].stars.push(qId);
  }


  return {
    getActiveUserQuestions: getActiveUserQuestions,
    createQuestion: createQuestion,
    questionsVotedByMe: questionsVotedByMe,
    getActiveUserToAnswer: getActiveUserToAnswer,
    // getQuestions: getQuestions,
    addQuestion: addQuestion,
    addMyVote: addMyVote,
    addUser: addUser,
    addStar: addStar,
    // getUsers : getUsers
  }

});