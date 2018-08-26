

function  execute_get(req,res) {
            res.render('confirm',req.app.get("translation").get(req.params.lang));    
         };
        
function  execute_post(req,res) {
            base = res.app.get("base")
            base('Automatic Confirmations').create({
                "Name": "example",
                "Notes": "hhhh22"
            }, function(err, record) {
                if (err) { console.error(err); return; }
                console.log(record.getId());
            });
            
            res.send('ok');    
}

exports.execute_get = execute_get
exports.execute_post = execute_post