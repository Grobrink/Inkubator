$(function () {

	$(document).on('npcAddedEvent', function() {

		addPanDown();
		addSlideEvent();
	})

	var addPanDown = function() {

		$('.stat-block').last().hammer({ /* options */ }).on("pandown", function(e) {

			console.log('swipdown');

			var $container = $('#container');

			var pos = e.gesture.deltaY,
				opacityValue = 1 - (Math.abs(pos)/120);

			if (pos <= 50) {

				$container.css({position: 'relative', top: pos + 'px'});
			}
			else {
				$(document).trigger('npcAddedEvent');
				$container.css({top: '0px'});				
			}
		});
	}

	var addSlideEvent = function() {

		$('.stat-block').last().hammer({ /* options */ }).on("panleft panright", function(e) {

			var pos = e.gesture.deltaX,
				opacityValue = 1 - (Math.abs(pos)/120);

			$(this).css({position: 'relative', left: pos + 'px', opacity: opacityValue });

		});

		$('.stat-block').last().hammer().on('panend', function(e) {

			$('#container').css({top: '0px'});
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
