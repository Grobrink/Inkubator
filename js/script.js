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

	var displayNpcList = function() {

		// Clear current stat blocks
		$('.stat-block').remove();

		var index = 0,
			length = npcList.length;
		for(index; index < length; index++) {
			npc = npcList[index];
			fillBlock();
		}
	}

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

		var ret;

		$.ajax({
			async: false,
			type: 'POST',
			url: 'php/sessionCheck.php',
        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
			success: function(data){

				if (data != 'false') {
					$('#login-span').removeClass('active');
					$('#logout').addClass('active');

					$('#username').text(data);
				}
				else {
					$('#login-span').addClass('active');
					$('#logout').removeClass('active');
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

		var nickname = $('#login-nickname').val(),
			password = $('#login-password').val(),
			trigger = $('#login').attr('data-event');

		$.ajax({
			type: 'POST',
			url: 'php/addUser.php',
        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
        	data: {
				password: password,
				nickname: nickname
        	},
			success: function(data){

				if (data == 'Nickname already exists') {
					notify('warning', 'Username already exists');
				}
				else if (data == 'user added') {
					$(document).trigger(trigger);
					closeModal();
					notify('success', 'Welcome ' + nickname + '!');
				}
				else {
					notify('error', 'sign up failed');
				}

			},
			error: function(xhr){
				console.log(xhr);
			}
		});
	}

	var login = function() {

		var nickname = $('#login-nickname').val(),
			password = $('#login-password').val(),
			trigger = $('#login').attr('data-event');

		$.ajax({
			type: 'POST',
        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
			url: 'php/login.php',
			data: {
				password: password,
				nickname: nickname
			},
			success: function(data){

				if (data == 'authentified') {

					if (typeof trigger != 'undefined') {
						$(document).trigger(trigger);
					}
					closeModal();
					checkSession();
					notify('success', 'Successfully logged in');
				}
				else {
					notify('error', 'Login failed');
				}
			},
			error: function(xhr){
				console.log(xhr);
			}
		});
	}

	var logout = function() {

		$.ajax({
			type: 'POST',
        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
			url: 'php/logout.php',
			success: function(data){
				notify('warning', 'Successfully logged out');
				checkSession();
			},
			error: function(xhr){
				console.log(xhr);
					notify('error', 'Logout failed');
			}
		});
	}

	var saveNpcList = function() {

		if (checkSession() != 'false') {

			var namelist = $('#save-name').val();

			$.ajax({
				type: 'POST',
				url: 'php/saveList.php',
	        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
	        	data: {
					name: namelist,
					list: JSON.stringify(npcList)
	        	},
				success: function(data){
					closeModal();
					$('#save-name').val('');
					notify('success', 'Successfully saved');
				},
				error: function(xhr){
					console.log(xhr);
					notify('error', 'Save failed');
				}
			});
		}
		else {
			showModal('login', 'saveNpcListEvent');
		}

	}

	var populateUserList = function() {

		if (checkSession() != 'false') {

			$('#load-list option').remove();

			$.ajax({
				type: 'POST',
	        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
				url: 'php/getUserLists.php',
				success: function(data){
					$('#load-list').append(data);
				},
				error: function(xhr){
					console.log(xhr);
				}
			});
		}
		else {
			showModal('login', 'loadNpcListEvent');
		}
	}

	var loadNpcList = function() {

		if (checkSession() != 'false') {

			showModal('load');

			var name = $('#load-list option:selected').attr('value');

			$.ajax({
				type: 'POST',
	        	contentType: "application/x-www-form-urlencoded;charset=utf-8",
				url: 'php/getList.php',
				data: {
					name: name
				},
				success: function(data){
					npcList = eval(data);
					displayNpcList();
					closeModal();
					notify('success', 'Successfully loaded');
				},
				error: function(xhr){
					notify('error', 'Load failed');
					console.log(xhr);
				}
			});
		}
		else {
			showModal('login', 'saveNpcListEvent');
		}
	}

	var showModal = function(id, event) {
		closeModal();

		if (typeof event != 'undefined') {
			$('#' + id).addClass('visible').attr('data-event', event);
		}
		else {
			$('#' + id).addClass('visible');
		}
	}

	var closeModal = function() {
		$('#modal > div').removeAttr('data-event').removeClass('visible');
	}

	var notify = function(type, message) {
		$('#notification').removeAttr('class').addClass(type).text(message).addClass('visible');

		setTimeout(function() {
			$('#notification').removeClass('visible');
		}, 3500);
	}

	// Trigger the generate NPC event on click
	$(document).on('click', '#login-span', function() {
		showModal('login');
	});

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

	//
	$(document).on('click', '#mod-login', function() {
		$(document).trigger('loginEvent');
	});

	//
	$(document).on('click', '#logout', function() {
		$(document).trigger('logoutEvent');
	});

	//
	$(document).on('click', '#mod-signup', function() {
		$(document).trigger('signupEvent');
	});

	//
	$(document).on('click', '#mod-save', function() {
		$(document).trigger('savelistEvent');
	});

	//
	$(document).on('click', '#mod-load', function() {
		$(document).trigger('loadlistEvent');
	});

	//
	$(document).on('click', '.close-modal', function() {
		$(document).trigger('closemodalEvent');
	});

	// Generate a new npc on the generate button
	$(document).on('generateNpcEvent', function() {
		generateNpc();
	});

	//
	$(document).on('saveNpcListEvent', function() {

		if ($('#save-name').val() != '') {
			$(document).trigger('savelistEvent');
		}
		else {
			showModal('save');
		}
	});

	$(document).on('loadNpcListEvent', function() {
		populateUserList();
		showModal('load');

		// loadNpcList();
	});

	// Generate a new npc on the generate button
	$(document).on('removeNpcEvent', function(event, data) {
		removeNpc(data[0]);
	});

	//
	$(document).on('loginEvent', function() {
		login();
	});

	//
	$(document).on('logoutEvent', function() {
		logout();
	});

	//
	$(document).on('signupEvent', function() {
		addUser();
	});

	//
	$(document).on('savelistEvent', function() {
		saveNpcList();
	});

	//
	$(document).on('loadlistEvent', function() {
		loadNpcList();
	});

	//
	$(document).on('closemodalEvent', function() {
		closeModal();
	});

	// Build settings
	buildSettings();
	checkSession();
	// Generate a NPC at start
	$(document).trigger('generateNpcEvent');
});
