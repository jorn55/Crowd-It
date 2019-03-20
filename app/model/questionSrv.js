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

  function getVotesForQuestion(questionId) {
    var async = $q.defer();
    var votes = [];

    const votedParse = Parse.Object.extend('Vote');
    const query = new Parse.Query(votedParse);
    var questionPointer = { "__type": 'Pointer', "className": 'Question', "objectId": questionId };

    query.equalTo("question", questionPointer);
    query.find().then(function (results) {

      for (var i = 0; i < results.length; i++) {
        votes.push(results.voteOption);
      }

      async.resolve(votes);

    }, function (error) {
      $log.error('Error while fetching myVoted', error);
      async.reject(error);
    });

    return async.promise;
  }


  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}


  function getQuestionsFromId() {
    var async = $q.defer();
    var questionId = userSrv.getActiveUser().favourites;
    var queries = [];

    const questionParse = Parse.Object.extend('Question');

    for (var i = 0; i < questionId.length; i++) {
      var query = new Parse.Query(questionParse);
      query.equalTo("objectId", questionId[i]);
      queries.push(query)
    }

    var mainQuery = Parse.Query.or(...queries);
    mainQuery.find().then(function (myFavs) {

      async.resolve(myFavs);

    }, function (error) {
      $log.error('Error while fetching Question', error);
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



  // function addStar(pId, qId) {
  //   var pos = users.map(function(e) { return e.id; }).indexOf(pId);
  //   users[pos].stars.push(qId);
  // } 




  return {
    getActiveUserQuestions: getActiveUserQuestions,
    createQuestion: createQuestion,
    questionsVotedByMe: questionsVotedByMe,
    getActiveUserToAnswer: getActiveUserToAnswer,
    getVotesForQuestion: getVotesForQuestion,
    getQuestionsFromId: getQuestionsFromId,
    getOccurrence : getOccurrence,
    addMyVote: addMyVote
    // getQuestions: getQuestions,
    // addQuestion: addQuestion,
    // addUser: addUser
    // addStar: addStar,
    // getUsers : getUsers
  }

});