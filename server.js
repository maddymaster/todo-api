var express = require('express');
var bodyParser = require('body-parser');

var {ObjectId} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());
//POST /todos
    app.post('/todos', (req, res) =>{
        var todo = new Todo({
            text: req.body.text
        });

        todo.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e)
        });
    });
    //GET /todos
    app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({todos});
        }, (e) => {
            res.status(400).send(e);
        })        
    });

    //GET /todos/123456
    app.get('/todos/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Todo.findById(id).then((todo) =>{
            if (!todo){
                return res.send(404).send();
            }

            res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        })

    });

    app.delete('/todos/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Todo.findByIdAndRemove(id).then((todo) =>{
            if (!todo){
                return res.send(404).send();
            }

            res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        })

    });

    //HOMEWORK - ADD UPDATE METHOD - PUT METHOD

    app.listen(3000, () =>{
        console.log('Started on port 3000');
});

module.exports = {app};
