var LoginBtn = document.getElementById("submitLoginForm");
var forgotPassword = document.getElementById("forgotPassword");
//var openSignUp = document.getElementById("signUpPage");
var loginError = document.getElementById("loginError");
var errorMsg = document.getElementById("errorMsg");


// var OpenSignUp= async(e)=>{
//     try{
//         e.preventDefault();
//         axios.get("http://localhost:3000/signUp")
//         .then(data =>{
//                 console.log(data.data);
//         })
//     }catch(err){
//         console.log(err);
//     }
// }

var SubmitLoginForm = async (e) => {

    try {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if (email == '' || password == '' ) {

            errorMsg.innerHTML = "Please enter the values before submitting"
            setTimeout(() => errorMsg.remove(), 3000);
            return;

        }

        let myObj = {
            "email": email,
            "password": password
        };

        //console.log(HOST_IPADDRESS+ "/login/");
        axios.post("/login/", myObj)
            .then(result => {
                alert(JSON.stringify(result.data.Message));
              //  console.log(data.data);
            localStorage.setItem("token",result.data.token);
             window.location.href = "/expense";

            }).catch(err =>{
                loginError.innerHTML=JSON.stringify(err.response.data.Error);
                console.log(err);
            })
    } catch (err) {
         console.log(err);
    }
}

var  forgotPasswordForm = (e)=>{
    try {
        e.preventDefault();
        window.location.href= "/forgotPassword";
    } catch (error) {
        console.log(err);
    }
}

LoginBtn.addEventListener("click", SubmitLoginForm);
forgotPassword.addEventListener("click", forgotPasswordForm);
//openSignUp.addEventListener("click", OpenSignUp);