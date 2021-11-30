var form_id_js = "contact_form";

var data_js = {};

function js_onSuccess() {
    // remove this to avoid redirect
    // window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
    sendButton.disabled = false;
    sendButton.value = 'SUBMIT';
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#message').value = '';
    document.querySelector("#thankyousubmit").style.visibility = "initial";
}

function js_onError(error) {
    // remove this to avoid redirect
    // window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

var sendButton = document.getElementById("js_send");

function js_send() {
    sendButton.value = 'Sending…';
    sendButton.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
            if (request.readyState == 4) {
                js_onError(request.response);
            }
    };

    var name = document.querySelector("#" + form_id_js + " [name='name']").value;
    var sender_email = document.querySelector("#" + form_id_js + " [name='sender_email']").value;
    var message = document.querySelector("#" + form_id_js + " [name='message']").value;
    data_js['name'] = name;
    data_js['sender_email'] = sender_email;
    data_js['message'] = message;
    var params = toParams(data_js);

    request.open("POST", "https://portfolio.itsnotnebula.repl.co/sendmail", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for (var key in data_js) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});