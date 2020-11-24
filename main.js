let playerEmail = "unknown";

// document.addEventListener('DOMContentLoaded',function(){
//     window.addEventListener('scroll',stickyFunction);
    
//     var gBanner = document.getElementById("gBanner");
//     var sticky = gBanner.offsetTop;

//     function stickyFunction() {
//         if (window.pageYOffset < sticky)
//         { gBanner.classList.add("sticky"); }
//         else { gBanner.classList.remove("sticky"); }
//     }
// })

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $(".g-signin2").css("display","none");
    $(".g-signout").css("display","block");
    $("#email").text(profile.getEmail());
    playerEmail = text(profile.getEmail());
}



function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    
    auth2.signOut().then( function() {
        alert("Done! You are signed out!")
        $(".g-signin2").css("display","block");
        $(".g-signout").css("display","none");
        
    })
    playerEmail = "unknown";
}



