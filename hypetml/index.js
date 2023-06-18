
// Select all the from document using queryselectAll
var keys = document.querySelectorAll('#calculator span');
// Define operators
var operators = ['+', '-', 'x', '÷', '^'];
// Set decimal flag for use later
var decimalAdded = false;

// loop through all keys
for(var i = 0; i < keys.length; i++) {
  //add onclick event to the keys
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
    
		// If clear key is pressed, erase everything
		if(btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		
		// If eval key is pressed, calculate and display the result
		else if(btnVal == '=') {
			var equation = inputVal; //append equation to variable
			var lastChar = equation[equation.length - 1]; //target the end of the eval string
     	
			// Use regex to replace all instances of x, ÷, ^ with *, / and **
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/').replace(/\^/g, '\*\*');
			
			//Use regex to remove decimals from the end of an equation
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
      
			// use javascript's eval function to get the result
      
			if(equation)
				input.innerHTML = eval(equation);	
			  decimalAdded = false;
		}
		
		// Javascript checks

    // No two operators should be added consecutively.		
		else if(operators.indexOf(btnVal) > -1) {
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty 
			if(inputVal != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;
			
			// Allow minus operator if the string is empty
			else if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
    // allow decimal point input
		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// if any other key is pressed, just append it after the decimal
		else {
			input.innerHTML += btnVal;
		}
		
		// prevent page jumps
		e.preventDefault();
	} 
}
