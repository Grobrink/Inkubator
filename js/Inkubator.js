
/**
 * Inkubator is the basic class to generate a basic NPC
 */
var Inkubator = function() {};

var utils = new Utils();

////////////////////
//      Data      //
////////////////////

Inkubator.prototype.npc= {
	gender: '',
	name: '',
	level: 0,
	hitPoints: 0,
	alignment: '',
	race: '',
	subrace: '',
	mainLanguage: '',
	languages: '',
	wealth: '',
	treasure: 0,
	hierarchy: '',
	perception: 0,
	attributes: {
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0
	},
	settings: {
		genderRatio: 8
	}
};

Inkubator.prototype.races = {
	0: {
		ratio: 70,
		name: 'Human'
	},
	1: {
		ratio: 85,
		name: 'Dwarf',
		language: 'Dwarfish'
	},
	2: {
		ratio: 93,
		name: 'Halfling',
		language: 'Halfling'
	},
	3: {
		ratio: 100,
		name: 'Elf',
		language: 'Elvish'
	}
};

Inkubator.prototype.languages = {
	0: {
		ratio: 35,
		name: 'Dwarvish'
	},
	1: {
		ratio: 60,
		name: 'Halfling'
	},
	2: {
		ratio: 75,
		name: 'Elvish'
	},
	3: {
		ratio: 85,
		name: 'Gnomish'
	},
	4: {
		ratio: 90,
		name: 'Orc'
	},
	5: {
		ratio: 100,
		name: 'Goblin'
	}
};

