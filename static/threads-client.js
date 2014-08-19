var threads = angular.module("threads", ["ngRoute", "ngAnimate"]);

threads.config(function($routeProvider) {
  $routeProvider.when("/thread/:id?/:lower?/:upper?", {
    templateUrl: "thread.html", controller: "ThreadController"
  })
  .otherwise({
    redirectTo: "/thread/0"
  });
});

threads.filter('order', function() {
  return function(posts) { 
    if (posts.length > 1 && posts[1].thread === 0) {
      return posts.sort(function(a, b) { return new Date(b.update) - new Date(a.update) });
    }

    return posts;
  };
});

threads.controller("ThreadController", function($http, $scope, $location, $routeParams, $interval) {
  $scope.addThread = function () {
    $http.post(mount + $location.path(), $scope.post).success(function(data) {
      if (data.id) {
        $scope.posts.push(data);
      }

      $scope.post.title = $scope.post.author = $scope.post.text = $scope.post.image = "";
    }).error(function(data) {
      console.log("Bad Request");
    });
  }

  $scope.getThread = function() {
    $http.get(mount + $location.path() + "/" + $scope.posts.length).success(function(data) {
      $scope.posts = $scope.posts.concat(data.thread);
    }).error(function(data) {
      console.log("Error");
    }); 
  }

  $scope.addFile = function(files) {
    var reader = new FileReader(),
        file   = files[0];
    
    reader.addEventListener("load", function(e) { 
      $scope.post.file = e.target.result;
      document.getElementsByTagName("body")[0].style.backgroundImage = "url("+e.target.result+")";
    });

    if (file && file.size < 5000000) {
      reader.readAsDataURL(file);
    }
  }

  var mount  = "/api",
      update = $interval($scope.getThread, 5000);  

  $scope.$on('$destroy', function () { $interval.cancel(update) });

  $scope.inThread = $routeParams.id > 0;
  $scope.posts    = [];

  $scope.getThread();
});