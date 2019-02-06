// Initialize Firebase
var config = {
  apiKey: "AIzaSyBPhetZEfn-qcf7TYtiupdFpt_qoFKkHzA",
  authDomain: "mi-solutionsdemo.firebaseapp.com",
  databaseURL: "https://mi-solutionsdemo.firebaseio.com",
  storageBucket: "mi-solutionsdemo.appspot.com",
};
firebase.initializeApp(config);

//create the app, bring in material module
var app = angular.module('StarterApp', ['ngMaterial', 'firebase']).config(function($mdThemingProvider) {
$mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('orange');
});
app.constant('firebaseURL', 'rooms');

app.factory('rooms', function(temperatureService, $firebaseArray) {
return $firebaseArray(temperatureService.getFB() );
});
app.factory('auth', function(temperatureService, $firebaseAuth){
return $firebaseAuth( temperatureService.getAuth() )
})

//make the application controller
app.controller('AppCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$mdToast', 'rooms', 'auth', function($scope, $mdSidenav, $mdDialog, $mdToast, rooms, auth){
                         
                         
//make a variable to hold the room objects
$scope.rooms = rooms;
$scope.currentRoom = {};
$scope.currentRoom.content = "New content";                         
//create a user object to contain the password and email
$scope.user = {};
$scope.loggedIn =false;
                         
  //default message
   $scope.dialogPromptMessage = "Please log in.";                      
                         
                         
//reveals the dialog box
$scope.showPrompt = function($event) {
$mdDialog.show({
  controller: 'AppCtrl',
  templateUrl: 'login.tmpl.html',
  parent: angular.element(document.body),
  clickOutsideToClose: true
});
}
$scope.cancel = function(){
         $mdDialog.hide();                
}                   
                         
                         
                         
//listen for authentication changes (log in , log out)
auth.$onAuthStateChanged(function(userAuth){
       console.log
                         
                         
            if(userAuth){
                         
            //authenticated   
            $scope.loggedIn = true;
            $scope.cancel();
            showSimpleToast("You are logged in.");
       }else{
            //not authenticated     
            $scope.loggedIn = false;
            showSimpleToast("You must log in.");
       }            
})
                         
//Add simple toast function, I think this is the righ place
function showSimpleToast (message){
var elem = document.getElementById('content')
                         
$mdToast.show(
$mdToast.simple()
.textContent(message)
.parent(elem) 
.position("top right")
.hideDelay(5000)
.capsule(true)                         
);                         
}
//showSimpleToast("Hello people");                         
                         
$scope.toggleSidenav = function(name) {
  console.log('Toggling navigation');
  $mdSidenav(name).toggle();
}
$scope.updateContent = function(room){
  console.log('Updating the content area');
  console.log(room)
  $scope.currentRoom = room;
}
                         
//create a function for login purposes, add it to the $scope
$scope.login = function(){
   var email = $scope.user.email;
   var password = $scope.user.password;
   auth.$signInWithEmailAndPassword(email, password).then(function(user){
      //person logged in
       console.log(user);
   }).catch(function(error){
       //got an error
       console.log(error); 
       switch(error.code){
         case "auth/user-not-found": 
            $scope.dialogPromptMessage = "Registering you...";             
            $scope.register();             
         break;
         case "auth/invalid-email":
              $scope.dialogPromptMessage = "Bad email, try again."            
            alert("Invalid Email");       
         break;
         case "auth/wrong-password":
              $scope.dialogPromptMessage = "Incorrect password, try again.";            
                         
             alert("Incorrect password");
         break;
         default:  
            alert("Error in login, try again later");
       }                  
   })
}
                         
$scope.register = function(){
 console.log("Trying to register");
 var email = $scope.user.email;
 var password = $scope.user.password;
 auth.$createUserWithEmailAndPassword(email, password).then(function(user){
           //success   
           console.log("success at registering")
           $scope.login();
                         
 }).catch(function(error){
          //failure  
          console.log("Failed at registering");
          console.log(error);   
          switch(error.code){
            case "auth/email-already-in-use":
                alert("That is email is taken.");
            break;
            case "auth/invalid-email":
                alert("Invalid email. Try again. Human.");
            break;
            default:
                alert("Registration is off. Try later.");
            }
   })
}
                         
$scope.logout=function(){
    auth.$signOut();                     
}                    
                         
}])
//End of the controller


/*
temperatureService creates two connection to firebase. One is for data. One is for authentication.
*/

app.service('temperatureService', ['firebaseURL', function(firebaseURL) {
//connect for data from the database
var ref = firebase.database().ref(firebaseURL);
//connect for authentication
var authRef = firebase.auth();
                                 
return {
    getFB: function() {
        return ref;
    },
    getAuth: function(){
      return authRef;                           
   }
};
}]);

app.get('/posts/new', (req, res) => {
    res.render('create')
});

//////////////////
$(document).ready(function() {
    $('#summernote').summernote();
       });
   var edit = function() {
       $('.click2edit').summernote({focus: true});
       };
       var save = function() {
       var markup = $('.click2edit').summernote('code');
       $('.click2edit').summernote('destroy');
       };