Inkubator.prototype.nameList = {
	Human: {
		subraces: {
			Calishite: {
				male: ['Aseir', 'Bardeid', 'Haseid', 'Khemed', 'Mehmen', 'Sudeiman', 'Zasheir'],
				female: ['Atala', 'Ceidil', 'Hama', 'Jasmal', 'Meilil', 'Seipora', 'Yasheira', 'Zasheida'],
				lastnames: ['Basha', 'Dumein', 'Jassan', 'Khalid', 'Mostana', 'Pashar', 'Rein']
			},
			Chondathan: {
				male: ['Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Malark', 'Morn', 'Randal', 'Stedd'],
				female: ['Arveene', 'Esvele', 'Jhessail', 'Kerri', 'Lureene', 'Miri', 'Rowan', 'Shandri', 'Tessele'],
				lastnames: ['Amblecrown', 'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Tallstag']
			},
			Damaran: {
				male: ['Bor', 'Fodel', 'Glar', 'Grigor', 'Igan', 'Ivor', 'Kosef', 'Mival', 'Orel', 'Pavel', 'Sergor'],
				female: ['Alethra', 'Kara', 'Katernin', 'Mara', 'Natali', 'Olma', 'Tana', 'Zora'],
				lastnames: ['Bersk', 'Chernin', 'Dotsk', 'Kulenov', 'Marsk', 'Nemetsk', 'Shemov', 'Starag']
			},
			Illuskan: {
				male: ['Ander', 'Blath', 'Bran', 'Frath', 'Geth', 'Lander', 'Luth', 'Malcer', 'Stor', 'Taman', 'Urth'],
				female: ['Amafrey', 'Betha', 'Cefrey', 'Kethra', 'Mara', 'Olga', 'Silifrey', 'Westra'],
				lastnames: ['Brightwood', 'Helder', 'Hornraven', 'Lackman', 'Stormwind', 'Windrivver']
			},
			Mulan: {
				male: ['Aoth', 'Bareris', 'Ehput-Ki', 'Kethoth', 'Mumed', 'Ramas', 'So-Kehur', 'Thazar-De', 'Urhur'],
				female: ['Arizima', 'Chathi', 'Nephis', 'Nulara', 'Murithi', 'Sefris', 'Thola', 'Umara', 'Zolis'],
				lastnames: ['Ankhalab', 'Anskuld', 'Fezim', 'Hahpet', 'Nathandem', 'Sepret', 'Uuthrakt']
			},
			Rashemi: {
				male: ['Borivik', 'Faurgar', 'Jandar', 'Kanithar', 'Madislak', 'Ralmevik', 'Shaumar', 'Vladislak'],
				female: ['Fyevarra', 'Hulmarra', 'Immith', 'Imzel', 'Navarra', 'Shevarra', 'Tammith', 'Yuldra'],
				lastnames: ['Chergoba', 'Dyernina', 'Iltazyara', 'Murnyethara',  'Stayanoga', 'Ulmokina']
			},
			Shou: {
				male: ['An', 'Chen', 'Chi', 'Fai', 'Jiang', 'Jun', 'Lian', 'Long', 'Meng', 'On', 'Shan', 'Shui', 'Wen'],
				female: ['Bai', 'Chao', 'Jia', 'Lei', 'Mei', 'Qiao', 'Shui', 'Tai'],
				lastnames: ['Chien', 'Huang', 'Kao', 'Kung', 'Lao', 'Ling', 'Mei', 'Pin', 'Shin', 'Sum', 'Tan', 'Wan']
			},
			Tethyrian: {
				male: ['Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Malark', 'Morn', 'Randal', 'Stedd'],
				female: ['Arveene', 'Esvele', 'Jhessail', 'Kerri', 'Lureene', 'Miri', 'Rowan', 'Shandri', 'Tessele'],
				lastnames: ['Amblecrown', 'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Tallstag']
			},
			Turami: {
				male: ['Anton', 'Diero', 'Marcon', 'Pieron', 'Rimardo', 'Romero', 'Salazar', 'Umbero'],
				female: ['Balama', 'Dona', 'Faila', 'Jalana', 'Luisa', 'Marta', 'Quara', 'Selise', 'Vonda'],
				lastnames: ['Agosto', 'Astorio', 'Calabra', 'Domine',  'Falone', 'Marivaldi', 'Pisacar', 'Ramondo']
			}
		}
	},
	Dwarf: {
		male: ['Adrik', 'Alberich', 'Baern', 'Barendd', 'Brottor', 'Bruenor', 'Dain', 'Darrak', 'Delg', 'Eberk', 'Einkil', 'Fargrim', 'Flint', 'Gardain', 'Harbek', 'Kildrak', 'Morgran', 'Orsik', 'Oskar', 'Rangrim', 'Rurik', 'Taklinn', 'Thoradin', 'Thorin', 'Tordek', 'Traubon', 'Travok', 'Ulfgar', 'Veit', 'Vondal'],
		female: ['Amber', 'Artin', 'Audhild', 'Bardryn', 'Dagnal', 'Diesa', 'Eldeth', 'Falkrunn', 'Finellen', 'Gunnloda', 'Gurdis', 'Helja', 'Hlin', 'Kathra', 'Kristryd', 'Ilde', 'Liftrasa', 'Mardred', 'Riswynn', 'Sannl', 'Torbera', 'Torgga', 'Vistra'],
		lastnames: ['Balderk', 'Battlehammer', 'Brawnanvil', 'Dankil', 'Fireforge', 'Frostbeard', 'Gorunn', 'Holderhek', 'Ironfist', 'Loderr', 'Lutgehr', 'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart']
	},
	Halfling: {
		male: ['Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'],
		female: ['Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda', 'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym', 'Vani', 'Verna'],
		lastnames: ['Brushgather', 'Goodbarrel', 'Greenbottle', 'High-hill', 'Hilltopple', 'Leagallow', 'Tealeaf', 'Thorngage', 'Tosscobble', 'Underbough']
	},
	Elf: {
		male: ['Adran', 'Aelar', 'Aramil', 'Arannis', 'Aust', 'Beiro', 'Berrian', 'Carric', 'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Hadarai', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Laucian', 'Mindartis', 'Paelias', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Soveliss', 'Thamior', 'Tharivol', 'Theren', 'Varis'],
		female: ['Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna', 'Birel', 'Caelynn', 'Drusilia', 'Enna', 'Felosial', 'Ielenia', 'Jelenneth', 'Keyleth', 'Leshanna', 'Lia', 'Meriele', 'Mialee', 'Naivara', 'Quelenna', 'Quillathe', 'Sariel', 'Shanairra', 'Shava', 'Silaqui', 'Theirastra', 'Thia', 'Vadania', 'Valanthe', 'Xanaphia'],
		lastnames: ['Amakiir (Gemflower)', 'Amastacia (Starflower)', 'Galanodel (Moonwhisper)', 'Holimion (Diamonddew)', 'Ilphelkiir (Gemblossom)', 'Liadon (Silverfrond)', 'Meliamne (Oakenheel)', 'Naïlo (Nightbreeze)', 'Siannodel (Moonbrook)', 'Xiloscient (Goldpetal)']
	},
};

