app.factory("userSrv", function ($http, $q, $log) {

    var activeUser = null;

    function User(parseUser) {
        this.id = parseUser.id;
        this.name = parseUser.get("username");
        this.email = parseUser.get("email");
        this.favourites = parseUser.get("favourites");
    }

    function login(email, pwd) {
        var async = $q.defer();

        // Pass the username and password to logIn function
        Parse.User.logIn(email, pwd).then(function (user) {
            // Do stuff after successful login
            $log.info('Logged in user', user);
            activeUser = new User(user);
            userFavourites = activeUser.favourites;
            console.log("active: " + activeUser);
            async.resolve(activeUser);
        }).catch(function (error) {
            $log.error('Error while logging in user', error);
            async.reject(error);
        });

        return async.promise;
    }

    function signUp(name, email, pwd) {
        var async = $q.defer();

        // Pass the username and password to logIn function
        const user = new Parse.User()
        user.set('username', name);
        user.set('email', email);
        // user.set('favourites', new Parse.Object());
        user.set('password', pwd);

        user.signUp().then((user) => {
            if (typeof document !== 'undefined') $log.info(`User signed up: ${JSON.stringify(user)}`);
            console.log('User signed up', user);
            
        }).catch(error => {
            if (typeof document !== 'undefined') $log.error(`Error while signing up user: ${JSON.stringify(error)}`);
            console.error('Error while signing up user', error);
        });


        return async.promise;
    }


    function updateStars(starsArr) {
      var async = $q.defer();
        const User = new Parse.User();
        const query = new Parse.Query(User);
        query.equalTo("userId", Parse.User.current());
        // Finds the user by its ID
        // query.get(activeUser).then((user) => {
          // Updates the data we want
          user.set('favourites', starsArr);
          // Saves the user with the updated data
          user.save().then(
            function (result) {
              $log.info('user updated', result);
              starsArr = result;
              async.resolve(starsArr);
          },
          function (error) {
            $log.error('Error while updating user: ', error);
            async.reject(error);
          }
          );
        return async.promise;
    }


    function updateStars(starsArr) {
      var async = $q.defer();

      const User = new Parse.User();
      const query = new Parse.Query(User);

      query.equalTo("objectId", Parse.User.current());
      query.find().then(function (user) {
        user.set('favourites', starsArr);
        // Saves the user with the updated data
        user.save().then(
          function (result) {
            $log.info('user updated', result);
            starsArr = result;
            async.resolve(starsArr);
        },
        function (error) {
          $log.error('Error while updating user: ', error);
          async.reject(error);
        }
        );
      }, function (error) {
        $log.error('Error while fetching user', error);
        async.reject(error);
      });
  
      return async.promise;
    }
    

    


    // function addMyVote(question, voteOption, comment) {
    //     const Vote = Parse.Object.extend('Vote');
    //     const myNewObject = new Vote();
    //     var questionPointer = { "__type": 'Pointer', "className": 'Question', "objectId": question.id };
    
    //     myNewObject.set('votedBy', Parse.User.current());
    //     myNewObject.set('comment', comment);
    //     myNewObject.set('voteOption', voteOption);
    //     myNewObject.set('question', questionPointer);
    
    //     myNewObject.save().then(
    //       (result) => {
    //         if (typeof document !== 'undefined') console.log(`Vote created: ${JSON.stringify(result)}`);
    //         // console.log('Vote created', result);
    //       },
    //       (error) => {
    //         if (typeof document !== 'undefined') console.log(`Error while creating Vote: ${JSON.stringify(error)}`);
    //         console.error('Error while creating Vote: ', error);
    //       }
    //     );
    
    //   }
    
    
    
    function addStar(qId) {
        var async = $q.defer();
        var activeUserId = Parse.User.current();
        var myStars = activeUser.favourites;
    
        const userParse = Parse.Object.extend('User');
        const query = new Parse.Query(userParse);
        query.equalTo("objectId", activeUserId);
        query.find().then(function (results) {
          debugger;
            myStars = results.get("favourites");
            myStars.push(qId);
            user.set('favourites', myStars);
    
          async.resolve(myStars);
    
        }, function (error) {
          $log.error('Error while fetching myVoted', error);
          async.reject(error);
        });
    
        return async.promise;
      }

    function isLoggedIn() {
        return activeUser ? true : false;
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser, 
        addStar : addStar,
        updateStars : updateStars,
        signUp : signUp
    }

});