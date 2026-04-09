const pool = require("../db/db-manager");

let messageService = {
    getAllByChatId: async (chatId) => {
        const CreateQuery = `
            SELECT messages.id, messages.text, messages.created, messages.user_id, messages.chat_id, users.username
            FROM messages
            JOIN users ON users.id = messages.user_id
            WHERE messages.chat_id = $1
            ORDER BY messages.created ASC
        `;
        
        const result = await pool.query(query, [chatId]);
        return result.rows;
    }
};

module.exports = messageService;
