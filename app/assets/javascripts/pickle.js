(function($) {
    $.fn.getAttributes = function() {
        var attributes = {}; 

        if(!this.length)
            return this;

        $.each(this[0].attributes, function(index, attr) {
            attributes[attr.name] = attr.value;
        });
		attributes['content'] = $.trim(this.text());
		delete attributes['style']; 
        return attributes;
    }
})(jQuery);


// For the purpose of serializing deck_data before sending it over the wire

var grabDeckData = function() {
	// each div under <div id ="impress">
	//   put the content into an array

	var user_input = [];
	var number_of_steps = $('#impress .step').length;
	

	for(var i = 0; i < number_of_steps; i++) {
		var step_tag = $('#impress .step')[i];
	    user_input.push($(step_tag).getAttributes());
	}
	
	console.log(user_input);
	return user_input;
};

var sendViaAjax = function() {
	
	var deck_id = $('#impress').attr('deck_id');
    var contents = grabDeckData();
		  
	$.ajax({
		 type: "PUT",
		 data:  {
	         content: contents
	   },
		 url:  "http://localhost:3000/decks/" + deck_id,
		 success: function() {
				console.log(contents);
		 },
		 failure: function() {
			 	console.log("Fail."); 
		 }
	});
};
var reset = function() {
    i = window.impress();
    i.reset();
    window.impress();
}

var buildTree = function(data) {
	var template_attrs = ['class', 'data-rotate-x', 'data-rotate-y', 'data-rotate-z', 'data-scale', 'data-x', 'data-y', 'data-z'];
  	var impress_divs = $('#impress > .step').remove();
	for(var i = 0; i < data.deck_data.length; i++) {
		$('#impress').append('<div></div>');
		for(var x = 0; x < template_attrs.length; x++) {
			// $(impress_divs[i]).attr(template_attrs[x], data.deck_data[i][template_attrs[x]]);
			// impress_divs[i].attr(template_attrs[x], data.deck_data[i][template_attrs[x]]);
			$('#impress > div').last().attr(template_attrs[x], data.deck_data[i][template_attrs[x]]);
		}
		$('#impress > .step').last().text(data.deck_data[i]['content']);
	}
	$('#impress > .step').first().addClass('active');
};

$(document).ready(function() {
    var template_id = $('.temp_dropdown').val();

	$.ajax({
		url:  "http://localhost:3000/decks/" + template_id,
		dataType: 'json',
		success: function(data) {
			buildTree(data);
			// reset();
		}
	});


});

$('.temp_selector').click(function() {
	alert('hi');
});



setInterval(sendViaAjax, 1000000);

$('#impress-button').click(function() {
	sendViaAjax();
	window.location.href = 'http://localhost:3000' + $('#impress').attr('url');
});
