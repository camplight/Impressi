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
	var activeInput = false;
			textarea = document.createElement('textarea'),
			inlineEditor = $(textarea);
	inlineEditor.attr('id', 'inline-editor');
	inlineEditor.attr('placeholder', 'put your awesome presentation awesomeness here!')
	
	$(".editable").click(function(e) {
		current_slide = $(this);
		console.log(activeInput);
		e.stopImmediatePropagation();
	
		
		if(!$(this).hasClass('active')) {
			return false;
		}
		
		if(activeInput == false) {
			activeInput = true;
			console.log(activeInput + '  after flag check');
			mode = 'edit';
			$(this).html(inlineEditor);
			inlineEditor.focus();
		
		} else {
		 		activeInput = false;
				mode = 'prezi';
				inlineEditor.blur();
				//inlineEditor.hide();
				e.stopImmediatePropagation();
		}

			inlineEditor.on({	
				keyup: function(e) {
					if (e.keyCode == 27) {
						$(this).blur();
						activeInput = false;
						//$(this).hide('fast');
					}
				},
						
					blur: function() {
					
						console.log($(this).val());
						if($(this).val() === "" || $(this).val().length === 1) {
							//$(this).val("Edit the text here.");
							inlineEditor.attr('placeholder', 'put your awesome presentation awesomeness here!')
							e.stopPropagation();
							
						} else {
							current_slide.text($(this).val());
							console.log(mode);
						}
							$(this).val("");
							mode = 'prezi';
					}
					
				});
	
		return false;
	});

	// $("inline-editor")
});