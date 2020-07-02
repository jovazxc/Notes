const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('./config');
const app = express();

const db = mysql.createConnection(config.dbconnection);

db.connect(() => {
    console.log("conected to mysql database");
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
    
    if(!req.body.email) {
        return res.send({error: true, msg: "Correo está vacio"})
    }
    if(!req.body.password) {
        return res.send({error: true, msg: "Contraseña está vacia"})
    }
    
    const {email, password} = req.body;
    
    db.query(`SELECT id, fullName FROM Users WHERE email = ? and password = ? LIMIT 1`, [email, password], (err, users) => {
        if(err) console.log(err);

        if(users.length === 0)
            return res.send({error: true, msg: "Correo o contraseña incorrectas"});
        
        const payload = {
            id: users[0].id,
            iat: moment().unix(),
            exp: moment().add(14, "days").unix()
        }

        const data = {
            token: jwt.encode(payload, config.token),
            fullName: users[0].fullName
        }
        res.send(data);
    });
});

app.post('/api/register', (req, res) => {
    console.log(req.body)
    const {fullName, email, password} = req.body;
    if(!req.body.email) {
        return res.send({error: true, msg: "Correo está vacio"})
    }
    if(!req.body.password) {
        return res.send({error: true, msg: "Contraseña está vacia"})
    }
    if(!req.body.fullName) {
        return res.send({error: true, msg: "Nombre está vacio"})
    }
    
    db.query(`INSERT INTO Users SET ? `, {fullName, email, password}, (err, ins) => {
        const payload = {
            id: ins.insertId,
            iat: moment().unix(),
            exp: moment().add(14, "days").unix()
        }

        const data = {
            token: jwt.encode(payload, config.token), fullName
        }

        res.send(data);
        console.log(data);
    })

})

app.post('/api/create', (req, res) => {
    if(!req.headers.authorization) {
        return res.status(403).send({message: "Tu petición no tiene cabecera de autorización"});
    }

    let user = jwt.decode(req.headers.authorization, config.token);
    console.log(user)
})

app.get('/api/note', (req, res) => {
    if(!req.headers.authorization) {
        return res.status(403).send({message: "Tu petición no tiene cabecera de autorización"});
    }

    let user = jwt.decode(req.headers.authorization, config.token);

    db.query(`SELECT * FROM Notes WHERE id = ? and user_id = ?`, [req.query.id, user.id], (err, note) => {
        if(err) {
            console.log(err);
            return res.status(401).send({message: 'error'});
        }
        if(note.length > 0)
            res.send(note[0]);
        else
            res.send([]);
    })
})

app.get('/api/userNotes', (req, res) => {

    if(!req.headers.authorization) {
        console.log("HEADER:", req.headers.authorization)
        return res.status(403).send({message: "Tu petición no tiene cabecera de autorización"});
    }

    let user = jwt.decode(req.headers.authorization, config.token);
    let from = !req.query.from ? 0 : req.query.from;
    let to = !req.query.to ? 10 : req.query.from;

    db.query(`SELECT * FROM Notes WHERE user_id = ${user.id} ORDER BY id DESC LIMIT ${from},${to}`, (err, notes) => {
        if(err) {
            console.log(err);
            return res.status(401).send({message: 'error'});
        }
        res.send(notes);
    })
})


app.use(express.static('../client/build/'));

app.listen(3000, () => {
    console.log("Listening on port 3000");

});