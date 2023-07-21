console.log("inside forgot password file")
var getPassword = document.getElementById("getPasswordOnEmail");
var errorMsg = document.getElementById("errorMsg");

var sendMailRequest = (e) => {
    try {
        console.log("send mail request called");
        e.preventDefault();

        let emailId = document.getElementById("emailLink").value;

        if (emailId == "") {
            errorMsg.innerHTML = "Please enter the email before submitting"
            setTimeout(() => errorMsg.remove(), 3000);
            return;
        } else {
            console.log("inside semdMailRequest");
            let myObj = {
                "emailId": emailId
            }

             axios.post("/called/password/forgotpassword", myObj)
                .then(response => {
                    console.log(response.data.message);
                    window.location.href = "/";
                })
        }

    } catch (error) {
        console.log(err);
    }
}


getPassword.addEventListener("click", sendMailRequest);