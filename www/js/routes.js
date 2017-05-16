

angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('tabsController.listTabDefaultPage', {
    url: '/list',
    views: {
      'tab1': {
        templateUrl: 'templates/listTabDefaultPage.html',
        controller: 'listTabDefaultPageCtrl'
      }
    }
  })

  .state('tabsController.chatTabDefaultPage', {
    url: '/chat',
    views: {
      'tab2': {
        templateUrl: 'templates/chatTabDefaultPage.html',
        controller: 'chatTabDefaultPageCtrl'
      }
    }
  })

    .state('tabsController.homeTabDefaultPage', {
      url: '/home',
      views: {
        'tab4': {
          templateUrl: 'templates/homeTabDefaultPage.html',
          controller: 'homeTabDefaultPageCtrl'
        }
      }
    })

  .state('tabsController.mapTabDefaultPage', {
    url: '/map',
    views: {
      'tab3': {
        templateUrl: 'templates/mapTabDefaultPage.html',
        controller: 'mapTabDefaultPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  .state('perfil', {
    url: '/perfil',
    templateUrl: 'templates/perfil.html',
    controller: 'LoginCtrl'
  })

  .state('addbook', {
    url: '/addbook',
    templateUrl: 'templates/addBook.html',
    controller: 'AddBookCtrl'
  })

  .state('bookinfo', {
    url: '/bookinfo',
    templateUrl: 'templates/bookInfo.html',
    controller: 'bookInfoCtrl'
  })

  .state('editbook', {
    url: '/editbook',
    templateUrl: 'templates/editBook.html',
    controller: 'editBookCtrl'
  })

$urlRouterProvider.otherwise('/login')

});
