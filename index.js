const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function encryptDecryptLogic(str, key, encrypt = true) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const shiftedAlphabet = alphabet.slice(key.length) + alphabet.slice(0, key.length);
    const cipher = encrypt ? shiftedAlphabet : alphabet;
    const decipher = encrypt ? alphabet : shiftedAlphabet;

    return str.split('').map(char => {
        const index = cipher.indexOf(char);
        return index !== -1 ? decipher[index] : char;
    }).join('');
}

app.post('/encrypt', (req, res) => {
    const { text, key } = req.body;
    if (!text || !key) {
        return res.status(400).json({ error: 'Text and key are required' });
    }
    const ciphertext = encryptDecryptLogic(text, key, true);
    res.json({ ciphertext });
});

app.post('/decrypt', (req, res) => {
    const { text, key } = req.body;
    if (!text || !key) {
        return res.status(400).json({ error: 'Text and key are required' });
    }
    const plaintext = encryptDecryptLogic(text, key, false);
    res.json({ plaintext });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
