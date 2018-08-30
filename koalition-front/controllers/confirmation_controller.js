const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

function  execute_get(req,res) {

            res.render('confirm',req.app.get("translation").get(req.params.lang));    
         };
        
function  execute_post(req,res) {
            
            var base = res.app.get("base")

            var body = req.body;
            console.log(req.body)

            // create the main record object
            var main_record = {
                "Name": body.first_name,
                "Surname": body.last_name,
                "Phone Number": body.telephone,
                "Email": body.email,
                "Need Hostel": (body.need_hostel=="on"),
                "Dinner of the 14th": (body.dinner_14=="on"),
                "Other People Inside Confirmation": [],
                "Special Food Needs": body.particular_food,
                "Special Mobility Needs": body.particular_mobility,
                "Special Baby Needs": body.paritcular_babies,
                "Message": body.message
              };
        
            add_childs(body.others,main_record,base)
         
            res.send(req.body);    
}

function add_childs(childs,parent_record,base) {

    if(childs.length > 0) {
        current_child = childs.pop().tag;
        if(!(current_child === "")) {
            // is a good record, so create
            console.log("Creating child - "+ current_child)
            base('Other People Inside Confirmation').create({
                "Name and Surname": current_child
            }, function(err, child_record) {
                if (err) { 
                    console.error(err); return; 
                }
                // add to the recursion parent record reference the child id and call recursion through callback
                parent_record["Other People Inside Confirmation"].push(child_record.getId());
                add_childs(childs,parent_record,base);
            });
        } else {
            // immediate recursion in case of invalid element
            console.log("Invalid child - "+ current_child);
            add_childs(childs,parent_record,base);
        }
    } else {
        // all childs inserted, so create the parent record
        console.log("Creating main record with childs "+ parent_record["Other People Inside Confirmation"])
        base('Automatic Confirmations').create(parent_record, function(err, record) {
              if (err) { 
                  console.error(err); return; 
              }
          });
    }
}


exports.execute_get = execute_get
exports.execute_post = execute_post