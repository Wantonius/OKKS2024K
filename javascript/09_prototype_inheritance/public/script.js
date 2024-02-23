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
}