Inkubator.prototype.alignment = {
	ge: ['Good', 'Neutral', 'Evil'],
	lc: ['Lawful', 'Neutral', 'Chaotic']
};


////////////////////
//     Methods    //
////////////////////

/**
 * Set NPC gender
 * 80% chance to generate a man
 */
Inkubator.prototype.setGender = function() {

	var gender = '',
		genderRoll = utils.roll(1, 10, 0);

	if (genderRoll <= Inkubator.prototype.npc.settings.genderRatio ) {
		gender = 'male'
	}
	else {
		gender = 'female'
	}

	Inkubator.prototype.npc.gender = gender;
};


/**
 * Set NPC subrace
 * @param {string} race The Merchant npc race
 */
Inkubator.prototype.setSubrace = function(race) {

	var subrace = '',
		subraceRoll = utils.roll(0, 100, 0);

	switch(race) {
		case 'Human':
			if (subraceRoll <= 45) {
				subrace = 'Chondathan';
			}
			else if (subraceRoll <= 60){
				subrace = 'Tethyrian';
			}
			else if (subraceRoll <= 75){
				subrace = 'Calishite';
			}
			else if (subraceRoll <= 82){
				subrace = 'Illuskan';
			}
			else if (subraceRoll <= 87){
				subrace = 'Turami';
			}
			else if (subraceRoll <= 93){
				subrace = 'Rashemi';
			}
			else if (subraceRoll <= 96){
				subrace = 'Shou';
			}
			else if (subraceRoll <= 98){
				subrace = 'Damaran';
			}
			else if (subraceRoll <= 100){
				subrace = 'Mulan';
			}
		Inkubator.prototype.npc.subrace = subrace;
		break;
	}
};

/**
 * Set NPC race
 * @return {string} The Merchant npc race
 */
Inkubator.prototype.setRace = function() {
	var race = '';

	var index = 0,
		length = Object.keys(Inkubator.prototype.races).length,
		raceRoll2 = utils.roll(1, 100, 0),
		currentRace;
	for(index; index < length; index++) {

		currentRace = Inkubator.prototype.races[index];
		if (raceRoll2 <= currentRace.ratio) {
			race = currentRace.name;
			break;
		}
	}

	Inkubator.prototype.npc.race = race;
	Inkubator.prototype.npc.mainLanguage = currentRace.language;

	// Call setSubrace to define a subrace of the current race
	Inkubator.prototype.setSubrace(race);
};

/**
 * Set NPC Name
 * @param {string} gender The Merchant npc gender
 * @param {string} race The Merchant npc race
 */
Inkubator.prototype.setName = function(gender, race) {

	var firstnames,
		lastnames;

	if (typeof Inkubator.prototype.nameList[race]['subraces'] != 'undefined') {

		var subrace = Inkubator.prototype.npc.subrace;
		firstnames = Inkubator.prototype.nameList[race]['subraces'][Inkubator.prototype.npc.subrace][gender];
		lastnames = Inkubator.prototype.nameList[race]['subraces'][Inkubator.prototype.npc.subrace]['lastnames'];
	}
	else {

		firstnames = Inkubator.prototype.nameList[race][gender];
		lastnames = Inkubator.prototype.nameList[race]['lastnames'];
	}

	var	firstnamesLength = firstnames.length,
		lastnamesLength = lastnames.length,
		firstnameRoll = utils.roll(0, firstnamesLength, 0),
		lastnameRoll = utils.roll(0, lastnamesLength, 0);

	Inkubator.prototype.npc.name = firstnames[firstnameRoll] + ' ' + lastnames[lastnameRoll];
};

/**
 * Set NPC hit points
 */
Inkubator.prototype.setHP = function() {
	var hpRoll = utils.roll(1, 8, 0) + utils.roll(1, 8, 0);

	Inkubator.prototype.npc.hitPoints = hpRoll;
};

/**
 * Set all attribute scores
 */
