var o_text='АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
function NewAlphabetA () {
	var NewAlphabet=o_text.split('').reverse().join('');		

	return NewAlphabet;
}
function EncriptionA(){
	var Message = document.getElementById("MessageA").value;
	var NewAlphabet = NewAlphabetA();
	var ResultMessage = '';
	for (var i = 0; i < Message.length; i++) { 
		var indexOfLetter = o_text.indexOf(Message[i].toUpperCase()); 
		ResultMessage = ResultMessage.concat(NewAlphabet[indexOfLetter]); 
	}
	document.getElementById("ResultA").value=ResultMessage.toLowerCase();
}
function DecriptionA() {
	var MessageD = document.getElementById("ResultA").value;
	var OldAlphabet = NewAlphabetA();
	var ResultMessageD = '';
	for (var i = 0; i < MessageD.length; i++) { 
		var indexOfLetter = OldAlphabet.indexOf(MessageD[i].toUpperCase()); 
		ResultMessageD = ResultMessageD.concat(o_text[indexOfLetter]); 
	}
	document.getElementById("MessageA").value=ResultMessageD.toLowerCase();
}