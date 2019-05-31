var lastScrollTop = 0; //last scroll position
$(window).scroll(function () {
    st = $(this).scrollTop();
    navOffset = $('.app-name').outerHeight();
    if ((navOffset - st) <= 0) {
        if (st > lastScrollTop) { // downscroll code           
            $('.app-name').addClass("hideHeader");
            $('nav').addClass("hideNav");
        } else { // upscroll code          
            $('.app-name').removeClass("hideHeader");
            $('nav').removeClass("hideNav");
        }
        lastScrollTop = st;
    }

    if (lastScrollTop < 350) {
        $('#backToTop').addClass('hidethis');
    } else {
        $('#backToTop').removeClass('hidethis');
    }
});

$(document).on('click', '#backToTop', () => {
    $("html, body").animate({ scrollTop: 0 }, 500);
});

$(document).on('click', '.uparrow', () => {   
    if($('.modal-description').hasClass('active')){
        $('.modal-description').removeClass('active');
    } else{
        $('.modal-description').addClass('active');
    }
});
$(document).on('click', '.modal > .close,.image-popup-image img', () => {   
    if($('.modal-description').hasClass('active')){
        $('.modal-description').removeClass('active');
    } 
});


