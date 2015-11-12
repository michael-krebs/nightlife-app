'use strict';

(function(){
	
	// take search input when submitted
	$('#searchBtn').click(function() {
		var searchText = $('#search').val();
		
		// make get request to yelp controller
		$.get("/api/yelp/" + searchText, function(data) {
			var bars = JSON.parse(data).businesses;
			console.log(bars);
			populate(bars);
		});
	});
	
	// take and interpret json data from yelp controller
	function populate(bars) {
		
		// clears list of bars if you search more than once
		$('#barList').empty();
		
		bars.forEach(function(bar) {
			
			// get large rather than tiny img from yelp
			bar.largeImg = bar.image_url.slice(0, -6) + "l.jpg";
			
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
							"<a href='#' class='btn right-align'>I'm Going</a>" +  
					  	"</div>" +
					"</div>" +
					"</div>"
				)
		})
	}
	// populate view w/ bars
	
	/*
	<div class="row">
		<div class="col s12 m7">
		  <div class="card">
			<div class="card-image">
			  <img src="images/sample-1.jpg">
			  <span class="card-title">Card Title</span>
			</div>
			<div class="card-content">
			  <p>I am a very simple card. I am good at containing small bits of information.
			  I am convenient because I require little markup to use effectively.</p>
			</div>
			<div class="card-action">
			  <a href="#">This is a link</a>
			</div>
		  </div>
		</div>
	  </div>
	*/
	
})();