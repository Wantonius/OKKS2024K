function Universe() {
	var instance;
	Universe = function Universe() {
		return instance;
	}
	Universe.prototype = this;
	instance = new Universe();
	instance.constructor = Universe;
	instance.size = 0;
	instance.bang = "big";
}

function start() {
	
	let HelloWorld = function() {
		this.name = "World";
		this.message = "Hello";
	}
	
	let helloInstance = new HelloWorld();
	
	HelloWorld.prototype.name = "Jaska";
	HelloWorld.prototype.message2 = "Goodbye";
	
	console.log(helloInstance.name);
	console.log(helloInstance.message);
	console.log(helloInstance.message2);
	console.log(helloInstance);
	
	let helloInstance2 = new HelloWorld();
	helloInstance2.name = "Test";
	console.log(helloInstance2.name);
	console.log(helloInstance2);

	Universe.prototype.nothing = true;
	let uni1 = new Universe();
	console.log(uni1);
	let uni2 = new Universe();
	uni2.everything = true;
	console.log(uni1);
	console.log(uni2);
}