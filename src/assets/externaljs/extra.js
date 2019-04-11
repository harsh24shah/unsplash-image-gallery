var lastScrollTop = 0;
$(window).scroll(function () {
    st = $(this).scrollTop();
    navOffset = $('.app-name').outerHeight();
   // console.log(st + "--" + navOffset);
    if ((navOffset - st) <= 0) {
        if (st > lastScrollTop) {
            // downscroll code
            $('.app-name').addClass("hideHeader");
        } else {
            // upscroll code
            $('.app-name').removeClass("hideHeader");
        }
        lastScrollTop = st;
    }
});
