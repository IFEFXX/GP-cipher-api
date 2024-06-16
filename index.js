const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Simple Caesar cipher encryption function
function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) { // Uppercase letters
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) { // Lowercase letters
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        } else {
            return char; // Non-alphabetic characters
        }
    }).join('');
}

// Simple Caesar cipher decryption function
function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, 26 - shift);
}

// Encryption endpoint
app.post('/encrypt', (req, res) => {
    const { text, key } = req.body;
    const shift = parseInt(key);
    if (!text || isNaN(shift)) {
        return res.status(400).json({ error: 'Text and a numeric key are required.' });
    }
    const ciphertext = caesarEncrypt(text, shift);
    res.json({ ciphertext });
});

// Decryption endpoint
app.post('/decrypt', (req, res) => {
    const { text, key } = req.body;
    const shift = parseInt(key);
    if (!text || isNaN(shift)) {
        return res.status(400).json({ error: 'Text and a numeric key are required.' });
    }
    const plaintext = caesarDecrypt(text, shift);
    res.json({ plaintext });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
