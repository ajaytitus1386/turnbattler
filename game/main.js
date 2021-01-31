
let playerEmail = null;
let toggleNavStatus = false;
let crownNames = ["GoldCrown","SilverCrown","BronzeCrown"];

let toggleNav = function(){
    let getSidebar = document.querySelector(".nav-sidebar")
    let getSidebarUl = document.querySelector(".nav-sidebar ul")
    let getSidebarTitle = document.querySelector(".nav-sidebar span")
    let getSidebarLinks = document.querySelectorAll(".nav-sidebar a")
    let getSidebarDivs = document.getElementsByClassName("")
    //Needs to select elements and set opacities to 1
    if (toggleNavStatus === false) {
        getSidebarUl.style.visibility="visible";
        getSidebar.style.width = "272px";
        getSidebarTitle.style.opacity = "0.5";

        let arrayLength = getSidebarLinks.length;

        for(let i=0;i<arrayLength;i++)
        {
            getSidebarLinks[i].style.opacity="1";
        }

        for(let i=0;i<getSidebarDivs.length;i++)
        {
            getSidebarDivs[i].style.opacity = "1";
        }

        toggleNavStatus = true;
    }
    
    else if (toggleNavStatus === true) {
        getSidebarUl.style.visibility="hidden";
        getSidebar.style.width = "50px";
        getSidebarTitle.style.opacity = "0";

        let arrayLength = getSidebarLinks.length;

        for(let i=0;i<arrayLength;i++)
        {
            getSidebarLinks[i].style.opacity="0";
        }

        toggleNavStatus = false;
    }
}


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $(".g-signin2").css("display","none");
    $(".g-signout").css("display","block");
    $("#email").text(profile.getEmail());
    playerEmail = (profile.getEmail());
    updateCrowns(playerEmail);
}

function updateCrowns(playerEmail){
    if(playerEmail != null){
        let crowns = document.getElementsByClassName("crown");
        let counter = 0;
        for (let index = 0; index < crowns.length; index++) {
            var crown = crowns[index];
            crown.src = "imgs/"+crownNames[counter++]+".png";
        }

    }
    else if(playerEmail == null){
        console.log(playerEmail)
        let crowns = document.querySelectorAll("crown");
        let counter = 0;
        for (let index = 0; index < crowns.length; index++) {
            var crown = crowns[index];
            crown.src = "imgs/"+"Locked_"+crownNames[counter++]+".png";
        }
    }
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    
    auth2.signOut().then( function() {
        alert("Done! You are signed out!")
        $(".g-signin2").css("display","block");
        $(".g-signout").css("display","none");
        
    })
    playerEmail = null;
    updateCrowns(playerEmail);
}

