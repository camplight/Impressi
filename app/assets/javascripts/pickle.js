$(document).ready(function() {
    var deck_id = $('#impress').attr('deck_id');
	establishEventListeners();
	
	$.ajax({
		url:  "http://localhost:3000/decks/" + deck_id,
		dataType: 'json',
		success: function(data) {
		    database.deckData = data;
			if (dataLoaded()) { constructTree() }
		}
	});
	
	$.ajax({
		url:  "http://localhost:3000/templates",
		dataType: 'json',
		success: function(data) {
			database.templateData = data;
			if (dataLoaded()) { constructTree() }
		}
	});
});

var database = {};

resetImpress = function() {
    window.impress().reset();
    window.impress();
};

var establishEventListeners = function() {
	document.addEventListener("keydown", function ( event ) {
		if (mode == "edit") {
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
		var currentSlide = null,
			activeInput  = false,
			textarea     = document.createElement('textarea'),
			inlineEditor = $(textarea);
			
		inlineEditor.attr('id', 'inline-editor');
		inlineEditor.attr('placeholder', 'Enter text here.')

		$(".editable").click(function(e) {

			if (!$(this).hasClass('active')) { return false; }

			var currentSlide = $(this),
				slideIndexNumber = parseInt(currentSlide.attr('id').slice(5)) - 1,
				currentText = database.deckData.content[slideIndexNumber];
			inlineEditor.val(currentText);
			e.stopImmediatePropagation();

			if (activeInput == false) {
				activeInput = true;
				mode = 'edit';
				currentSlide.html(inlineEditor);
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
					database.deckData.content[slideIndexNumber] = currentInput;
					currentSlide.html(currentInput.replace(/\n/g, '<br>'));
					e.stopImmediatePropagation();
					$(this).val('');
					mode = 'prezi';
				}
			});
			return false;
		});
	});
}

var buildTree = function() {
	
	var deck        = database.deckData,
		deck_length = deck.content.length,
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
		$('#impress > div').last().html(deck.content[i].replace(/\n/g, '<br>'));
	}
	$('#impress > div').first().addClass('active');
}

var constructTree = function() {
	destroyTree();
	buildTree();
	resetImpress();
	if ($('#impress').attr('data-mode') == 'edit') { createInlineEditor(); }
}

var dataLoaded = function() {
	return Boolean(database.templateData && database.deckData);
}

var destroyTree = function() {
	$('#impress > div').remove();
}


var sendViaAjax = function(redirect_url) {
	$.ajax({
		type: "PUT",
		data:  { deck: database.deckData; },
		url:  "http://localhost:3000/decks/" + database.deckData.id,
		success: function() { if (redirect_url) { window.location.href = redirect_url; } 
		},
		failure: function() { console.log(err); }
	});
};

setInterval(sendViaAjax, 10000);

$('#impress-button').click(function() {
	var redirect_url = "http://localhost:3000/decks/" + database.deckData.id;
	sendViaAjax(redirect_url);
});

$('.temp_dropdown').change(function() {
	database.deckData.template_id = parseInt($(this).val());
	constructTree();
});