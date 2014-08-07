$(function () {

	$(document).on('npcAddedEvent', function() {

		addTouchControls();

		// addSlideEvent();

		// Remove the default inactive class
		// Bug ? If not in a setTimeout (0 ??????) there is no transition
		setTimeout(function() {
			$('.stat-block').removeClass('inactive');
		},10);
	});

	var addTouchControls = function() {

		var $firstStatBlock = $('.stat-block').first();
		$firstStatBlock.on('click', function(e) {

			e.stopPropagation();

			if (!$firstStatBlock.find('.edit').hasClass('hidden')) {
				$firstStatBlock.find('menu').toggleClass('toggle');
				$firstStatBlock.find('button').attr('tabindex', '0');
			}

		});



		$firstStatBlock.find('.remove').on('click', function(e) {
			e.stopPropagation();

			var $currentStatBlock = $(e.currentTarget).closest('.stat-block');

			// Add the inactive class
			$currentStatBlock.addClass('inactive');

			// On transition complete remove the element
			$currentStatBlock.on('otransitionend transitionend webkitTransitionEnd', function(e) {

				// Remove the element
				if (e.originalEvent.propertyName == 'opacity') {

					$(document).trigger('removeNpcEvent', [$currentStatBlock]);
				}

				// If there is no more element, add a new one
				if (!$('.stat-block').length) {

					// Generate a NPC at start
					$(document).trigger('generateNpcEvent');
				}
			});

			// Give focus to generate npc button
			$('#new-npc').focus();
		});

		$firstStatBlock.find('.edit').on('click', function(e) {

			e.stopPropagation();

			var $currentStatBlock = $(event.currentTarget).closest('.stat-block');

			$(e.currentTarget).toggleClass('hidden');
			$currentStatBlock.find('.validate').toggleClass('hidden');
			$currentStatBlock.find('.cancel').toggleClass('hidden');

			$currentStatBlock.find('.uneditable').addClass('hidden');
			$currentStatBlock.find('.editable').removeClass('hidden');

			// Give focus to te first input
			$currentStatBlock.find('input:first').focus();

		});

		$firstStatBlock.find('.validate').on('click', function(e) {

			e.stopPropagation();

			var $currentStatBlock= $(event.currentTarget).closest('.stat-block');

			$(e.currentTarget).toggleClass('hidden');
			$currentStatBlock.find('.cancel').toggleClass('hidden');
			$currentStatBlock.find('.edit').toggleClass('hidden');

			$currentStatBlock.find('.uneditable').removeClass('hidden');
			$currentStatBlock.find('.editable').addClass('hidden');

			$(document).trigger('setNpcFromEditEvent', [$currentStatBlock, $currentStatBlock.index()]);

			// Give focus to the generate npc button
			$('#new-npc').focus();
		});

		$firstStatBlock.find('.cancel').on('click', function(e) {

			e.stopPropagation();

			var $currentStatBlock= $(event.currentTarget).closest('.stat-block');

			$(e.currentTarget).toggleClass('hidden');
			$currentStatBlock.find('.validate').toggleClass('hidden');
			$currentStatBlock.find('.edit').toggleClass('hidden');

			$currentStatBlock.find('.uneditable').removeClass('hidden');
			$currentStatBlock.find('.editable').addClass('hidden');

			// Give focus to generate npc button
			$('#new-npc').focus();

			// Close the menu
			$currentStatBlock.find('menu').toggleClass('toggle');
			$currentStatBlock.find('button').attr('tabindex', '-1');

		});

		$firstStatBlock.find('label, input, textarea').on('click', function(e) {

			e.stopPropagation();
		});
	}

	// Remove, old stuff
	var addSlideEvent = function() {

		$('.stat-block').first().hammer({ /* options */ }).on("panleft panright", function(e) {

			e.stopPropagation();

			var pos = e.gesture.deltaX,
				opacityValue = 1 - (Math.abs(pos)/200);

			$(this).css({left: pos + 'px', opacity: opacityValue });

			if (Math.abs(pos) > 80 && e.gesture.isFinal == 1) {

				// Element has inline style set by jquery
				// It doesn't allow opacity transition
				if ($(this).position().left > 0) {
					$(this).attr('style', 'left: 100%');
				}
				else {
					$(this).attr('style', 'left: -100%');
				}

				// Add the inactive class
				$(this).addClass('inactive');

				// On transition complete remove the element
				$(this).on('otransitionend transitionend webkitTransitionEnd', function(e) {

					// Remove the element
					$(document).trigger('removeNpcEvent', [$(this)]);

					// If there is no more element, add a new one
					if (!$('.stat-block').length) {

						// Generate a NPC at start
						$(document).trigger('generateNpcEvent');
					}
				});
			}

			// Reset Left position for the last pan event
			if (e.gesture.isFinal == 1) {

				if (Math.abs(pos) <= 80) {
					$(this).css({left: '0px', opacity: 1 });
				}
			}

		});
	}

	$('#settings-cta').on('click', function() {
		$('#settings-panel').toggleClass('active');

		if ($('#settings-panel').hasClass('active')) {
			$('#male-cb').focus();
		}
		else {
			// Give focus to generate npc button
			$('#new-npc').focus();
		}
	})

	// Make stat-block expendable on enter or space up
	$(document).on('keyup', '.stat-block:focus', function(e) {

		console.log(e.keyCode);

		if (e.keyCode == "13" ||
			e.keyCode == "32" ) {
			// $(document).trigger('');

			$(e.currentTarget).find('menu').toggleClass('toggle');
			$(e.currentTarget).find('button').attr('tabindex', '0');

			$(e.currentTarget).find('.edit').focus();

		}
	})

	// Make stat-block expendable on enter or space up
	$(document).on('keyup', '.stat-block', function(e) {

		if (e.keyCode == "9") {
		}
	})

	// Make stat-block expendable on enter or space up
	$(document).on('keydown', '.stat-block input:last', function(e) {

		console.log(e.keyCode);

		if (e.keyCode == "9") {
			$(e.currentTarget).closest('.stat-block').find('.validate').focus();
		}
	})

});
