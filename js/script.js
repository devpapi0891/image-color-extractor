// HIDE SHOW NAV
$().ready(function() {

    let prevYPosition = window.pageYOffset || document.documentElement.scrollTop;
    $(document).on('scroll', function() {
        var currentYPosition = window.pageYOffset || document.documentElement.scrollTop;
        if (prevYPosition < currentYPosition) {
            $('#nav').addClass('hide');
        } else {
            $('#nav').removeClass('hide');
        }
    
        prevYPosition = currentYPosition;
    });

    console.log(prevYPosition)

});

// HIDE SHOW SCROLL TO TOP BUTTON
$(document).on('scroll', function() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if ( scrollY > 100 ) {
        $('#scroll-to-top-btn').addClass('active');
    } else {
        $('#scroll-to-top-btn').removeClass('active');

    }
});


// SCROLL TO TOP
$(document).on('click', '#scroll-to-top-btn', function() {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
})


// OPEN NAVIGATION LIST
$(document).on('click', '#menu-btn', function() {
    $('#navigation-list').addClass('active');
    $('body').addClass('disable-scroll');
});

// CLOSE NAVIGATION LIST
$(document).on('click', '#close-nav-btn', function() {
    $('#navigation-list').removeClass('active');
    $('body').removeClass('disable-scroll');
});

// ON RESIZE
$(window).resize( function() {
    var currentWidth = document.body.clientWidth;
    if( currentWidth > 760 )
    {
        $('body').removeClass('disable-scroll');
        $('#navigation-list').removeClass('active');
    }
});

// ON CLICK SEARCH BTN
$(document).on('click', '#search-btn', function() {
    $('#search-field').addClass('active');
    $('#keyword').focus();
});

$(document).focusout('#keyword', function() {
    $('#search-field').removeClass('active');
});