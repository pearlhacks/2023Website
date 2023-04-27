$(document).ready(function () {
    $("body>footer").load("./components/footer.html");
    $("body>header").load("./components/navbar.html");
    $("navbar").addClass("transparent-nav");
    $("dropdown-menu").addClass("transparent-nav");
    $(".navbar-nav").addClass("nav-background")
});

let scroll_pos = 0; const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

$(document).scroll(function () {
    scroll_pos = $(this).scrollTop();
    if (window.pageYOffset < 100) {
        $(".navbar-nav").addClass("nav-background")
    }
    if (window.pageYOffset > 100) {
        $(".navbar-nav").removeClass("nav-background")
    }
    if (scroll_pos > vh - 100) {
        $(".navbar").css("box-shadow", "0px 2px 3px rgb(0,0,0,.3)");
        $(".navbar").removeClass("transparent-nav");
        $(".dropdown-menu").removeClass("transparent-nav")
    }
    else {
        $(".navbar").css("box-shadow", "none");
        $(".navbar").addClass("transparent-nav");
        $(".dropdown-menu").addClass("transparent-nav")
    }
})