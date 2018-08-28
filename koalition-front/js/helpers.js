function scrollToId(id) {
    document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start"});
}

function prevent_enter_keypress(event) {
        if (e.key === 'Enter') e.preventDefault();
}

/** Retrieve the chips values, add them to the form and then execute post  */
function confirmation_form_submit() {


    ids = ["first_name",
          "last_name",
          "telephone",
          "email",
          "need_hostel",
          "dinner_14",
          "particular_food",
          "particular_mobility",
          "particular_babies",
          "message"];
    
    data = {};

    ids.forEach(id => {
        data[id] = $("#"+id).val();
    });

    // take chips data and extra eventual leftovers
    chips_data = M.Chips.getInstance($('.chips')).chipsData;
    chips_data.push({tag: $("#others").val()});

    data["others"] = chips_data;

     // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./confirmation", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
    

    xhr.onloadend = function () {
        alert(xhr.responseText)
    }
}
