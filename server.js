const express = require('express');
const ejs = require('ejs');
const date = require(__dirname+'/getdate.js');   //nii lisame mooduleid mille ise kirjutame
const app = express();

app.set('view engine', ejs);
app.use(express.static('public')); //server võib kasutajale väljastada ka faili kaustast "public"
app.use(express.urlencoded({extended: true}));

let toDoList = [];  

app.get('/', (req, res)=>{
    let today = date.getTodayDateLong();
    console.log(today);      //(typeof(today)) <= saab teada mis tüüpi failiga javascriptis tegemist, antud juhul string
    res.render('index.ejs',{date: today, myToDo: toDoList});
});

app.post('/', (req, res) => {
    let userTask = req.body.newTask;   //newTask index failist
    toDoList.push(userTask);   //lisame massiivi uue asja
    console.log(toDoList);
    res.redirect('/');        //peale uue asja massiivi lisamist saadetakse ta tagasi uuendatud pealehele
});

app.post('/delete', (req, res) => {
    let itemToDelete = req.body.checkbox;
    for(let i = 0; i < toDoList.length; i++){
        if(toDoList[i] === itemToDelete){
            toDoList.splice(i, 1);
        }
    }

    res.redirect('/');                //kui asi on kustutatud, suuname kasutaja jälle pealehele
});

app.get('*', (req, res)=>{         
    res.send("404 not found");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});