

$(document).ready(function() {
    $(window).scroll(function(){
        if(this.scrollY > 10) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 800) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    //scroll-up-btn 
    $('.scroll-up-btn').click(function() {
        $('html').animate({scrollTop:0});
    });

    //typing animation
    var typed = new Typed(".typing", {
        strings: ["Front-end Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    })



    //toggle menu/navbar
    $('.menu-btn').click(function() {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
});

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
        } else {
        reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);



const formEl = document.getElementById("form-message");
const successMessage = document.getElementById("success-message");
const messageTextPopup = document.getElementById("message-text");
const loading = document.getElementById("loading-animate");
loading.style.display = "none";

$("#form-message").submit(function(e){
    e.preventDefault();
    var form = $(this);
    var actionUrl = form.attr('action');
    
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), 
        success: function(data)
        {
            loading.style.display = "none";
            successMessage.style.display = "block"; // show popup
            messageTextPopup.innerHTML = data.message;
        }
    });
});



const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const subjectEl = document.getElementById("subject");
const textEl = document.getElementById("text");
const overlay = document.getElementById("overlay");
const okBtn = document.getElementById("okBtn");
formEl.addEventListener("submit", function(e) {
    e.preventDefault();
    formEl.reset();
    nameEl.value = "";
    emailEl.value = "";
    subjectEl.value = "";
    textEl.value = "";
    overlay.style.display = "block";
    loading.style.display = "block";


    okBtn.addEventListener("click", function() {
        successMessage.style.display = "none";
        overlay.style.display = "none";
    })
})