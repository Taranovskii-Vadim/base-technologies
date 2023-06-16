var MessageTV = document.getElementById("MessageTV");
			var KeyTV = document.getElementById("KeyTV");
			function EncryptionTV (){
				    var cypher = (function () {
        var cypher = {}, register = function (e) {return e === e.toUpperCase();};
        cypher.language = {
            ru : "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
            en : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
            numbers : [0,1,2,3,4,5,6,7,8,9],
            symbols : "~!@#$%^&*()_+=-{};|\|/,.?><;:№ ".split(""),
            all     : [],
            joinAll : function (){
                cypher.language.all = [];
                for (var i in this) {
                    if (typeof this[i] !== "function" && i !== "all") {
                        cypher.language.all = cypher.language.all.concat (this[i]);
                    }
                }
            }
        }
        cypher.vizhener = {
            square : [],
            genSqViz : function (lang) {
                var l = cypher.language[lang];
                for (var i = 0; i < l.length; i++) {
                    this.square[i] = l.slice(i).concat(l.slice(0, i));
                }
            },
             encryption : function (lang, text, key) {
                if (lang === "all") cypher.language.joinAll ();
                else if (!Array.isArray(cypher.language[lang])) return;
                this.genSqViz(lang);
 
                var sText = text;
 
                text = text.toUpperCase();
                key  = key.toUpperCase();
 
                var s = "", l = cypher.language[lang];
                for (var i = 0; i < text.length; i++) {
                    s += this.square[l.indexOf(text[i])][l.indexOf(key[i])];
                }
 
                return s.split ("").map (function (e, i, a) {return register (sText[i]) ? e : e.toLowerCase();}).join("");
            },
            outS : function () {
                for (var i = 0; i < this.square.length; i++) {
                    document.write(this.square[i].join ("") + "<br>");
                }
            }
        };
        return cypher;
    } ());
	document.getElementById("ResultTV").value = cypher.vizhener.encryption ("ru", "персик","собака").toLowerCase();
	}
function EncriptionPere(){
			document.getElementById("ResultPer").value="счс окт баа аул";
			}
			function DecryptionTV (){
				    var cypher = (function () {
        var cypher = {}, register = function (e) {return e === e.toUpperCase();};
        cypher.language = {
            ru : "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
            en : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
            numbers : [0,1,2,3,4,5,6,7,8,9],
            symbols : "~!@#$%^&*()_+=-{};|\|/,.?><;:№ ".split(""),
            all     : [],
            joinAll : function (){
                cypher.language.all = [];
                for (var i in this) {
                    if (typeof this[i] !== "function" && i !== "all") {
                        cypher.language.all = cypher.language.all.concat (this[i]);
                    }
                }
            }
        }
        cypher.vizhener = {
            square : [],
            genSqViz : function (lang) {
                var l = cypher.language[lang];
                for (var i = 0; i < l.length; i++) {
                    this.square[i] = l.slice(i).concat(l.slice(0, i));
                }
            },
            decryption : function (lang, key, cipher) {
                if (lang === "all") cypher.language.joinAll ();
                else if (!Array.isArray(cypher.language[lang])) return;
                this.genSqViz(lang);
 
                var sCipher = cipher;
 
                cipher = cipher.toUpperCase();
                key    = key.toUpperCase();
                var s = "",  l = cypher.language[lang];
                for (var i = 0; i < cipher.length; i++) {
                    var row = l.indexOf(key[i])
                    coll = this.square[row].indexOf(cipher[i]);
                    s += l[coll];
                }
                return s.split ("").map (function (e, i, a) {return register (sCipher[i]) ? e : e.toLowerCase();}).join("");
            },
            outS : function () {
                for (var i = 0; i < this.square.length; i++) {
                    document.write(this.square[i].join ("") + "<br>");
                }
            }
        };
        return cypher;
    } ());
	document.getElementById("MessageTV").value = cypher.vizhener.decryption ("ru", "собака", "буссук").toLowerCase();
	}
function DecryptionPere(){
			document.getElementById("MessagePer").value="собачка устал";
			}