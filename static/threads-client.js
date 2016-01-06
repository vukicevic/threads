var threads = angular.module("threads", ["ngRoute", "ngAnimate"]);

threads.config(function ($routeProvider) {
  $routeProvider.when("/thread/:id?/:lower?/:upper?", {
    templateUrl: "thread.html", controller: "ThreadController"
  })
  .otherwise({
    redirectTo: "/thread/0"
  });
});

threads.filter('order', function () {
  return function (posts) {
    if (posts.length > 1 && posts[1].thread === 0) {
      return posts.sort(function (a, b) { return new Date(b.update) - new Date(a.update) });
    }

    return posts;
  };
});

threads.controller("ThreadController", function ($http, $scope, $location, $routeParams, $interval) {
  $scope.addThread = function (post) {
    $http.post(mount + $location.path(), post).then(function (response) {
      if (response.data.id) {
        $scope.posts.push(response.data);
      }

      $scope.post.title = $scope.post.text = $scope.post.image = "";
    }, function (response) {
      console.log("Bad Request");
    });
  }

  $scope.getThread = function () {
    $http.get(mount + $location.path() + "/" + $scope.posts.length).then(function (response) {
      $scope.posts = $scope.posts.concat(response.data.thread);
    }, function (response) {
      console.log("Error");
    });
  }

  var mount = "/api";
  var update = $interval($scope.getThread, 5000);

  $scope.$on('$destroy', function () { $interval.cancel(update) });

  $scope.inThread = $routeParams.id > 0;
  $scope.posts    = [];

  $scope.getThread();
});