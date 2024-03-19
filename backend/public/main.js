var submitBtn = document.getElementById("submitSignUpForm");
var errorMsg = document.getElementById("errorMsg");

var SubmitSignUpForm = async (e) => {

    try {

        e.preventDefault();

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if (email == '' || password == '' || name == '') {

            errorMsg.innerHTML = "Please enter the values before submitting"
            setTimeout(() => errorMsg.remove(), 3000);
            return;

        }

        let myObj = {
            "name": name,
            "email": email,
            "password": password
        };

        axios.post("/user/post", myObj)
            .then(data => {
                console.log(data.data.NewUser);
                window.location.href="/";
            }).catch(err =>{
                alert("User Already Exists! -"+JSON.stringify(err.response.data.Error.errors[0].message));
                console.log(err.response.data.Error.errors[0])
            })
    } catch (err) {
         console.log(err);
    }
}


submitBtn.addEventListener("click", SubmitSignUpForm);
