const codes = [
    "U2FsdGVkX1+jblKeO+0+k+FX8brzkpaAhUpEeoB/7Do=",
    "U2FsdGVkX1/d7Gs16gsekao/gXgCTFkOKP1qaUSlEqk=",
    "U2FsdGVkX1/GK3nHB9D67fYMZDmRoP6ITLRE6tOjw2M="
];

const correctKeys = JSON.parse(localStorage.getItem("correct_keys") || "[null, null, null]");
if (correctKeys[0] !== null) {
    document.getElementById("part0").innerHTML = correctKeys[0];
}
if (correctKeys[1] !== null) {
    document.getElementById("part1").innerHTML = correctKeys[1];
}
if (correctKeys[2] !== null) {
    document.getElementById("part2").innerHTML = correctKeys[2];
}

function encrypt(secret, key) {
  return CryptoJS.AES.encrypt(secret, JSON.stringify(key)).toString();
}

function decrypt(secret, key) {
    try {
        const bytes = CryptoJS.AES.decrypt(secret, JSON.stringify(key));
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (ex) {
        console.error(ex);
        return "";
    }
}

function testKey(key, idx) {
    key = key.toUpperCase();

    const code = decrypt(codes[idx], key);
    if (code !== "" && /^[A-Z0-9]*$/.test(code)) {
        if (correctKeys[idx] === null) {
            correctKeys[idx] = code;
            localStorage.setItem("correct_keys", JSON.stringify(correctKeys));
        }
        document.getElementById("part" + idx).innerHTML = code;
    }
}