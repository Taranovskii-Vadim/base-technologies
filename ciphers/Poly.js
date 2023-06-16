var source = document.getElementById("MessageP"),
encoded = document.getElementById("ResultP"),
replacementsA = {
	"А": "11 ",
	"Б": "12 ",
	"В": "13 ",
	"Г": "14 ",
	"Д": "15 ",
	"Е": "16 ",
	"Ё": "21 ",
	"Ж": "22 ",
	"З": "23 ",
	"И": "24 ",
	"Й": "25 ",
	"К": "26 ",
	"Л": "31 ",
	"М": "32 ",
	"Н": "33 ",
	"О": "34 ",
	"П": "35 ",
	"Р": "36 ",
	"С": "41 ",
	"Т": "42 ",
	"У": "43 ",
	"Ф": "44 ",
	"Х": "45 ",
	"Ц": "46 ",
	"Ч": "51 ",
	"Ш": "52 ",
	"Щ": "53 ",
	"Ъ": "54 ",
	"Ы": "55 ",
	"Ь": "56 ",
	"Э": "61 ",
	"Ю": "62 ",
	"Я": "63 "
};	
source.onkeyup = function encode() {
	encoded.value = source.value.replace(/[а-яА-ЯёЁ]/g, function (letter) {
		return replacementsA[letter.toUpperCase()];
	});
};
function DecriptionPL() {
	debugger;
	var str = encoded.value;
	var NewArray = str.split(' ');		
	const ru = ['11', '12', '13', '14', '15','16','21', '22', '23', '24', '25','26','31', '32', '33', '34', '35','36','41', '42', '43', '44', '45','46','51', '52', '53', '54', '55', '56', '61', '62', '63'];
	const en = ['А', 'Б', 'В', 'Г', 'Д','Е', 'Ё', 'Ж', 'З', 'И','Й', 'К', 'Л', 'М', 'Н','О', 'П', 'Р', 'С', 'Т','У', 'Ф', 'Х', 'Ц', 'Ч','Ш', 'Щ', 'Ъ', 'Ы', 'Ь','Э','Ю','Я'];
	const transliterateArray = arr => arr.map(letter => ru.indexOf(letter) >= 0 ? en[ru.indexOf(letter)] : letter);

	const array = transliterateArray(NewArray);
	source.value = array.join('').toUpperCase();

}			

