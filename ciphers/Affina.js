var Alphabet = new Array('а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я');
				function EncriptionAFF() {
					var output = "";
					var inputStr = document.getElementById("MessageAF").value;
					for (var i = 0; i < inputStr.length; i++) {
						if (inputStr[i].toLowerCase() == inputStr[i]) {
							console.log('indOf ' + inputStr[i] + ' is ' + Alphabet.indexOf(inputStr[i]));
							output = output + Alphabet[(Alphabet.indexOf(inputStr[i]) * (+affineA.value) + (+affineB.value)) % 33];
						} else {
							output = output + Alphabet[(Alphabet.indexOf(inputStr[i]) * (+affineA.value) + (+affineB.value)) % 33];
						}

					}
					document.getElementById("ResultAF").value = output;
				}

				function DecryptionAFF(){
					var output = "";
					var notA = findNotA();
					var resultStr = document.getElementById("ResultAF").value;
					for (var i = 0; i < resultStr.length; i++) {
						if (resultStr[i].toLowerCase() == resultStr[i]) {
							console.log('indOf ' + resultStr[i] + ' is ' + Alphabet.indexOf(resultStr[i]));
							output = output + Alphabet[notA * (Alphabet.indexOf(resultStr[i]) - affineB.value) % 33];
						} else {
							output = output + Alphabet[notA * (Alphabet.indexOf(resultStr[i]) - affineB.value) % 33];
						}				
					}
					document.getElementById("MessageAF").value = output;
				}

				function findNotA() {
					var i = 0;
					while (i < 10000) {
						var aNotA = i * 33 + 1;
						if (aNotA % (+affineA.value) == 0) {
							return aNotA / (+affineA.value);
						}
						i++;
					}
				}