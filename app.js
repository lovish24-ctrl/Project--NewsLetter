//WebApp

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");


const app=express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/signup.html');    
});

app.post('/', function (req,res) {
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };
    var jsondata=JSON.stringify(data);
    var options={
        url:"https://us20.api.mailchimp.com/3.0/lists/{listid}",
        method:"POST",
        headers: { "Authorization":"{anystring} {API-Key-usX}"},
        body:jsondata
    };

    request(options, function(error, response, body) {
        res.sendFile(__dirname+'/success.html')
        
    });
    
})
app.listen(process.env.PORT || 8080, function () {
    console.log("Runing at port 8080!!");
});

