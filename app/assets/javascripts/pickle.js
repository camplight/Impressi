(function($) {
	$.fn.getAttributes = function() {
  	var attributes = {}; 
		
		if(!this.length) return this;

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
	// put the content into an array

	var user_input = [];
	var number_of_steps = $('#impress .step').length;
	
	for(var i = 0; i < number_of_steps; i++) {
	 	var attr = $($('#impress .step')[i]).getAttributes();
	    user_input.push(attr);
		
	//Syntax for accessing objects as key/value pairs, maybe we can send as JSON
	 			for(key in attr) {
	 				//console.log(key + '  :  ' + attr[key])
	 				user_input[key] = attr[key]
	 			}  
		
		//user_input[key] = attr[key]
	}
	
	return user_input;
};

var sendViaAjax = function(redirect_url) {
	
	var deck_id = $('#impress').attr('deck_id');
    var contents = grabDeckData();
		  
	$.ajax({
			 type: "PUT",
			 data:  {
		         content: contents
		   },
			 url:  "http://localhost:3000/decks/" + deck_id,
			 success: function() {
				 if (redirect_url) { window.location.href = redirect_url }
				 console.log(contents);
			 },
			 failure: function() {
				 	console.log(err); 
			 }
		});
};

var resetImpress = function() {
    i = window.impress();
    i.reset();
    window.impress();
};

var insertContent = function(content) {
	for(var i = 0; i < data.deck_data.length; i++) {
		$('#impress').append('<div></div>');
		for(var x = 0; x < template_attrs.length; x++) {
			$('#impress > div').last().attr(template_attrs[x], data.deck_data[i][template_attrs[x]]);
		}
		$('#impress > .step').last().text(data.deck_data[i]['content']);
	}
	$('#impress > .step').first().addClass('active');
};

var establishEventListeners = function() {
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
}




var createInlineEditor = function() {
	$(function() {
		var current_slide = null,
			activeInput = false,
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
			currentText = current_slide.html().length == 0 ? "Write here." : current_slide.text();
			console.log(currentText);
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
						currentInput = currentInput.replace(/\n/g, '<br>')
						current_slide.html(currentInput);
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

var database = {};

var buildTree = function() {
	
	deck        = database.deckData;
	deck_length = deck.content.length;
	template    = database.templateData[deck.template_id - 1];

	for(var i = 0; i < deck_length; i++) {
		$('#impress').append('<div></div>');
		$('#impress > div').last().attr('class', template['klass']);
		$('#impress > div').last().attr('data-x', template['data-x'] * i);
		$('#impress > div').last().attr('data-y', template['data-y'] * i);
		$('#impress > div').last().attr('data-z', template['data-z'] * i);
		$('#impress > div').last().attr('data-rotate-x', template['data-rotate-x'] * i);
		$('#impress > div').last().attr('data-rotate-y', template['data-rotate-y'] * i);
		$('#impress > div').last().attr('data-rotate-z', template['data-rotate-z'] * i);
		$('#impress > div').last().attr('data-scale', template['data-scale']);
		$('#impress > div').last().text(deck.content[i]);
	}
	$('#impress > .step').first().addClass('active');
}

var constructTreeOnLoad = function() {
	if (Boolean(database.templateData && database.deckData)) {
		buildTree();
		resetImpress();
		createInlineEditor(); 
	}
}
	
// 	var template_attrs = ['class', 'data-rotate-x', 'data-rotate-y', 'data-rotate-z', 'data-scale', 'data-x', 'data-y', 'data-z'];
//   	// $('#impress > div').remove();
// 	for(var i = 0; i < data.deck_data.length; i++) {
// 		$('#impress').append('<div></div>');
// 		for(var x = 0; x < template_attrs.length; x++) {
// 			$('#impress > div').last().attr(template_attrs[x], data.deck_data[i][template_attrs[x]]);
// 		}
// 		if (contents !== 'undefined') {
// 			$('#impress > .step').last().text(contents[i]['content']);
// 			console.log(contents[i]['content']);
// 		} else {
// 			$('#impress > .step').last().text(data.deck_data[i]['content']);
// 			console.log(data.deck_data[i]['content'])
// 		}
// 	}
// 	$('#impress > .step').first().addClass('active');
// }

$(document).ready(function() {
    var deck_id = $('#impress').attr('deck_id');
	establishEventListeners();
	
	$.ajax({
		url:  "http://localhost:3000/decks/" + deck_id,
		dataType: 'json',
		success: function(data) {
		    database.deckData = data;
			constructTreeOnLoad();
		}
	});
	
	$.ajax({
		url:  "http://localhost:3000/templates",
		dataType: 'json',
			success: function(data) {
			database.templateData = data;
			constructTreeOnLoad();
		}
	});
});

// setInterval(sendViaAjax, 10000);

$('#impress-button').click(function() {
	var redirect_url = "http://localhost:3000/decks/" + $('#impress').attr('deck_id');
	sendViaAjax(redirect_url);
});

$('.temp_dropdown').change(function() {
	var template_id = $(this).val();
	
	$.ajax({
		url:  "http://localhost:3000/decks/" + template_id,
		dataType: 'json',
		success: function(data) {
			var contents = grabDeckData();
			buildTree(data, contents);
			resetImpress();
			createInlineEditor();
		}
	});
})









