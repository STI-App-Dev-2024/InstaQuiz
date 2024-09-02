// JavaScript for handling logout and PDF upload

// Logout function
document.querySelector('.logout').addEventListener('click', function(event) {
    event.preventDefault();
    // Confirm logout action
    if (confirm("Are you sure you want to logout?")) {
        // Perform logout logic here
        // This might involve clearing session storage, redirecting, etc.
        alert("Logged out successfully!");
        window.location.href = 'home.html'; // Redirect to login page
    }
});

// PDF Upload and Conversion
document.querySelector('.upload-box').addEventListener('click', function() {
    // Trigger file selection dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // Display file name or perform file validation here
            alert(`File "${file.name}" selected. Ready to convert!`);
            // Trigger conversion process
            convertPdfToQuiz(file);
        }
    };
    input.click();
});

// Function to handle PDF to Quiz conversion
function convertPdfToQuiz(file) {
    // Example logic for conversion
    const formData = new FormData();
    formData.append('pdfFile', file);

    // Replace the URL with your server endpoint
    fetch('your-server-endpoint', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful conversion
        alert("Conversion successful! Quiz has been generated.");
        // Redirect to quiz page or display the quiz
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        alert("An error occurred during conversion.");
    });
}

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
        // Trigger conversion process
        convertPdfToQuiz(file);
    } else {
        alert('Please drop a valid PDF file.');
    }
});
