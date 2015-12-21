var express = require('express');
var redis = require('redis');
var uuid = require('node-uuid');
var cors = require('cors');
var bodyParser = require('body-parser')
var _ = require('lodash');

var app = express();
var client = redis.createClient();

var emptyContact = {
 name: {
   first: '',
   last: ''
 },
 addresses: {
   business: {
     url: '',
     phone: '',
     location: {
       line1: '',
       line2: '',
       city: '',
       state: '',
       zip: ''
     }
   },
   home: {
     url: '',
     phone: '',
     location: {
       line1: '',
       line2: '',
       city: '',
       state: '',
       zip: ''
     }
   }
 }
};

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
 client.hvals('contacts', function (err, reply) {
   var contacts = JSON.parse('['  reply  ']');

   res.send({
     contacts: _.sortByAll(contacts, ['name.first', 'name.last'])
   });
 });
});

app.post('/', function (req, res) {
 var contact = _.defaults(req.body.contact, emptyContact);
 contact.id = uuid.v4();

 client.hset('contacts', contact.id, JSON.stringify(contact), function (err, reply) {
   res.send({
     contact: contact
   });
 });
});

app.get('/:id', function (req, res) {
 client.hget('contacts', req.params.id, function (err, reply) {
   res.send({
     contact: JSON.parse(reply)
   });
 });
});

app.put('/:id', function (req, res) {
 var contact = _.defaults(req.body.contact, emptyContact);

 client.hset('contacts', contact.id, JSON.stringify(contact), function (err, reply) {
   res.send({
     contact: JSON.parse(reply)
   });
 });
});

var server = app.listen(3000, function () {
 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);
});
