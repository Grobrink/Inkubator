$(function () {

	// Import Inkubator
	var inkubator = new Inkubator();
	var npc,
		npcList = [];

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

	var addNpcToList = function(newNpc) {

		npcList.push(newNpc);
	}

	var removeNpcFromList = function(block) {

		var index = 0,
			blockIndex = $(block).index();
		if (blockIndex != -1) {
			index = blockIndex;
		}

		npcList.splice(index, 1);

		block.remove();
	}

	var removeNpc = function(index) {

		removeNpcFromList(index);
		$(this).remove();
	}

	/**
	 * Call stuff to generate a new NPC
	 */
	var generateNpc = function() {

		var settings = getSettings();

		npc = $.extend(true, {}, inkubator.getNpc(settings));
		fillBlock();

		addNpcToList(npc);
	}

	var checkSession = function() {

		console.log('checkSession()');

		var ret;

		$.ajax({
			async: false,
			type: 'POST',
			url: 'php/sessionCheck.php',
        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
			success: function(data){

				console.log('retour de checkSession : ' + data);

				if (data == 'true') {
					console.log('Y a une session');
				}
				else {
					console.log('Y a pas de session');
				}

				ret = data;
			},
			error: function(xhr){
				console.log(xhr);
			}
		});

		return ret;
	}

	var addUser = function() {

		console.log('addUser()');

		showModal('adduser');

		$.ajax({
			type: 'POST',
			url: 'php/addUser.php',
        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
        	data: {
        		'nickname': 'Grobrink' + utils.roll(0,10000,0),
        		'password': 'karapass007'
        	},
			success: function(data){
				console.log(data);
			},
			error: function(xhr){
				console.log(xhr);
			}
		});
	}

	var login = function(event) {

		console.log('login()');

		showModal('login');

		var ret;
		$.ajax({
			async: false,
			type: 'POST',
        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
			url: 'php/login.php',
			data: {
				password: 'karapass007',
				nickname: 'Grobrink181'
			},
			success: function(data){
				console.log(data, 'trigger : ' + event);
				ret = data;
				// $(document).trigger(event)
			},
			error: function(xhr){
				console.log(xhr);
			}
		});

		return ret
	}

	var saveNpcList = function() {

		console.log('saveNpcList()');

		showModal('save');

		if (checkSession() == 'true') {

			$.ajax({
				type: 'POST',
				url: 'php/saveList.php',
	        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
	        	data: {
	        		userId: 'Grobrink181',
	        		name: 'Plein de PNJs',
	        		list: JSON.stringify(npcList)
	        	},
				success: function(data){
					console.log(data);
				},
				error: function(xhr){
					console.log(xhr);
				}
			});
		}
		else {
			login('saveNpcListEvent');
		}

	}

	var loadNpcList = function() {

		console.log('loadNpcList()');

		showModal('load');

		if (checkSession() == 'true') {

			var ret;
			$.ajax({
				async: false,
				type: 'POST',
	        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
				url: 'php/getList.php',
				data: {
					userId: 'Grobrink181',
					id: '53d677b9c41f3'
				},
				success: function(data){
					console.log(data);
					ret = data;
				},
				error: function(xhr){
					console.log(xhr);
				}
			});
		}
		else {
			login('loadNpcListEvent');
		}

		return ret
	}

	var showModal = function(id) {

		$('#modal > div').removeClass('visible');
		$('#' + id).addClass('visible');
	}

	// Trigger the generate NPC event on click
	$(document).on('click', '#new-npc', function() {
		$(document).trigger('generateNpcEvent');
	});

	// Trigger the generate NPC event on click
	$(document).on('click', '#save-npclist', function() {
		$(document).trigger('saveNpcListEvent');
	});

	// Trigger the generate NPC event on click
	$(document).on('click', '#load-npclist', function() {
		$(document).trigger('loadNpcListEvent');
	});

	// Generate a new npc on the generate button
	$(document).on('generateNpcEvent', function() {
		generateNpc();
	});

	// addUser();
	// Generate a new npc on the generate button
	$(document).on('saveNpcListEvent', function() {
		saveNpcList();
	});

	$(document).on('loadNpcListEvent', function() {
		loadNpcList();
	});

	// Generate a new npc on the generate button
	$(document).on('removeNpcEvent', function(event, data) {
		removeNpc(data[0]);
	});

	// Build settings
	buildSettings();
	// Generate a NPC at start
	$(document).trigger('generateNpcEvent');
});
