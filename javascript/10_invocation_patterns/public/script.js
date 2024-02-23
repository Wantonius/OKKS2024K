function start() {
	console.log("---------------- Method Invocation Pattern-------------");
	
	var person = {
		name:"Calvin",
		age:25,
		greet:function() {
			console.log("Hello, my name is",this.name);
		}
	}
	
	person.greet();
	
	console.log("------------------Function Invocation Pattern-------------");
	
	person.calculateAge = function(years) {
		function calculateYears() {
			return this.age + years
		}
		console.log("I will be "+calculateYears()+" old in "+years);
	}
	
	person.calculateAge(10);
	
	console.log("------------------Fix this-------------");
	
	person.calculateAge = function(years) {
		function calculateYears() {
			return this.age + years
		}
		calculateYears = calculateYears.bind(this);
		console.log("I will be "+calculateYears()+" old in "+years);
	}
	
	person.calculateAge(10);

	console.log("----------------Constructor Invocation Pattern-------------");
	
	var Person2 = function(name) {
		this.name = name;
	}
	
	Person2.prototype.greet = function() {
		return this.name + " says hello!"
	}
	
	console.log(new Person2("Calvin").greet());

	console.log("-------------------Apply Invocation Pattern--------------");
	
	Person2.prototype.waveTo = function(who) {
		return this.name+" waves to "+who.name;
	}
	
	let calvin = new Person2("Calvin");
	let hobbes = new Person2("Hobbes");
	let rover = Object.create({"name":"Rover"});

	console.log(calvin.waveTo.apply(hobbes,[calvin]));
	console.log(calvin.waveTo.apply(rover,[hobbes]));
}