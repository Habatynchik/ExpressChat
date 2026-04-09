const pool = require("../db/db-manager");

let messageService = {
    getAllByChatId: async (chatId) => {
        const CreateQuery = `
           // Тут треба дописати запит
        `;
        
        const result = await pool.query(query, [chatId]);
        return result.rows;
    }
};

module.exports = messageService;
