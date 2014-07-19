$(function () {

	$(document).on('npcAddedEvent', function() {

		addSlideEvent();
	})

	var addSlideEvent = function() {

		$('.stat-block').last().hammer({ /* options */ }).on("pan", function(e) {

			var pos = e.gesture.deltaX,
				opacityValue = 1 - (Math.abs(pos)/120);

			$(this).css({position: 'relative', left: pos + 'px', opacity: opacityValue });

		});

		$('.stat-block').last().hammer().on('panend', function(e) {

			var pos = e.gesture.deltaX;

			if (Math.abs(pos) > 80) {
				$(this).fadeOut(0, function() {
					$(this).remove();

					if (!$('.stat-block').length) {

						// Generate a NPC at start
						$(document).trigger('generateNpcEvent');
					}
				});
			}
			else {
				$(this).css({position: 'relative', left: 0 + 'px', opacity: 1 });
			}
		})
	}
});
