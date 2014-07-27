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

		// Set description
		var $description = $('.description'),
			subraceString = '';

		if ($description.val() != '') {
			$description.text(npc.name);
		}

		dna.clone('npc-template', {
			name: npc.name,
			description: npc.subrace + ' ' + npc.gender,
			hitpoints: npc.hitPoints,
			str: npc.attributes.str,
			strm: inkubator.getAttributeModifier(npc.attributes.str),
			dex: npc.attributes.dex,
			dexm: inkubator.getAttributeModifier(npc.attributes.dex),
			con: npc.attributes.con,
			conm: inkubator.getAttributeModifier(npc.attributes.con),
			int: npc.attributes.int,
			intm: inkubator.getAttributeModifier(npc.attributes.int),
			wis: npc.attributes.wis,
			wism: inkubator.getAttributeModifier(npc.attributes.wis),
			cha: npc.attributes.cha,
			cham: inkubator.getAttributeModifier(npc.attributes.cha),
			visual: npc.description,
			perception: npc.perception,
			armor: npc.armor,
			languages: npc.languages,
			level: npc.level,
			alignment: npc.alignment
		},
		{
			top: true,
			callback: function() {$(document).trigger('npcAddedEvent')} }
		);
	};

	var setHtmlStrings = function(data) {

		var index = 0;
			length = Object.keys(data).length,
			compoStr = '',
			name;
		for(index; index < length; index++) {

			name = data[index]['name'];

			compoStr += '<span>';
			compoStr += '<input id="'+name+'-cb" type="checkbox" value="'+index+'" />';
			compoStr += '<label for="'+name+'-cb"> '+name+'</label>';
			compoStr += '</span>';
		}

		return compoStr;
	}

	var buildSettings = function() {

		var genders = '<div id="genders">' + setHtmlStrings(inkubator.dataRaw.genders) + '</div>';
		var races = '<div id="races">' + setHtmlStrings(inkubator.dataRaw.races) + '</div>';

		$('#settings-panel').prepend(genders + races);
	}

	var getSettings = function() {

		var settings = {},
			$raceInputChecked = $('#races input:checked'),
			$raceInputNotChecked = $('#races input'),
			$gendersInputChecked = $('#genders input:checked'),
			$gendersInputNotChecked = $('#genders input');
		settings.races = [];
		settings.genders = [];
		settings.population = $('#population').val();
		settings.level = $('#level').val();

		// Get race filter
		if ($raceInputChecked.length) {

			$raceInputChecked.each(function(index, element) {
				settings.races.push($(element).attr('value'));
			});
		}
		else {

			$raceInputNotChecked.each(function(index, element) {
				settings.races.push($(element).attr('value'));
			});
		}

		// Get gender filter
		if ($gendersInputChecked.length) {

			$gendersInputChecked.each(function(index, element) {
				settings.genders.push($(element).attr('value'));
			});
		}
		else {

			$gendersInputNotChecked.each(function(index, element) {
				settings.genders.push($(element).attr('value'));
			});
		}

		return settings;
	}

	/**
	 * Call stuff to generate a new NPC
	 */
	var generateNpc = function() {

		var settings = getSettings();

		npc = inkubator.getNpc(settings);
		fillBlock();
	}

	// Trigger the generate NPC event on click
	$(document).on('click', '#new-npc', function() {
		$(document).trigger('generateNpcEvent');
	});

	// Generate a new npc on the generate button
	$(document).on('generateNpcEvent', function() {
		generateNpc();
	});

	// Build settings
	buildSettings();
	// Generate a NPC at start
	$(document).trigger('generateNpcEvent');
});
