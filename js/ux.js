$(function () {

	$(document).on('npcAddedEvent', function() {
		addSlideEvent();
	})

	// $('#inkubator').hammer({threshold: 1}).on("pandown", function(e) {

	// 	console.log('pandown');

	// 	var pos = e.gesture.deltaY,
	// 		opacityValue = 1 - (Math.abs(pos)/120);

	// 	if (pos <= 80) {

	// 		$(this).css({position: 'relative', top: pos + 'px'});
	// 	}
	// 	else {
	// 		// Reset Left position for the last pan event
	// 		if (e.gesture.isFinal == 1) {
	// 			$(this).css({top: '0px'});
	// 			$(document).trigger('generateNpcEvent');
	// 		}
	// 	}
	// });

	var addSlideEvent = function() {

		$('.stat-block').first().hammer({ /* options */ }).on("panleft panright", function(e) {

			e.stopPropagation();

			var pos = e.gesture.deltaX,
				opacityValue = 1 - (Math.abs(pos)/200);

			$(this).css({left: pos + 'px', opacity: opacityValue });

			if (Math.abs(pos) > 80) {
				$(this).remove();

				if (!$('.stat-block').length) {

					// Generate a NPC at start
					$(document).trigger('generateNpcEvent');
				}
			}

			// Reset Left position for the last pan event
			if (e.gesture.isFinal == 1) {

				if (Math.abs(pos) <= 80) {
					console.log('on replace à zéro');
					$(this).css({left: '0px', opacity: 1 });
				}
			}

		});
	}
});
