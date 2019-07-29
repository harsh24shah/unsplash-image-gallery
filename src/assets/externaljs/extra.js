var lastScrollTop = 0; //last scroll position
$(window).on('scroll load', function () {
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
    if ($('.modal-description').hasClass('active')) {
        $('.modal-description').removeClass('active');
    } else {
        $('.modal-description').addClass('active');
    }
});
$(document).on('click', '.modal > .close,.image-popup-image img', () => {
    if ($('.modal-description').hasClass('active')) {
        $('.modal-description').removeClass('active');
    }
});

function shareImage(Obj) {
    var imageUrl = $(Obj).data('imageurl');
    var imageTitle = $(Obj).data('imagetitle');
    var imageText = $(Obj).data('imagetext');

    if (navigator.share === undefined) {
        alert('Error: Unsupported feature: navigator.share');
        $(Obj).data('calltoggle', 'true');
        return;
    }

    try {
        if (imageUrl !== null || imageUrl == '' || imageUrl == undefined) {
            navigator.share({ imageTitle, imageText, imageUrl });
        }
    } catch (error) {
        alert('Error sharing: ' + error);
        return;
    }
}
