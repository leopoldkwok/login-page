var $ = jQuery.noConflict();

var app = app || {};
!function(){
	"use strict";

	$('html').removeClass('no-js');

	app.initialize = {
		init: function() {
			app.login.init();
		}
	},
	app.login = {
		init: function() {
				// To complete

				// Validate form before submit
				$('#signin-form').submit(function(event) {

					// if email and passwords are correct
					if(app.validation.email(email) && app.validation.password(id)) {

					// Pevents default event reloading if validation above is not correct
					event.preventDefault();

					// Success message
					document.write('Email and passwords are correct');
				}
					// Email error message if email is incorrect
					else if(!app.validation.email(email)) {
					return app.errorMsg.email(id);
				}

					else if(!app.validation.password(id)) {
						return app.errorMsg.password(id);
					}

			});

		}
	},
	app.validation = {
		email: function(email) {
			// Regex, use this to validate the Email. It return true or false.

			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		password: function(id) {
			// Use this to validate the Password. Checks if value is empty. It return true or false.

			var elementVal = $.trim(id.val());
			if(elementVal.length > 0)
				return true;
		}
	},
	app.errorMsg = {
		email: function(id) {
			var text = 'Your E-Mail is not valid';

			// To complete, add error message in the form
			return id.text;

		},
		password: function(id) {
			var text = 'Your Password is not valid';

			// To complete, add error message in the form
			return id.text;
		}
	}
	app.docOnReady = {
		init: function() {
			app.initialize.init();
		}
	};

	$(document).ready(app.docOnReady.init);

}(jQuery);

