
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
	description: '',
	wealth: '',
	treasure: 0,
	hierarchy: '',
	perception: 0,
	armor: 0,
	attributes: {
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0
	}
};


////////////////////
//     HYBRID     //
////////////////////

/**
 * Get data synchronously
 * @param {string} name is the json file name
 * @param {array} options is an array used to define which nodes are used
 * @return {object} return the data object filtred if needed
 */
Inkubator.prototype.getData = function(name, options) {

	var path = 'data/'+name+'.json',
		ret;

	$.ajax({
		async: false,
		type: 'POST',
		dataType: 'json',
		url: path,
		success: function(data){

			if (typeof options != 'undefined') {
				data = Inkubator.prototype.filterData(data, options)
			}

			ret = data;

		},
		error: function(xhr){
			console.log(xhr);
		}
	});

	return ret;
};

/**
 * Define each node ratio
 * @param {string} data is the object to update
 * @return {object} return the data object with new ratio value
 */
Inkubator.prototype.setRatio = function(data) {

	console.log(data);

	var index = 0,
		length = Object.keys(data).length,
		currentRatio = 0,
		currentNode;

	for(index; index < length; index++) {
		currentNode = data[index];
		if (typeof currentNode.ratio != 'undefined'){
			currentRatio += parseInt(currentNode.ratio);
			currentNode.ratio = currentRatio;
		}
	}

	return data;
}

/**
 * Define each node ratio
 * @param {string} data is the object to update
 * @param {array} options is an array used to define which nodes are used
 * @return {object} return the data object with new ratio value
 */
Inkubator.prototype.filterData = function(data, options) {

	var filteredData = {};

	var index = 0,
		length = options.length;
	for(index; index < length; index++) {

		filteredData[index] = data[options[index]];
	}

	Inkubator.prototype.setRatio(filteredData);

	return filteredData;
}

////////////////////
//     Methods    //
////////////////////

/**
 * Set NPC gender
 */
Inkubator.prototype.setGender = function(genders) {

	var gender = '';

	var index = 0,
		length = Object.keys(genders).length,
		max = genders[length - 1].ratio,
		genderRoll = utils.roll(1, max, 0),
		currentGender;
	for(index; index < length; index++) {

		currentGender = genders[index];
		if (genderRoll <= currentGender.ratio) {
			gender = currentGender.name;
			break;
		}
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
				subrace = 'Tethyrian';
			}
			else if (subraceRoll <= 60){
				subrace = 'Calishite';
			}
			else if (subraceRoll <= 75){
				subrace = 'Chondathan';
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
				subrace = 'Damaran';
			}
			else if (subraceRoll <= 98){
				subrace = 'Mulan';
			}
			else if (subraceRoll <= 100){
				subrace = 'Shou';
			}
		Inkubator.prototype.npc.subrace = subrace;
		break;

		case 'Dwarf':
			if (subraceRoll <= 50) {
				subrace = 'Hill Dwarf'
			}
			else {
				subrace = 'Mountain Dwarf'
			}
		Inkubator.prototype.npc.subrace = subrace;
		break;

		case 'Elf':
			if (subraceRoll <= 75) {
				subrace = 'High Elf'
			}
			else {
				subrace = 'Wood Elf'
			}
		Inkubator.prototype.npc.subrace = subrace;
		break;

		case 'Halfling':
			if (subraceRoll <= 90) {
				subrace = 'Lightfoot Halfling'
			}
			else {
				subrace = 'Stout Halfling'
			}
		Inkubator.prototype.npc.subrace = subrace;
		break;

	default :
		Inkubator.prototype.npc.subrace = '';
	}
};

/**
 * Set NPC race
 * @return {string} The Merchant npc race
 */
