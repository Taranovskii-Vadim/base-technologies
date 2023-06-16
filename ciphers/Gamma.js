function EncriptionGamm() {
	var output = '';
	for (var i = 0; i < MessageGamm.value.length; i++) {
		var code = MessageGamm.value.charCodeAt(i) + gammakey.value.charCodeAt(i);
		var ch = (code).toString(16);
		output += 'g' + ch;
	}
	ResultGamm.value = output;
}

function DecryptionGamm() {
	var output = '';
	var key = document.getElementById("gammakey").value;
	var splitted = ResultGamm.value.split('g');
	for (var i = 1; i < splitted.length; i++) {
		var code = parseInt(splitted[i], 16) - key.charCodeAt(i - 1);
		output += String.fromCharCode(code);
	}
	MessageGamm.value = output;
}