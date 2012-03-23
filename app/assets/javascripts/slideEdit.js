var current_slide = null,
 		mode = 'prezi';

document.addEventListener("keydown", function ( event ) {
	if (mode == "edit"){
		event.stopImmediatePropagation();
	}
});

document.addEventListener("keyup", function ( event ) {
	if (mode == "edit"){
		event.stopImmediatePropagation();
	}
});





$(function() {
	var markdown_to_html = function(controlChars, string) {
		var output = ''
		var isBold = falseer
		var isItalic = false
		for(var i = 0; i < controlChars.length; i++) {
			var controlChar = controlChars[i];
			var count = 0
			for(var i = 0; i < string.length; i++) {
				if(string[i] !== controlChar) {
					output = output + string[i]
				} else {
					count++
					if((string.split(controlChar).length - 1) % 2 === 0) {
						if(count == 1) {
							output = output + "<b>"
						} else if(count == 2) {
								output = output + "</b>"
								count = 0
						}
					}
				}
			}
		}
		return output
	}
	
	var html_to_markdown = function(string) {
		output = string.replace(/<\/{0,1}b>/g,"*") // replace <b> and </b> with *
		output = output.replace(/<\s*\w.*?>/g,"") // remove all open tags
		output = output.replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g,"") // remove all close tags
		return output
	}
	
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
		currentText = current_slide.text().length == 0 ? "write stuff" : html_to_markdown( current_slide.html() );
		inlineEditor.val(currentText);
		e.stopImmediatePropagation();

		if(activeInput == false) {
			activeInput = true;
			mode = 'edit';
			console.log(mode);
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
					current_slide.html($(this).attr('placeholder'));
					e.stopPropagation();
				} else {
					current_slide.html( markdown_to_html("*_",currentInput) );
					e.stopImmediatePropagation();
					$(this).val("");
					console.log(markdown_to_html("*_", "*we are gonna* be _smangin_"))
				}
				mode = 'prezi';
			}
		});
		return false;
	});
	
});