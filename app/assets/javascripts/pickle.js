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
};

var buildTree = function(data) {
	var template_attrs = ['class', 'data-rotate-x', 'data-rotate-y', 'data-rotate-z', 'data-scale', 'data-x', 'data-y', 'data-z'];
  	$('#impress > div').remove();
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
			reset();
			
			var current_slide = null;

			document.addEventListener("keydown", function ( event ) {
				if (mode == "edit") {
					console.log('hi there');
					event.stopImmediatePropagation();
				}
			});

			document.addEventListener("keyup", function ( event ) {
				if (mode == "edit") {
					event.stopImmediatePropagation();
				}
			});


			$(function() {	
				var activeInput = false,
						textarea = document.createElement('textarea'),
						inlineEditor = $(textarea);
				inlineEditor.attr('rows', '3');
				inlineEditor.attr('id', 'inline-editor');
				inlineEditor.attr('placeholder', 'Click here to edit text.')

				$(".editable").click(function(e) {

					if(!$(this).hasClass('active')) {
						return false;
					}

					current_slide = $(this);
					currentText = current_slide.text().length == 0 ? "write stuff" : current_slide.text();
					inlineEditor.val(currentText);
					e.stopImmediatePropagation();

					if(activeInput == false) {
						activeInput = true;
						mode = 'edit';
						$(this).html(inlineEditor);
						inlineEditor.focus();
					} else {
					 		activeInput = false;
							mode = 'prezi';
							inlineEditor.blur();
							e.stopImmediatePropagation();
					}

					inlineEditor.on({	
						keyup: function(e) {
							if (e.keyCode == 27) {
								$(this).blur();
								activeInput = false;
							}
						},

						click: function(e) {
							e.stopPropagation();
						},

						blur: function(e) {
							currentInput = $(this).val();
							if($(this).val() === "" || $(this).val().length === 1) {
								current_slide.text($(this).attr('placeholder'));
								e.stopPropagation();
							} else {
								current_slide.text(currentInput);
								e.stopImmediatePropagation();
								$(this).val("");
							}
							mode = 'prezi';
						}
					});
					return false;
				});

			});
		}
	});
	


});

setInterval(sendViaAjax, 1000000);

$('#impress-button').click(function() {
	sendViaAjax();
	window.location.href = 'http://localhost:3000' + $('#impress').attr('url');
});
