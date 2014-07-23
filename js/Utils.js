var Utils = function() {

	/**
	 * Get a random valuebetween min and max plus modifier
	 * @param {int} min is the minimal value
	 * @param {int} max is the maximum value
	 * @param {int} modifier is a positive or negative modifier
	 * @return {string} The random value
	 */
	this.roll = function(min, max, modifier) {
		return Math.floor((Math.random() * max) + min + modifier);
	};
}
