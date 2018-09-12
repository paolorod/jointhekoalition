function scrollToId(id) {
    document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start"});
}

function prevent_enter_keypress(event) {
        if (e.key === 'Enter') e.preventDefault();
}


/** Retrieve the chips values, add them to the form and then execute post  */
function confirmation_form_submit() {

    fields = {
          "first_name" : {"type":"text"},
          "last_name" : {"type":"text"},
          "telephone" :{"type":"telephone"},
          "email": {"type":"email"},
          "need_hostel": {"type":"checkbox","optional":true},
          "dinner_14": {"type":"checkbox","optional":true},
          "particular_food" : {"type":"text"},
          "particular_mobility" : {"type":"text"},
          "particular_babies" : {"type":"text"},
          "message" : {"type":"text"}
        };

    data = {}

    for( id in fields) {
        if (fields[id].type==="checkbox") {
            data[id] = $("#"+id).prop("checked");
        } else {
            data[id] = $("#"+id).val();
        }
    }

    // take chips data and extra eventual leftovers with a deep clone
    chips_data = JSON.parse(JSON.stringify(M.Chips.getInstance($('.chips')).chipsData));
    chips_leftover = $("#others").val()
    if(!chips_leftover.trim()==="") {
        chips_data.push({tag: chips_leftover});
    }

    // save into main object
    data["others"] = chips_data;

    // add the token information
   token = $("#token").val()

     // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./confirmation", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('x-auth', token);

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
    

    xhr.onloadend = function () {
        alert(xhr.responseText)
    }
}
