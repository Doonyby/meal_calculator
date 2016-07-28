var dishes = {
	'king crab': 38,
	'roasted duck': 28,
	'filet mignon': 40,
	'roasted chicken': 26,
	'roasted vegetables': 18,
	'salad': 7,
	'soup': 5,
	'drink': 4,
	'dessert': 5
}

var Party = function() {
	this.diners = [];
	this.mealTotal = 0;
	this.withTax = 0;
	this.withTip = 0;
	this.dinerPay = 0;
}

Party.prototype.addTotal = function() {
	for (var i=0; i<this.diners.length; i++) {
		this.mealTotal += this.diners[i].dinerCost;
	}
}

Party.prototype.addTax = function() {
	this.withTax += this.mealTotal + (0.047 * this.mealTotal);
}

Party.prototype.addTip = function() {
	this.withTip += this.withTax + (0.2 * this.withTax);
	this.withTip = this.withTip.toFixed(2);
	this.withTip = parseFloat(this.withTip);
}

Party.prototype.divideTab = function() {
	this.dinerPay += this.withTip/this.diners.length;
	this.dinerPay = this.dinerPay.toFixed(2);
	this.dinerPay = parseFloat(this.dinerPay);
	if (this.withTip % this.dinerPay == 0) {
		for (var i=0; i<this.diners.length; i++) {
			console.log(this.diners[i].name + " owes " + this.dinerPay + "!");
		}
	} else {
		var lastDiner = this.diners.pop();
		var remainder = (this.withTip % this.dinerPay);
		var remainingAmount = remainder + this.dinerPay;
		for (var i=0; i<this.diners.length; i++) {
			console.log(this.diners[i].name + " owes " + this.dinerPay + "!");
		}
		console.log(lastDiner.name + " owes " + remainingAmount.toFixed(2) + "!");
	}
}

var Diner = function(name) {
	this.name = name;
	this.meal = {};
	this.dinerCost = 0;

}

Diner.prototype.addDish = function(dish) {
	if (this.meal[dish]) {
		this.meal[dish] += dishes[dish];
	} else {
		this.meal[dish] = dishes[dish];
	}
}

Diner.prototype.dinerTotal = function() {
	for (var prop in this.meal) {
		this.dinerCost += this.meal[prop];
	}
}

function mealCalculator() {
	var bob = new Diner('bob');
	bob.addDish('king crab');
	bob.addDish('drink');
	bob.dinerTotal();

	var john = new Diner('john');
	john.addDish('filet mignon');
	john.addDish('salad');
	john.addDish('soup');
	john.addDish('dessert');
	john.dinerTotal();

	var jane = new Diner('jane');
	jane.addDish('roasted chicken');
	jane.addDish('soup');
	jane.addDish('drink');
	jane.addDish('dessert');
	jane.dinerTotal();

	var lynn = new Diner('lynn');
	lynn.addDish('roasted duck');
	lynn.addDish('drink');
	lynn.dinerTotal();

	var joe = new Diner('joe');
	joe.addDish('roasted vegetables');
	joe.addDish('dessert');
	joe.addDish('drink');
	joe.dinerTotal();

	var partyOfFive = new Party();

	partyOfFive.diners.push(bob);
	partyOfFive.diners.push(john);
	partyOfFive.diners.push(jane);
	partyOfFive.diners.push(lynn);
	partyOfFive.diners.push(joe);

	partyOfFive.addTotal();
	partyOfFive.addTax();
	partyOfFive.addTip();
	partyOfFive.divideTab();
}

mealCalculator();
