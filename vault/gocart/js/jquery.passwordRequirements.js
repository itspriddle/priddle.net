(function($){
    $.fn.extend({
        passwordRequirements: function(options) {
			

            // options for the plugin
            var defaults = {
				numCharacters: 6,
				useLowercase: true,
				useUppercase: true,
				useNumbers: true,
				useSpecial: true,
				infoMessage: '',
				style: "a2",
				fadeTime:300 
            };

            options =  $.extend(defaults, options);

            return this.each(function() {
				
				var o = options;
				var field_is = $(this);
				
                o.infoMessage = 'The minimum password length is ' + o.numCharacters + ' characters and must contain at least 1 lowercase letter, 1 capital letter, 1 number, and 1 special character.';
				// Add Variables for the li elements
				var numCharactersUI = '<li class="pr-numCharacters"><span class="pr-notok"></span>' + o.numCharacters + ' characters</li>',
					useLowercaseUI = '',
					useUppercaseUI = '',
					useNumbersUI   = '',
					useSpecialUI   = '';
					passwordField = false;
				// Check if the options are checked
		
				if (o.useLowercase === true) {
					useLowercaseUI = '<li class="pr-useLowercase"><span class="pr-notok"></span>Lowercase letter</li>';
				}
				if (o.useUppercase === true) {
					useUppercaseUI = '<li class="pr-useUppercase"><span class="pr-notok"></span>Capital letter</li>';
				}
				if (o.useNumbers === true) {
					useNumbersUI = '<li class="pr-useNumbers"><span class="pr-notok"></span>Number</li>';
				}
				if (o.useSpecial === true) {
					useSpecialUI = '<li class="pr-useSpecial"><span class="pr-notok"></span>Special character</li>';
				}			
				
				// Append password hint div
				var messageDiv = '<div id="pr-box"><i></i><div id="pr-box-inner"><p class="mb-0">' + o.infoMessage + '</p><ul>' + numCharactersUI + useLowercaseUI + useUppercaseUI + useNumbersUI + useSpecialUI + '</ul></div></div>';
				
				
				// Set campletion vatiables
				var numCharactersDone = true,
					useLowercaseDone = true,
					useUppercaseDone = true,
					useNumbersDone   = true,
					useSpecialDone   = true;

				// Show Message reusable function 
				var createMessage = function () {
					$("body").append(messageDiv);
				};					
                
				// Show Message reusable function 
				var showMessage = function () {
					$("#pr-box").show();
					if (numCharactersDone === false || useLowercaseDone === false || useUppercaseDone === false || useNumbersDone === false || useSpecialDone === false) {
							// Find the position of element
							var posH = field_is.offset().top,
								itemH = field_is.innerHeight(),
								totalH = posH+itemH,
								itemL = field_is.offset().left;
							// Append info box tho the body
							//$("#pr-box").remove();
							//$("body")     .append(messageDiv);
							$("#pr-box")  .addClass(o.style)
										  .show()
										  .css({top:totalH, left:itemL});
						return false;
					}
				};
							
				// Delete Message reusable function 
				var deleteMessage = function () {
					var targetMessage = $("#pr-box");
					targetMessage.fadeOut(o.fadeTime, function(){
						//$(this).remove();
					});				
				};
				
				// Show / Delete Message when completed requirements function 
				var checkCompleted = function () {
					
					if (numCharactersDone === true && useLowercaseDone === true && useUppercaseDone === true && useNumbersDone === true && useSpecialDone === true) {
						passwordField = true;
						$('#weak-password-error').hide();
						//deleteMessage();
					} else {
						passwordField = false;
						showMessage();
					}
				};
		
				// Show or Hide password hint based on user's event
				// Set variables
				var lowerCase   		= new RegExp('[a-z]'),
					upperCase   		= new RegExp('[A-Z]'),
					numbers     		= new RegExp('[0-9]');
				
				$(this).on("keypress",function (){
					//createMessage();
				});
				
				$(this).on("blur",function (){
					deleteMessage();
				});		

				$(this).on("focus paste",function (){
					showMessage();
				});

				createMessage();
				
				// Show or Hide password hint based on keyup
				field_is.on("keyup  focus", function (){
					var thisVal = $(this).val(); 	
				
					// Check # of characters
					if ( thisVal.length >= o.numCharacters ) {
						$(".pr-numCharacters span").removeClass("pr-notok").addClass("pr-ok");
						numCharactersDone = true;
					} else {
						$(".pr-numCharacters span").removeClass("pr-ok").addClass("pr-notok");
						numCharactersDone = false;
					}
					// lowerCase meet requirements
					if (o.useLowercase === true) {
						if ( thisVal.match(lowerCase) ) {
							$(".pr-useLowercase span").removeClass("pr-notok").addClass("pr-ok");
							useLowercaseDone = true;
						} else {
							$(".pr-useLowercase span").removeClass("pr-ok").addClass("pr-notok");
							useLowercaseDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useUppercase === true) {
						if ( thisVal.match(upperCase) ) {
							$(".pr-useUppercase span").removeClass("pr-notok").addClass("pr-ok");
							useUppercaseDone = true;
						} else {
							$(".pr-useUppercase span").removeClass("pr-ok").addClass("pr-notok");
							useUppercaseDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useNumbers === true) {
						if ( thisVal.match(numbers) ) {
							$(".pr-useNumbers span").removeClass("pr-notok").addClass("pr-ok");
							useNumbersDone = true;
						} else {
							$(".pr-useNumbers span").removeClass("pr-ok").addClass("pr-notok");
							useNumbersDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useSpecial === true) {
						var symbols = thisVal.replace(/\W/g, "");
						var numsymbols = (thisVal.length - symbols.length);

						if ( numsymbols >= 1 ) {
							$(".pr-useSpecial span").removeClass("pr-notok").addClass("pr-ok");
							useSpecialDone = true;
						} else {
							$(".pr-useSpecial span").removeClass("pr-ok").addClass("pr-notok");
							useSpecialDone = false;
						}
					}

					checkCompleted();
				});
            });
        }
    });
})(jQuery);