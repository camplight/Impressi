!!$(function() {
	var current_slide = null,
	 		mode          = 'prezi';

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

		var markdown_to_html = function(controlChars, string) {
			var output = ''
			var isBold = false
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
			output = string.replace(/<\/{0,1}em>/g,"_") // replace <em> and </em> with _
			output = output.replace(/<\s*\w.*?>/g,"") // remove all open tags
			output = output.replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g,"") // remove all close tags
			return output
		}
	
		var activeInput   = false,
				form          = document.createElement('form'),
				textarea      = document.createElement('textarea'),
				inlineEditor  = $(textarea)
											  .attr('rows', '3')
											  .attr('id', 'inline-editor')
											  .attr('placeholder', 'your text here'),
				formWrapper   = $(form)
												.attr('id', 'edit-holder')
												.css({"pointer-events": "auto"})
												.html(inlineEditor);

	
		$(".editable").click(function(e) {

			if(!$(this).hasClass('active')) {
				return false;
			}
		
			current_slide = $(this);
			currentSelector = "#" + $(this).attr('id');
			currentText = current_slide.text().length === 0 ? "Click here to edit" : html_to_markdown( current_slide.html() );
			inlineEditor.val(currentText);
			e.stopImmediatePropagation();

			if(activeInput == false) {
				activeInput = true;
				mode = 'edit';
				$(this).html(formWrapper);
				$('#inline-editor').focus();
			} else {
			 		activeInput = false;
					mode = 'prezi';
					inlineEditor.blur();
					formWrapper.blur();
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
					if($(this).val() === "") {
	        	current_slide.html("<p />");
						$(currentSelector + " > p").html("Click here to edit");
						e.stopImmediatePropagation();
					} else {
						current_slide.html("<p />");
						$(currentSelector + " > p").html($.trim(markdown_to_html("*_",currentInput)));
						e.stopImmediatePropagation();
						$(this).val("");
					}
					mode = 'prezi';
				}
			});
			return false;
		});
}());