const bcrypt = require("bcrypt");
const pool = require("../db/db-manager");

const userService = {
    create: async (user) => {
        const existedUser = await userService.getUserByUsername(user.username);
        if (existedUser) {
            throw new Error("User already exists");
        }

        let hashedPassword = bcrypt.hashSync(user.password, 10);

        const result = await pool.query(`
            insert into users1 (username, -)
            values ($1, $2)
        `, [user.username, hashedPassword])
        return result.rows[0]

    },
    update: (id, user) => {
    },
    getUserByUsername: async (username) => {
        let user = await pool.query(`
            select *
            from users
            where username = $1
        `, [username]);

        return await user.rows[0];
    },
    getUser: (id) => {
    },
    getAll: () => {
    },
}

module.exports = userService;