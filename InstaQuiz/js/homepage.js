
// Import Modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Firebase configuration
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
const db = getFirestore(app);

// Fetch user name and update UI
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userName = userDoc.data().name;  
            
            // Display the user's name on the homepage
            document.querySelector('.user-name').textContent = `Hello, ${userName}!`;
            document.querySelector('.content h2').textContent = `Welcome to InstaQuiz, ${userName}!`;
        } else {
            console.error("No such document in Firestore!");
        }
    } else {
        // Redirect to login if no user is signed in
        window.location.href = 'signin.html';
    }
});

// Logout function
document.querySelector('.logout').addEventListener('click', function(event) {
    event.preventDefault();
    // Confirm logout action
    if (confirm("Are you sure you want to logout?")) {
        alert("Logged out successfully!");
        window.location.href = 'welcome.html'; 
    }
});

 
// Drag and Drop functionality
document.querySelector('.upload-box').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('dragover');
});

document.querySelector('.upload-box').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('dragover');
});

document.querySelector('.upload-box').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('dragover');

    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
        alert(`File "${file.name}" dropped. Ready to convert!`);
         
        convertPdfToQuiz(file);
    } else {
        alert('Please drop a valid PDF file.');
    }
});

// Trigger when Click the upload Box
document.addEventListener('DOMContentLoaded', () => {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const fileDetails = document.getElementById('fileDetails');
    const fileName = document.getElementById('fileName');
    const pdfIcon = document.getElementById('pdfIcon');
    
    if (!uploadBox || !fileInput || !fileDetails || !fileName || !pdfIcon) {
        console.error('One or more elements not found');
        return;
    }

    uploadBox.addEventListener('click', () => {
        fileInput.click();   
    });

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const selectedFile = files[0];
            if (selectedFile.type === 'application/pdf') {
                fileName.textContent = selectedFile.name;
                fileDetails.style.display = 'flex'; 
                 
            }else{
                fileName.textContent = 'Please upload a PDF file.';
                fileDetails.style.display = 'none'; 
            }
        } else {
            fileDetails.style.display = 'none';  
        }
    });
});




// JavaScript to toggle profile drawer
document.querySelector('.user-profile').addEventListener('click', function() {
    const profileDrawer = document.getElementById('profileDrawer');
    if (profileDrawer.style.display === 'none' || profileDrawer.style.display === '') {
        profileDrawer.style.display = 'block';
    } else {
        profileDrawer.style.display = 'none';
    }
});

// Hide the drawer if clicked outside of it
document.addEventListener('click', function(event) {
    const profileDrawer = document.getElementById('profileDrawer');
    const userProfile = document.querySelector('.user-profile');
    if (!userProfile.contains(event.target)) {
        profileDrawer.style.display = 'none';
    }
});

// Tab function
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');
            // Show the corresponding tab content
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });
});

 