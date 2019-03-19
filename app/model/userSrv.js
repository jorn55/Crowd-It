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
            console.log(activeUser);
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


    function addStar(qId) {
        var async = $q.defer();
        var activeUserId = userSrv.getActiveUser().id;
        var myStars = [];
    
        const userParse = Parse.Object.extend('User');
        const query = new Parse.Query(userParse);
        query.equalTo("id", Parse.User.current());
        query.find().then(function (results) {

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
        signUp : signUp
    }

});