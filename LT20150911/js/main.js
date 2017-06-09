// constants
var TOTAL_PAGE = 20;
var NAME = 'Taishi Inoue';
var BASE_URL = 'http://inoue.rarejob.com/studysession'
var INDEX = [
	'Problems we have',
	'Angular JS is a...',
	'Features',
	'Getting Start',
	'References'
];
var FEATURES = [
	'Two-way data binding',
	'MVW(MVC) pattern',
	'Template',
	'Custom-directive (reusable components, custom markup)',
	'REST-friendly',
	'Deep Linking (set up a link for any dynamic page)',
	'Form Validation',
	'Server Communication',
	'Localization',
	'Dependency injection',
	'Full testing environment'
];
var REFERENCES = [
	'angularjs.org',
	'github.com/angular/angular.js',
	'campus.codeschool.com/courses/shaping-up-with-angular-js',
	'codecademy.com'
];
var IMG_THANKS_TO = [
	'logo_angular_by_google.png',
	'logo_github.png',
	'logo_codecademy.png',
	'logo_codeSchool.png'
]

// Angular
/** app */
var app = angular.module("SDDStudySessionApp", ['ngRoute']);


/** roting */
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/:id', {
		templateUrl: function(urlattr) {
			if (urlattr.id > 0 && urlattr.id <= TOTAL_PAGE)
			{
				return './templates/slides/slide' + urlattr.id + '.html';
			} else {
				return './templates/404.html';
			}
		},
		controller: 'SlideController'
	})
	.otherwise({
		redirectTo: '/',
		templateUrl: './templates/first.html'
	});
}]);

/** MainController */
app.controller('MainController', function($scope) {

	var today = new Date();
	$scope.year = today.getFullYear();
	$scope.month = ( "0"+( today.getMonth()+1 ) ).slice(-2);
	$scope.day = ( "0"+today.getDate() ).slice(-2); 

	$scope.name = NAME;
});


/** SlideController */
app.controller('SlideController', function($scope, $route, $routeParams) {

	$scope.initialize = function() {
		$scope.id = $routeParams.id !== undefined ? parseInt($routeParams.id) : false;
		$scope.lastPageFlg = $scope.id === TOTAL_PAGE ? true : false;
		$scope.totalPage = TOTAL_PAGE;
		$scope.indexes = INDEX;
		$scope.features = FEATURES;
		$scope.previousPageId = $scope.id > 1 ? $scope.id - 1 : false;
		$scope.nextPageId = $scope.id < TOTAL_PAGE ? $scope.id + 1 : false;
		$scope.baseUlr = BASE_URL;
		$scope.panel = false;
		$scope.references = REFERENCES;
		$scope.imgThanksTo = IMG_THANKS_TO;
		$scope.addRedFlg = false;
	}

	$scope.addRed = function() {
		$scope.addRedFlg = $scope.addRedFlg === false ? true: false;
	}

	$scope.showPanel = function() {
		$scope.panel = $scope.panel === false ? true: false;
	}
	$scope.turnRed = function() {
		
	}

	$scope.initialize();

});


/** GreetingController */
app.controller('GreetingController', function($scope) {
	$scope.greeting = 'Hello, world!';
});

/** Slide14Controller */
app.controller('Slide14Controller', function($scope) {
	$scope.textNum  = 0;
	$scope.demoFlg  = false;

	$scope.next = function() {
		if ($scope.textNum < 5) {
			$scope.textNum++;
		}
	}
	$scope.demoBtn = function() {
		$scope.demoFlg = $scope.demoFlg === false ? true: false;
	}

});
