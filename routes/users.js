const express = require('express');
const pool = require("../db/db-manager");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//GET localhost:3000/items/init
router.get('/init', async function (req, res, next) {
    await pool.query(`
        Create table users1
        (
            id       serial primary key,
            username varchar NOT NULL unique,
            password varchar
        );
    `)
    res.send('created table users1');
})

router.post('/login', async function (req, res, next) {
    let username = req.body.username
    let password = req.body.password

    const result = await pool.query(`
        select *
        from users1
        where username = $1
    `, [username])

    const user = result?.rows[0]
    if (!user) {
        res.status(401).send({message: "Invalid username or password"})
    }

    let isPasswordMatched = bcrypt.compareSync(password, user?.password)

    if (isPasswordMatched) {
        res.json(user)
    } else {
        res.status(401).send({message: "Invalid username or password"})
    }
})

router.post('/register', async function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    let passwordSecond = req.body.passwordSecond

    pool.query(`
        select *
        from users1
        where username = $1
    `, [username]).then(async result => {
        if (await result.rows[0]) {
            res.status(400).send("User already exists");
        }
    })

    if (password != passwordSecond) {
        res.status(400).send("password not match");
    }

    let hashedPassword = bcrypt.hashSync(password, 10);

    const result = await pool.query(`
        insert into users1 (username, password)
        values ($1, $2)
    `, [username, hashedPassword])

    res.json(await result.rows)
})


module.exports = router;
