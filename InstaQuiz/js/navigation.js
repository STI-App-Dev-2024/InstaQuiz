document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logo").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "../html/welcome.html";
    });

    document.getElementById("nav_home").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "../html/welcome.html";
    });

    document.getElementById("nav_contact").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "../html/contact.html";
    });

    document.getElementById("nav_faq").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "../html/faq.html";
    });

    document.querySelector(".login").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "../html/signin.html";
    });

    document.querySelector(".signup").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "../html/signup.html";
    });
});
