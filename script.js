const codes = [
    "U2FsdGVkX1/1FPXWyhERNsjF3kKTF/xM0bIkZQb2XZQ=",
    "U2FsdGVkX1/d7Gs16gsekao/gXgCTFkOKP1qaUSlEqk=",
    "U2FsdGVkX1/kEfobAzTMz82V7xcbUImIzy8Mw4Kz4PU="
];

const correctKeys = JSON.parse(localStorage.getItem("correct_keys") || "[null, null, null]");
if (correctKeys[0] !== null) {
    document.getElementById("first-part").innerHTML = correctKeys[0];
}
if (correctKeys[1] !== null) {
    document.getElementById("second-part").innerHTML = correctKeys[1];
}
if (correctKeys[2] !== null) {
    document.getElementById("third-part").innerHTML = correctKeys[2];
}

function encrypt(secret, key) {
  return CryptoJS.AES.encrypt(secret, JSON.stringify(key)).toString();
}

function decrypt(secret, key) {
    const bytes = CryptoJS.AES.decrypt(secret, JSON.stringify(key));
    return bytes.toString(CryptoJS.enc.Utf8);
}

function testKey(key) {
    key = key.toUpperCase();
    const firstCode = decrypt(codes[0], key);
    const secondCode = decrypt(codes[1], key);
    const thirdCode = decrypt(codes[2], key);

    if (firstCode != "") {
        if (correctKeys[0] === null) {
            correctKeys[0] = firstCode;
            localStorage.setItem("correct_keys", JSON.stringify(correctKeys));
        }
        document.getElementById("first-part").innerHTML = firstCode;
    } else if (secondCode != "") {
        if (correctKeys[1] === null) {
            correctKeys[1] = secondCode;
            localStorage.setItem("correct_keys", JSON.stringify(correctKeys));
        }
        document.getElementById("second-part").innerHTML = secondCode;
    } else if (thirdCode != "") {
        if (correctKeys[2] === null) {
            correctKeys[2] = thirdCode;
            localStorage.setItem("correct_keys", JSON.stringify(correctKeys));
        }
        document.getElementById("third-part").innerHTML = thirdCode;
    }
}