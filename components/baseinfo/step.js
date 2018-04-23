 class Step{
	constructor(option = {}){

		this.x = option.x;
		this.y = option.y;
		this.height = option.height;
		this.context = option.context;
		
		//this.minX =(this.x  -( 288 ));


	}

	render(){
		var { context } = this;
		context.fillStyle = '#45c75d';
		context.fillRect(this.x,this.y,20,this.height);
	}

	update(){
		
	}
}



export default {Step}