const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

function  execute_get(req,res) {

            res.render('confirm',req.app.get("translation").get(req.params.lang));    
         };
        
function  execute_post(req,res) {
            
            var base = res.app.get("base")
            
            var body = req.body;

            others_record_ids = [];
            // add the record ids for linking
            body.others.forEach(element => {
                if(!(element.tag === "")) { 
                    base('Other People Inside Confirmation').create({
                        "Name and Surname": element.tag
                    }, function(err, record) {
                        others_record_ids.push(record.getId());
                    });
                } 
            });
            
            // create main record
            base('Automatic Confirmations').create({
                "Name": body.first_name,
                "Surname": body.last_name,
                "Phone Number": body.telephone,
                "Email": body.email,
                "Need Hostel": (body.need_hostel=="on"),
                "Dinner of the 14th": (body.dinner_14=="on"),
                "Other People Inside Confirmation": others_record_ids,
                "Special Food Needs": body.particular_food,
                "Special Mobility Needs": body.particular_mobility,
                "Special Baby Needs": body.paritcular_babies,
                "Message": body.message
              }, function(err, record) {
                  if (err) { console.error(err); return; }
                  console.log(record.getId());
              });

              
            console.log(req.body)
            res.send(req.body);    
}

exports.execute_get = execute_get
exports.execute_post = execute_post