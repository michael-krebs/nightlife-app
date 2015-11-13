'use strict';

$(document).ready(function(){

	// sets username at navbar
	$.get("/api/:id", function(data) {
		$('#username').text("Hello, " + data.displayName + "!");
	});
	
	// take search input when submitted
	$('#searchBtn').click(function() {
		var searchText = $('#search').val();
		
		// get info about bars in the area from yelp
		$.get("/api/yelp/" + searchText, function(data) {
			var bars = JSON.parse(data).businesses;
			populate(bars);
		});
		
		//ajax search? <- lag city
		/*$("input").keyup(function() {
			$.ajax({
	      type: "GET",
	      url: '/api/yelp/' + searchText,
	      contentType: "application/json; charset=utf-8",
	      async: false,
	      dataType: "json",
	      success: function (data) {
	        $.each(data, function(i, item) {
	          $('div.searchBox').html(item.extract);
	          var bars = JSON.parse(data).businesses;
			      populate(bars);
	      },
	      error: function (errorMessage) {
	      }
	    });
    }).keyup();
    */
	});
	
	// update who's going list when clicked
  	$('#barList').on('click', '.goingButton', function(){
  		var barId = this.id;
  		$.post('/api/bar/' + barId, function(data){
  			console.log(data);
  		})
  	})
	
	// take and interpret json data from yelp controller
	function populate(bars) {
		
		// clears list of bars if you search more than once
		$('#barList').empty();
		
		bars.forEach(function(bar) {
			
			// get large rather than tiny img from yelp
			bar.largeImg = bar.image_url.slice(0, -6) + "l.jpg";
			
			// create each bar card w/ relevant info
			$.get('/api/bar/' + bar.id, function(numberGoing) {
				$('#barList').append(
  				"<div class='col s12 m6'>" +
  				  "<div class='card medium'>" +
  					"<div class='card-image'>" +
  					  "<img src='" + bar.largeImg + "'>" +
  					  "<span class='card-title'>" + bar.name +"</span>" +
  					"</div>" +
  					"<div class='card-content'>" +
  						"<p class='description truncate'>" + bar.snippet_text + "</p>" +
  						"<a href='" + bar.url + "' class='btn'>Yelp</a>" +
  						"<a href='#' id='" + bar.id + "' class='btn right-align goingButton'>" + numberGoing +" I'm Going</a>" +  
  				  	"</div>" +
  				"</div>" +
  				"</div>"
			  );
			});
		});
	}

});