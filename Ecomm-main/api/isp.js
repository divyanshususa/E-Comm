const express = require("express")
const router = express.Router()

router.get('/get-isp/:ip', async (req, res) => {
    try {
        const { ip } = req.params;
        const response = await fetch(`https://ipinfo.io/${ip}/json`);
        const data = await response.json();
        res.json({ isp: data.org });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;