Inkubator.prototype.setAttributes = function() {

	var index = 0,
		length = 4,
		lowerRoll = 24, // Set a bigger value than possible by rolls
		currentRoll,
		totalRoll = 0;
	for(index; index < length; index++) {
		currentRoll = utils.roll(1, 6, 0);

		totalRoll += currentRoll;

		if (currentRoll < lowerRoll) {
			lowerRoll = currentRoll;
		}
	}

	totalRoll -= lowerRoll;

	return totalRoll;
};

// Set all attributes
Inkubator.prototype.npc.attributes.str = Inkubator.prototype.setAttributes();
Inkubator.prototype.npc.attributes.dex = Inkubator.prototype.setAttributes();
Inkubator.prototype.npc.attributes.con = Inkubator.prototype.setAttributes();
Inkubator.prototype.npc.attributes.int = Inkubator.prototype.setAttributes();
Inkubator.prototype.npc.attributes.wis = Inkubator.prototype.setAttributes();
Inkubator.prototype.npc.attributes.cha = Inkubator.prototype.setAttributes();

/**
 * Get attribute modifier
 * @param  {int} An attribute value
 * @return {string}       return the modifier with her sign
 */
Inkubator.prototype.getAttributeModifier = function(value) {
	var value = (value - 10) / 2;

	value = (value < 0) ? Math.floor((value % 2) ? value : value - 1) : '+' + Math.floor(value);

	return String(value);
};

/**
 * Set the passive perception value
 * @return {int} Return the passive perception value
 */
Inkubator.prototype.setPerception = function() {
	var value = 0;

	value = parseInt(Inkubator.prototype.getAttributeModifier(Inkubator.prototype.npc.attributes.wis)) + 10;

	Inkubator.prototype.npc.perception = value;
};

/**
 * Set NPC knew languages
 */
Inkubator.prototype.setLanguages = function() {

	var languageList = 'Common',
		lengthLanguage = Object.keys(Inkubator.prototype.languages).length;

	if (Inkubator.prototype.npc.race != 'Human') {
		languageList += ', ' + Inkubator.prototype.npc.mainLanguage;
	}

	var index = 0,
		length = parseInt(Inkubator.prototype.getAttributeModifier(Inkubator.prototype.npc.attributes.int)),
		languageRoll,
		result = '';
	for(index; index < length; index++) {
		languageRoll = utils.roll(0, 100, 0);
		result = '';

		var indexLanguage = 0,
			currentLanguageRoll = utils.roll(0, 100, 0),
			currentLanguage;
		for(indexLanguage; indexLanguage < lengthLanguage; indexLanguage++) {

			currentLanguage = Inkubator.prototype.languages[indexLanguage];
			if (currentLanguageRoll <= currentLanguage.ratio && languageList.indexOf(currentLanguage.name) == -1) {
				result = currentLanguage.name;
				break;
			}
		}

		if (result != '') {
			languageList += ', ' + result;
		}
	}

	Inkubator.prototype.npc.languages = languageList;
};

/**
 * Set npc alignment
 */
Inkubator.prototype.setAlignment = function() {
	var align = '',
		choosen,
		alignRoll = utils.roll(0, 100, 0);

	if (alignRoll <= 50) {
		choosen = 0;
	}
	else if (alignRoll <= 85) {
		choosen = 1;
	}
	else {
		choosen = 2;
	}

	align = Inkubator.prototype.alignment['lc'][choosen];


	alignRoll = utils.roll(0, 100, 0);

	if (alignRoll <= 50) {
		choosen = 0;
	}
	else if (alignRoll <= 87) {
		if (choosen != 1) {
			choosen = 1;
		}
		else {
			choosen = -1;
		}
	}
	else {
		choosen = 2;
	}

	if (choosen != -1) {
		align += ' ' + Inkubator.prototype.alignment['ge'][choosen];
	}

	Inkubator.prototype.npc.alignment = align;
};

Inkubator.prototype.getNpc = function() {

	Inkubator.prototype.setRace();
	Inkubator.prototype.setGender();
	Inkubator.prototype.setName(Inkubator.prototype.npc.gender, Inkubator.prototype.npc.race);
	Inkubator.prototype.setAlignment();
	Inkubator.prototype.setHP();
	Inkubator.prototype.setPerception();
	Inkubator.prototype.setLanguages();

	return Inkubator.prototype.npc;
}
