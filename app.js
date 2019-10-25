

// flexible


function MainCtrl($scope) {
	//alert('main')
	$scope.msg = 'Angular'
}

angular.module('app', ['ngRoute'])
.config(function($routeProvider, $sceProvider) {
	$sceProvider.enabled(false)
	$routeProvider.when('/', {
		templateUrl: 'src/views/home.html',
		controller: 'HomeC'
	})

	.when('/angular', {
		templateUrl: 'src/views/angular.html',
		controller: 'CAngular'
	})
	.when('/vue', {
		templateUrl: 'src/views/vue.html',
		controller: 'CVue'
	})
	.when('/react', {
		templateUrl: 'src/views/react.html',
		controller: 'CReact'
	})

	.otherwise({
		redirectTo: '/'
	})
})
.run(function($rootScope, $timeout) {

	$rootScope.$on('$locationChangeStart', function(ev, next, cur) {

		$timeout(function() {

		$rootScope.path = location.hash.replace('#!/','');

			$('.nav-tabs').find(`[href="#!/${$rootScope.path}"]`).parent().addClass('active').siblings().removeClass('active')
		})
	})

})
.controller('MainCtrl', MainCtrl)




