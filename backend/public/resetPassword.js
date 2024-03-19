var resetPassword= document.getElementById('resetPassword');
var errorMsg = document.getElementById("errorMsg");

const updatePassword=async (e)=>{
    try {
        e.preventDefault();

        const email=document.getElementById('email').value;
        const password=document.getElementById('newPassword').value;

        if(email=='' || password==''){
            errorMsg.innerHTML = "Please enter the values before submitting"
            setTimeout(() => errorMsg.remove(), 3000);
            return;
        }else{

            let myObj = {
                "email": email,
                "password": password
            };
    
            await axios.post("/password/updatePassword", myObj)
            .then(response =>{
                console.log(response.data.Message);
                window.location="/"
            })
            .catch(err =>{
                console.log(err);
            });

        }
    } catch (error) {
        console.log(error);
    }
}

resetPassword.addEventListener('click',updatePassword);