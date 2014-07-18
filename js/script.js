$(function () {

	// Import Inkubator
	var inkubator = new Inkubator();
	var npc;

	// Import Utils
	var utils = new Utils();

	/**
	 * Fill the html block
	 */
	var fillBlock = function() {

		// Set name
		$('.name').text(npc.name);

		// Set description
		var $description = $('.description'),
			subraceString = '';

		if ($description.val() != '') {
			$description.text(npc.name);
		}

		if (npc.subrace != '') {
			subraceString = ', ' + npc.subrace;
		}
		$description.text(npc.race + ' ' + npc.gender + subraceString);

		// Set hit points
		$('.hitpoints').text(npc.hitPoints);

		// Set caracteristics
		$('.str').text(npc.attributes.str);
		$('.dex').text(npc.attributes.dex);
		$('.con').text(npc.attributes.con);
		$('.int').text(npc.attributes.int);
		$('.wis').text(npc.attributes.wis);
		$('.cha').text(npc.attributes.cha);

		// Set caracteristics modifier
		$('.str-modifier').text(inkubator.getAttributeModifier(npc.attributes.str));
		$('.dex-modifier').text(inkubator.getAttributeModifier(npc.attributes.dex));
		$('.con-modifier').text(inkubator.getAttributeModifier(npc.attributes.con));
		$('.int-modifier').text(inkubator.getAttributeModifier(npc.attributes.int));
		$('.wis-modifier').text(inkubator.getAttributeModifier(npc.attributes.wis));
		$('.cha-modifier').text(inkubator.getAttributeModifier(npc.attributes.cha));

		// Set passive perception
		$('.perception').text(npc.perception);

		// Set languages
		$('.languages').text(npc.languages);

		// Set Alignment
		$('.alignment').text(npc.alignment);
	};

	/**
	 * Cal lstuff to generate a new NPC
	 */
	var generateNpc = function() {
		npc = inkubator.getNpc();
		fillBlock();

		console.log(npc);
	}

	// Trigger the generate NPC event on click
	$(document).on('click', '#new-npc', function() {
		$(document).trigger('generateNpcEvent');
	});

	// Generate a new npc on the generate button
	$(document).on('generateNpcEvent', function() {
		generateNpc();
	});

	// Generate a NPC at start
	$(document).trigger('generateNpcEvent');
});
