function textToHext(s) {
  var s = unescape(encodeURIComponent(s));
  var h = "";
  for (var i = 0; i < s.length; i++) {
    h += s.charCodeAt(i).toString(16);
  }
  return h;
}

function hexToText(h) {
  var s = "";
  for (var i = 0; i < h.length; i += 2) {
    s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
  }
  return decodeURIComponent(escape(s));
}

function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

function decimalToHex(number) {
  if (number < 0) {
    number = 0xffffffff + number + 1;
  }

  return number.toString(16).toLowerCase();
}

function HexToDecimal(Hex) {
  return parseInt(Hex, 16);
}

function reverse(str) {
  let reversed = "";
  for (var i = str.length - 1; i >= 0; i -= 2) {
    reversed += str[i - 1] + str[i];
  }
  return reversed;
}

function bytecount_to_String(byteCount) {
  var decimaltoHex = decimalToHex(byteCount);
  if (decimaltoHex.length == 1) {
    decimaltoHex = "000" + decimaltoHex;
  }
  if (decimaltoHex.length == 2) {
    decimaltoHex = "00" + decimaltoHex;
  }
  if (decimaltoHex.length == 3) {
    decimaltoHex = "0" + decimaltoHex;
  }
  if (decimaltoHex.length == 4) {
    decimaltoHex = reverse(decimaltoHex);
  }
  return decimaltoHex;
}

function findLast(number, decimal) {
  number = number + 4;

  return number + decimal * 2;
}

function findText(listSave) {
  var textEng = $("#inputEng").val().split("\n");
  var textVi = $("#inputVietN").val().split("\n");

  for (let i = 0; i <= textEng.length - 1; i++) {
    listSave.forEach((element, index) => {
      var numberzero = (element.match(/^0+/) || [""])[0].length;
      console.log(numberzero);
      try {
        element = element.replace(/^0+/, "");
        if (hexToText(element.slice(4)) == textEng[i]) {
          var result =
            bytecount_to_String(lengthInUtf8Bytes(textVi[i])) +
            textToHext(textVi[i]);
          listSave[index] = result.padStart(result.length + numberzero, "0");
        } else {
          var result = element;
          listSave[index] = result.padStart(result.length + numberzero, "0");
        }
      } catch (error) {
        element = "0" + element.replace(/^0+/, "");
        if (hexToText(element.slice(4)) == textEng[i]) {
          var result =
            bytecount_to_String(lengthInUtf8Bytes(textVi[i])) +
            textToHext(textVi[i]);
          listSave[index] = result.padStart(
            result.length + numberzero - 1,
            "0"
          );
        } else {
          var result = element;
          listSave[index] = result.padStart(
            result.length + numberzero - 1,
            "0"
          );
        }
      }
    });
  }

  return listSave;
}

function findbyteCount(text) {
  var textok = "";
  var i = 0;
  var listSave = [];

  while (i <= text.length - 1) {
    var textresult = text[i] + text[i + 1];
    if (textresult == "00") {
      textok += textresult;
      i += 2;
    } else {
      var decimal = HexToDecimal(textresult);
      var last = findLast(i, decimal);

      listSave.push(textok + text.slice(i, i + 4 + decimal * 2));
      //listSave[i] = textok + listSave[i];
      textok = "";
      i = 0;
      i += last;
    }
  }

  $("#textlast").val(findText(listSave).join(""));
}

function convertTextToHex() {
  var text = $("#textfirst").val();
  $("#textlast").val("");
  findbyteCount(text);
}
