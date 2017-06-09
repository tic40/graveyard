// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
	  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
	  'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
	  'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
	  'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
	  method = methods[length];

	  // Only stub undefined methods.
	  if (!console[method]) {
	    console[method] = noop;
	  }
	}
}());

// Place any jQuery/helper plugins in here.


var timerID;

var main = function() {

	$('.setTitle').click(function(){
		var listTitle = $('#timerTitleForm').val();
	  	$('#timerTitle').text(listTitle).css('margin-bottom', '1.6rem');
  	});

    $('.resetTitle').click(function(){
	    $('#timerTitleForm').val('');
    });
  	
		// datetimepicker
		$('#datetimepicker').datetimepicker();

		// count
		$('#datetimepicker').change(function() {
			var time = "";
			time = $(this).val();
			if(timerID) {
				clearTimeout(timerID);
			}
			countDown(time);
		});
  };


	function countDown(time) {
		var startDateTime = new Date();
		var endDateTime = new Date(time);
		var left = endDateTime - startDateTime;
		var a_day = 24 * 60 * 60 * 1000;

		var d = Math.floor(left / a_day) 

		var h = Math.floor((left % a_day) / (60 * 60 * 1000)) 

		var m = Math.floor((left % a_day) / (60 * 1000)) % 60 

		var s = Math.floor((left % a_day) / 1000) % 60 % 60 

		m = ("0" + m).slice(-2);
		s = ("0" + s).slice(-2);

		if(d > 1) {
			$("#TimeLeft").text(d + 'days ' + h + ':' + m + ':' + s + ' left!').css('color', '#5cb85c'); 
		} else if(d == 1) {
			$("#TimeLeft").text(d + 'day ' + h + ':' + m + ':' + s + ' left!').css('color', '#ee5f5b');
		} else {
			$("#TimeLeft").text('over the time limit!').css('color', '#f0ad4e');
		}
		
		timerID = setTimeout(countDown,1000,time);
	}
	
	
$(document).ready(main);