const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

function  execute_get(req,res) {
            res.render('confirm',req.app.get("translation").get(req.params.lang));    
         };
        
function  execute_post(req,res) {
            
            var base = res.app.get("base")
            var body = req.body;

            // input parsing
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

              other_participants = [];
              body.others.forEach(element => {
                  if(!(element.tag === "")) {
                    other_participants.push(element.tag);
                  }
              });
        
            // send to creation backend using a recursive call via callbacks
            return create_records(main_record,other_participants,base,res);
             
}

// recursive callback function to create the child records then the main record referring to them
function create_records(main_record,other_participants,base,res) {

    if(other_participants.length > 0) {
        current_child = other_participants.pop();
        console.log("Creating child - "+ current_child)
        base('Other People Inside Confirmation').create({
            "Name and Surname": current_child
        }, function(err, child_record) {
            if (err) { 
                console.error(err);
                return send_error(res);
            }
            // add to the recursion parent record reference the child id and call recursion through callback
            main_record["Other People Inside Confirmation"].push(child_record.getId());
            return create_records(main_record,other_participants,base,res);
        });
    } else {
        // all childs inserted, so create the parent record
        console.log("Creating main record with childs "+ main_record["Other People Inside Confirmation"])
        base('Automatic Confirmations').create(main_record, function(err, record) {
              if (err) { 
                  console.error(err);
                  return send_error(res);  
              }
            return send_success(res);
          });
    }
}


function send_success(res) {
    res.send("Records created successfully");
}

function send_error(res) {
    res.statusCode = 505;
    res.send("Error while writing records");
}


exports.execute_get = execute_get
exports.execute_post = execute_post