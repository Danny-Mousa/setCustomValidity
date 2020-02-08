/*
Your code goes here!
 */

/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

/*
Grabbing a few inputs to help you get started...
 */
var firstPasswordInput = document.getElementById('first'),
secondPasswordInput = document.getElementById('second'),
submit = document.querySelector('#submit'),
forbidden,
totalMessage,
length;

/*
You'll probably find this function useful...
 */

function IssueTracker (){
	this.errorMessage = [];
}

IssueTracker.prototype = {

	add: function( message ){
		this.errorMessage.push(message+",");
	},

	checkForValidation: function(input) {

		if( input.length<16 || input.length>100){
			this.add("You just entered: "+input.length+" characters"+", please make it between 16-100 char");
		}
		if( !input.match(/[!@#$%^&*]/g) ){
			this.add("You must include at least one of these characters:[ !, @, #, $, %, ^, &, *]");
		}
		if( !input.match(/\d/g)){
			this.add("You must include at least one number");
		}
		if (!input.match(/[a-z]/g)){
			this.add("You must include at least one lowercase letter");
		}
		if(!input.match(/[A-Z]/g)){
			this.add("You must include at least one uppercase letter");
		}
		if( forbidden=input.match(/[^A-Za-z0-9!@#$%^&*]/g)){
			if(forbidden.length===1){
				this.add("You can't include this char "+forbidden);
			}else if (forbidden.length>1){
				this.add("You can't include these characters "+forbidden);
			}
		}
		this.showErrorMessage();
	},

	retrieveErrors: function(){
		//FOR DELETING THE LAST ARRAY ELEMENT COMMA FROM THE TOTAL MESSAGE
		let i,
		errorMessage = this.errorMessage,
		arrLength = errorMessage.length;
		errorMessage[arrLength-1]= errorMessage[arrLength-1].replace(/,/g, "");

		return errorMessage.join("\n");
	},

	showErrorMessage: function(){

		length = this.errorMessage.length;
		switch(length){
			case 0:
				totalMessage="";
				alert("you've changed your password successfully");
				break;
			default:
				totalMessage = "You should fix the following:\n"+this.retrieveErrors();
		}

		firstPasswordInput.setCustomValidity(totalMessage);
	}
};


submit.onclick = function () {

	value1 = firstPasswordInput.value;
	value2 = secondPasswordInput.value;

	if(value1 === value2 && value1.length>0){

		var issueTracker = new IssueTracker();

		issueTracker.checkForValidation(value1);
	}else {
		secondPasswordInput.setCustomValidity("Passwords don\'t match");
	}
};