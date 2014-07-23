$(function () {

	$(document).on('npcAddedEvent', function() {

		addSlideEvent();

		// Remove the default inactive class
		// Bug ? If not in a setTimeout (0 ??????) there is no transition
		setTimeout(function() {
			$('.stat-block').removeClass('inactive');
		},10);
	});

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

					console.log(e);

					// Remove the element
					$(this).remove();

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
});
