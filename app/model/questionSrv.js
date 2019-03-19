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
    this.parseQuestion = parseQuestion;
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
    var myQ;

    const votedParse = Parse.Object.extend('Vote');
    const query = new Parse.Query(votedParse);
    query.equalTo("votedBy", Parse.User.current());
    query.find().then(function (results) {

      for (var i = 0; i < results.length; i++) {
        myQ = results[i].get("question").id;
        myVoted.push(myQ);
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

    var query = new Parse.Query(questionParse);
    query.notEqualTo("userId", Parse.User.current());
    query.equalTo("isActive", true);



    // var query = Parse.Query.and(notMyQuestions, isActive);
  // debugger;
    query.find().then(function (notMyQuestns) {
      questionsVotedByMe().then(function (questionsIAnswered) {

        var finalQuestionsArr = [];
        var nmq;
        console.log("Iansw " + questionsIAnswered.length)
     
        // debugger;
        for (var i = 0; i < notMyQuestns.length; i++) {
          if (!(questionsIAnswered.includes(notMyQuestns[i].id))) {
            toAnswer.push(new Question(notMyQuestns[i]));
          }
        }
      
        async.resolve(toAnswer);
      },
        function (error) {
          $log.error('Error while fetching My Voted', error);
          async.reject(error);
        });
    }, function (error) {
      $log.error('Error while fetching Question', error);
      async.reject(error);
    });

    return async.promise;
  }


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
    var questionPointer = { "__type": 'Pointer', "className": 'Question', "objectId": question.id };

    myNewObject.set('votedBy', Parse.User.current());
    myNewObject.set('comment', comment);
    myNewObject.set('voteOption', voteOption);
    myNewObject.set('question', questionPointer);

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