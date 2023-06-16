		var o_text = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';	
		var alphabet = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];		
		function AlphaWithStep() {	
			var Step = parseInt(document.getElementById("Step").value);	
			var o_letters = o_text.split("");	
			var c_text="", _x = "";
			for (x in o_letters) {
				if (Step > 0) {
					_x = alphabet[(alphabet.indexOf(o_letters[x]) + Step) % alphabet.length]
				} else {
					_x = alphabet[(alphabet.indexOf(o_letters[x]) + (33 - Step)) % alphabet.length]
				}
				c_text = c_text + _x;
			}
			return c_text;
		}
		function Encryption() {	
			var Message = document.getElementById("Message").value;	
			var NewAlphabet = AlphaWithStep();
			var ResultMessage = '';
			for (var i = 0; i < Message.length; i++) { 
				var indexOfLetter = o_text.indexOf(Message[i].toUpperCase()); 
				ResultMessage = ResultMessage.concat(NewAlphabet[indexOfLetter]); 
			}
			document.getElementById("Result").value=ResultMessage.toLowerCase();
		}
		function Decription() {
			var MessageD = document.getElementById("Result").value;
			var OldAlphabet = AlphaWithStep();
			var ResultMessageD = '';
			for (var i = 0; i < MessageD.length; i++) {
				var indexOfLetter = OldAlphabet.indexOf(MessageD[i].toUpperCase()); 
				ResultMessageD = ResultMessageD.concat(o_text[indexOfLetter]); 
			} 
			document.getElementById("Message").value=ResultMessageD.toLowerCase();
		}