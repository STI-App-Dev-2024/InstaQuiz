// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoLbJdlLUsfMp09PwA_31TYcetC3JxIWs",
  authDomain: "instaquiz-37134.firebaseapp.com",
  projectId: "instaquiz-37134",
  storageBucket: "instaquiz-37134.appspot.com",
  messagingSenderId: "78078580689",
  appId: "1:78078580689:web:0184ebf9d3896a3b20b2f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.getElementById('signin-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Login successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'homepage.html'; // Redirect to your home page or dashboard
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/wrong-password') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Error during sign-in', 'signInMessage');
      }
    });
});
