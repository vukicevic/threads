var threads = angular.module("threads", ["ngRoute", "ngAnimate"]);

threads.config(function($routeProvider) {
  $routeProvider.when("/thread/:id?", {
    templateUrl: "thread.html", controller: "ThreadController"
  })
  .otherwise({
    redirectTo: "/thread"
  });
});

threads.filter("order", function() {
  return function(posts) { 
    if (posts.length > 1 && posts[1].thread === 0) {
      return posts.sort(function(a, b) { return b.update - a.update });
    }

    return posts;
  };
});

threads.directive("upload", [function () {
  return {
    restrict: "A",
    scope: { upload: "=" },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var file = changeEvent.target.files[0];
        
        if (file && file.size < 5000000) {
          var reader = new FileReader();
          
          reader.addEventListener("load", function (loadEvent) {
            scope.$apply(function () { scope.upload = loadEvent.target.result });
          });

          reader.readAsDataURL(file);
        }
      });
    }
  }
}]);

threads.controller("ThreadController", function($http, $scope, $location, $routeParams) {
  $scope.addThread = function () {
    $http.post("/api" + $location.path(), $scope.post).success(function(data) {
      if (data.id) {
        $scope.posts.push(data);
      }

      $scope.post.title = $scope.post.text = $scope.post.file = "";
      angular.element(document.querySelector("#file")).val(null);
    }).error(function(data) {
      console.log("Bad Request");
    });
  }

  $scope.getThread = function() {
    $http.get("/api" + $location.path()).success(function(data) {
      $scope.posts = $scope.posts.concat(data.thread);
    }).error(function(data) {
      console.log("Error Retrieving Thread");
    }); 
  }

  $scope.inThread = $routeParams.id > 0;
  $scope.posts    = [];

  $scope.getThread();
});