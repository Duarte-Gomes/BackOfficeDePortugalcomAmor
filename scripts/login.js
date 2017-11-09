app.controller('LoginCtrl', ['$scope', 'Auth', '$location', 'currentAuth', 'usersList', '$window',
    function($scope, Auth, $location, currentAuth, usersList, $window) {
        $scope.auth = Auth;
        $scope.usersList = {};
        $scope.isUser = true;
        $scope.isPassReset = false;

        usersList.$loaded().then(function() {
            $scope.usersList = usersList;
        })

        $scope.checkResetPass = function() {
            $scope.isUser = false;
            $scope.isPassReset = true;
        }

        $scope.loginUser = function() {
            $scope.message = null;
            $scope.error = null;

            Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(firebaseUser) {
                $scope.firebaseUser = firebaseUser;
                /* $location.path('/')
                location.reload(); */
                $window.location.assign('/');
            })
            .catch(function(error) {
                $scope.error = error.code;
                $scope.message = error.message;
            }); 
        };

        $scope.resetUserPass = function(param) {
            Auth.$sendPasswordResetEmail(param).then(function() {
                alert("Foi enviado um email com instruções para o seu email!");
            }).catch(function(error) {
                console.error("Error: ", error);
            });
        };

        $scope.auth.$onAuthStateChanged(function(firebaseUser) {
            $scope.firebaseUser = firebaseUser;
        });
        
        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;
        
            // Create a new user
            Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
            .then(function(firebaseUser) {
                /*firebaseUser.sendEmailVerification();*/
                $window.location.assign('/');
            }).catch(function(error) {
                $scope.error = error.code;
                $scope.message = error.message;
            }); 
        };
    }
]);