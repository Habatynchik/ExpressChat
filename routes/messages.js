const express = require('express');
const messageService = require("../services/messageService");
const router = express.Router();

router.get("/:chatId/all", async (req, res) => {
    const chatId = req.params.chatId;
    
    if (!chatId) {
        return res.status(400).json({error: "Chat not found"});
    }

    try {
        const messages = await messageService.getAllByChatId(chatId);
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;
