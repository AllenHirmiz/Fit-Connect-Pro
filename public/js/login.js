const loginFormHandler = async (event) => {
    event.preventDefault();

 //  Collect values from the users 
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        //    Send a POST request to the API endpoint
        //      Use fetch() method to send data and get response
        const response = await fetch('/api/users/login', {
            //Make sure we are sending our credentials in plain text
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            //If successful redirect user to dashboard page
            // console.log('Login Successful');
            // Redirect user back home after logging them out
            //            window.location.replace('/');
            alert("You have successfully logged into your account!");
        }
    }
    
    

};