Inkubator.prototype.setRace = function(races) {

	var race = '';

	var index = 0,
		length = Object.keys(races).length,
		max = races[length - 1].ratio,
		raceRoll = utils.roll(1, max, 0),
		currentRace;
	for(index; index < length; index++) {

		currentRace = races[index];
		if (raceRoll <= currentRace.ratio) {
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
Inkubator.prototype.setName = function(gender, race, namelist) {

	var firstnames,
		lastnames;

	if (typeof namelist[race]['subraces'] != 'undefined') {

		var subrace = Inkubator.prototype.npc.subrace;
		firstnames = namelist[race]['subraces'][Inkubator.prototype.npc.subrace][gender];
		lastnames = namelist[race]['subraces'][Inkubator.prototype.npc.subrace]['lastnames'];
	}
	else {

		firstnames = namelist[race][gender];
		lastnames = namelist[race]['lastnames'];
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
 * Set the passive perception value
 * @return {int} Return the passive perception value
 */
Inkubator.prototype.setArmorClass = function() {
	var value = 0;

	value = parseInt(Inkubator.prototype.getAttributeModifier(Inkubator.prototype.npc.attributes.dex)) + 10;

	Inkubator.prototype.npc.armor = value;
};

/**
 * Set NPC knew languages
 */
Inkubator.prototype.setLanguages = function(languages) {

	var languageList = 'Common',
		lengthLanguage = Object.keys(languages).length;

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
			max = languages[lengthLanguage - 1].ratio,
			currentLanguageRoll = utils.roll(1, max, 0),
			currentLanguage;

		for(indexLanguage; indexLanguage < lengthLanguage; indexLanguage++) {

			currentLanguage = languages[indexLanguage];
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
Inkubator.prototype.setAlignment = function(alignements) {
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

	align = alignements['lc'][choosen];


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
		align += ' ' + alignements['ge'][choosen];
	}

	Inkubator.prototype.npc.alignment = align;
};

Inkubator.prototype.setDescription = function(descriptions) {

	var descriptionObj,
		selector,
		descriptionStr = '';

	var getElement = function(elementList) {
		var element,
			length = elementList.length,
			elementRoll = utils.roll(0, length, 0);

		element = elementList[elementRoll];

		return element;
	}

	if (Inkubator.prototype.npc.subrace != '') {
		selector = Inkubator.prototype.npc.subrace;
	}
	else {
		selector = Inkubator.prototype.npc.race;
	}

	descriptionObj = descriptions[selector];

	if (typeof descriptionObj != 'undefined') {

		var haircolor = getElement(descriptionObj.haircolor),
			hasFacialhair = (descriptionObj.facialhair.length != 0 && Inkubator.prototype.npc.gender == 'male');

		descriptionStr += getElement(descriptionObj.weight);
		descriptionStr += ' ';
		descriptionStr += getElement(descriptionObj.height);
		descriptionStr += ' ';
		descriptionStr += Inkubator.prototype.npc.race;
		descriptionStr += ' with ';
		descriptionStr += getElement(descriptionObj.skin);
		descriptionStr += ', ';
		descriptionStr += getElement(descriptionObj.eyes);
		descriptionStr += (hasFacialhair) ? ', ' : ' and ';
		descriptionStr += haircolor;
		descriptionStr += ' ';
		descriptionStr += getElement(descriptionObj.haircut);

		// Facial Hair
		if (hasFacialhair) {

			descriptionStr += ' hair and ';
			descriptionStr += haircolor;
			descriptionStr += ' ';
			descriptionStr += getElement(descriptionObj.facialhair);
		}
		else {

			if (descriptionObj.nofacialhair) {
				descriptionStr += ' hair and';
				descriptionStr += getElement(descriptionObj.nofacialhair);
			}
			else {
				descriptionStr += ' hair ';
			}

		}

		Inkubator.prototype.npc.description = descriptionStr;
	}
	else {

		Inkubator.prototype.npc.description = '';
	}
};

Inkubator.prototype.races = Inkubator.prototype.getData('races', ['0', '1', '2', '3']);
Inkubator.prototype.languages = Inkubator.prototype.getData('languages', ['0', '1', '2', '3', '4', '5']);
Inkubator.prototype.genders = Inkubator.prototype.getData('genders', ['0', '1']);
Inkubator.prototype.alignments = Inkubator.prototype.getData('alignments');
Inkubator.prototype.names = Inkubator.prototype.getData('namelist');
Inkubator.prototype.descriptions = Inkubator.prototype.getData('descriptions');

Inkubator.prototype.getNpc = function() {

	// Set all attributes
	Inkubator.prototype.npc.attributes.str = Inkubator.prototype.setAttributes();
	Inkubator.prototype.npc.attributes.dex = Inkubator.prototype.setAttributes();
	Inkubator.prototype.npc.attributes.con = Inkubator.prototype.setAttributes();
	Inkubator.prototype.npc.attributes.int = Inkubator.prototype.setAttributes();
	Inkubator.prototype.npc.attributes.wis = Inkubator.prototype.setAttributes();
	Inkubator.prototype.npc.attributes.cha = Inkubator.prototype.setAttributes();

	// var races = Inkubator.prototype.getData('races', ['0', '1', '2', '3']);
	var races = Inkubator.prototype.races;
	Inkubator.prototype.setRace(races);

	// var genders = Inkubator.prototype.getData('genders', ['0', '1']);
	var genders = Inkubator.prototype.genders;
	Inkubator.prototype.setGender(genders);

	// var names = Inkubator.prototype.getData('namelist');
	var names = Inkubator.prototype.names;
	Inkubator.prototype.setName(Inkubator.prototype.npc.gender, Inkubator.prototype.npc.race, names);

	// var alignments = Inkubator.prototype.getData('alignments');
	var alignments = Inkubator.prototype.alignments;
	Inkubator.prototype.setAlignment(alignments);

	Inkubator.prototype.setHP();
	Inkubator.prototype.setPerception();
	Inkubator.prototype.setArmorClass();

	// var languages = Inkubator.prototype.getData('languages', ['0', '1', '2', '3', '4', '5']);
	var languages = Inkubator.prototype.languages;
	Inkubator.prototype.setLanguages(languages);

	// var descriptions = Inkubator.prototype.getData('descriptions');
	var descriptions = Inkubator.prototype.descriptions;
	Inkubator.prototype.setDescription(descriptions);

	return Inkubator.prototype.npc;
}
