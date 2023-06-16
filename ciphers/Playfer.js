var playfairArray = new Array(32);
function EncriptionPlay() {
	updateGrid();
	var messageplay = document.getElementById("messagePL").value;
	messageplay = messageplay.split('');
	var MyArr = new Array();
	var FinalAnswer;
	if (document.getElementById("flag").checked == false) {
		for(var i = 0; i < messageplay.length; i = i + 2) {
			var first = playfairArray.indexOf(messageplay[i]);
			var second = playfairArray.indexOf(messageplay[i + 1]);
			var firstEncryptedSymbol;
			var secondEncryptedSymbol;
			if (first % 8 != second % 8 &&
				Math.floor(first / 8) != Math.floor(second / 8)) {
				firstEncryptedSymbol = playfairArray[first - (first % 8) + second % 8];	
				secondEncryptedSymbol = playfairArray[second - (second % 8) + first % 8];	
			} else if (Math.floor(first / 8) == Math.floor(second / 8)) {
				firstEncryptedSymbol = playfairArray[first - (first % 8) + (first % 8 + 1) % 8];	
				secondEncryptedSymbol = playfairArray[second - (second % 8) + (second % 8 + 1) % 8];	
				
			} else if (first % 8 == second % 8) {
				firstEncryptedSymbol = playfairArray[(first + 8) % 32];	
				secondEncryptedSymbol = playfairArray[(second + 8) % 32];	
			}
			MyArr.push(firstEncryptedSymbol);
			MyArr.push(secondEncryptedSymbol);
		}
	} else if (messageplay.length % 2 == 0) {
		for(var i = 0; i < messageplay.length; i = i + 2) {
			var first = playfairArray.indexOf(messageplay[i]);
			var second = playfairArray.indexOf(messageplay[i + 1]);
			var firstEncryptedSymbol;
			var secondEncryptedSymbol;
			if (first % 8 != second % 8 &&
				Math.floor(first / 8) != Math.floor(second / 8)) {
				firstEncryptedSymbol = playfairArray[first - (first % 8) + second % 8];	
				secondEncryptedSymbol = playfairArray[second - (second % 8) + first % 8];	
			} else if (Math.floor(first / 8) == Math.floor(second / 8)) {
				var firstMove = first % 8 - 1 < 0 ? 7 : first % 8 - 1;
				var secondMove = second % 8 -1 < 0 ? 7 : second % 8 - 1;
				firstEncryptedSymbol = playfairArray[first - (first % 8) + firstMove];	
				secondEncryptedSymbol = playfairArray[second - (second % 8) + secondMove];	
				
			} else if (first % 8 == second % 8) {
				var firstIndex = first - 8 < 0 ? 3 * 8 + first % 8 : first - 8;
				var secondSecond = second - 8 < 0 ? 3 * 8 + second % 8 : second - 8;
				firstEncryptedSymbol = playfairArray[firstIndex];	
				secondEncryptedSymbol = playfairArray[secondSecond];	
			}
			MyArr.push(firstEncryptedSymbol);
			MyArr.push(secondEncryptedSymbol);
		}
	}
	FinalAnswer = MyArr.join('');
	document.getElementById("resultPL").value = FinalAnswer;
}
	function updateGrid() {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 8; j++) {
				playfairArray[j + i * 8] = document.getElementById(i + "playfair" + j).value;
			}
		}
	}