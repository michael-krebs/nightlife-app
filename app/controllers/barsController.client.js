'use strict';

(function(){
    
    // take search input when submitted
    $('#searchBtn').click(function() {
        var searchText = $('#search').val();
        
        // make get request to yelp controller
        $.get("/api/yelp/" + searchText, function(data) {
            console.log(data);
        })
    })

    // take and interpret json data from yelp controller
    // populate view w/ bars
    
})();