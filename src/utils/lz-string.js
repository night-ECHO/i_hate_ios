// src/utils/lz-string.js
window.LZString = {
  decompressFromBase64: function (input) {
    const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    const out = [];
    let i = 0, chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = key.indexOf(input.charAt(i++));
      enc2 = key.indexOf(input.charAt(i++));
      enc3 = key.indexOf(input.charAt(i++));
      enc4 = key.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      out.push(String.fromCharCode(chr1));
      if (enc3 !== 64) out.push(String.fromCharCode(chr2));
      if (enc4 !== 64) out.push(String.fromCharCode(chr3));
    }
    return decodeURIComponent(escape(out.join('')));
  }
};