// JavaScript Document
"use strict";
//Preloader
$(window).load(function () {
    $("#intro-loader").delay(1000).fadeOut();
    $(".mask").delay(1000).fadeOut("slow");
});
$(document).ready(function () {
    //Elements Appear from top
    $('.item_top').each(function () {
        $(this).appear(function () {
            $(this).delay(400).animate({
                opacity: 1,
                top: "0px"
            }, 1000);
        });
    });
    //Elements Appear from bottom
    $('.item_bottom').each(function () {
        $(this).appear(function () {
            $(this).delay(400).animate({
                opacity: 1,
                bottom: "0px"
            }, 1000);
        });
    });
    //Elements Appear from left
    $('.item_left').each(function () {
        $(this).appear(function () {
            $(this).delay(400).animate({
                opacity: 1,
                left: "0px"
            }, 1000);
        });
    });
    //Elements Appear from right
    $('.item_right').each(function () {
        $(this).appear(function () {
            $(this).delay(400).animate({
                opacity: 1,
                right: "0px"
            }, 1000);
        });
    });
    //Elements Appear in fadeIn effect
    $('.item_fade_in').each(function () {
        $(this).appear(function () {
            $(this).delay(400).animate({
                opacity: 1,
                right: "0px"
            }, 1500);
        });
    });

    //Navigation BUTTON
    $('.nav-toggle').hover(function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(250);
    }, function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(250)
    });


    $(".mobile-nav-button").click(function () {
        $(".inner div.nav-menu").slideToggle("medium", function () {
            // Animation complete.
        });
    });
    $('.inner div.nav-menu ul.nav li a').click(function () {
        if ($(window).width() < 1000) {
            $(".nav-menu").slideToggle("2000")
        }
    });

    $('body').scrollspy({
        target: '.nav-menu',
        offset: 95
    })
    processLine.init();
    $('.section-content .media-container').fitVids();
    //Clients
    $("#left_scroll a").attr({
        href: 'javascript:slide("left");',
    });
    $("#right_scroll a").attr({
        href: 'javascript:slide("right");',
    });
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('.clients').waypoint(function () {
            $('#carousel_ul').children().each(function (index) {
                $(this).delay(300 * index).animate({
                    opacity: "1",
                    marginTop: "0"
                }, 300);
            });
        }, {
            offset: "85%"
        });
    } else {
        $('.clients #carousel_ul').children().css({
            opacity: "1",
            marginTop: "0"
        });
    }

    $('.flexslider').flexslider({
        animation: "slide"
    });
    // Galleries Slider
    $('.slider_container').flexslider({
        directionNav: true,
        controlNav: false
    });
    /*===================================================================================*/
    /*  PROFOLIO                                                                         */
    /*===================================================================================*/
    var portfolio = portfolio || {},
        $portfolioItems = $('#portfolio-items'),
        $filtrable = $('#portfolio-filter');
    /*===================================================================================*/
    /*  PROFOLIO INIT FULL WIDTH                                                         */
    /*===================================================================================*/
    portfolio.fullWidth = function () {
        $(window).load(function () {
            $portfolioItems.isotope({
                animationEngine: 'best-available',
                animationOptions: {
                    duration: 250,
                    easing: 'easeInOutSine',
                    queue: false
                }
            });
        });
        $filtrable.find('a').click(function (e) {
            var currentOption = $(this).data('cat');
            $filtrable.find('a').removeClass('active');
            $(this).addClass('active');
            if (currentOption !== '*') {
                currentOption = '.' + currentOption;
            }
            $portfolioItems.isotope({
                filter: currentOption
            });
            return false;
        });
    };
    /*===================================================================================*/
    /*  PROFOLIO INIT AJAX                                                               */
    /*===================================================================================*/
    portfolio.ajax = function () {
        function portfolioInit() {
            var newHash = "",
                $mainContent = $("#portfolio-ajax"),
                $pageWrap = $("#portfolio-wrap"),
                root = '#!projects/',
                rootLength = root.length,
                url;
            $portfolioItems.find(".full-page").click(function () {
                window.location.hash = $(this).attr("href");
                $(document.body).addClass('noscroll' );
                return false;
            });
            //binding keypress function
            $("#portfolio-wrap").bind("keydown", function (e) {
                if (e.keyCode == 37) {
                    $('.single-portfolio').remove();
                    window.location.hash = $("#portfolio-items .current").next().find('.full-page').attr("href");
                    return false;
                } else if (e.keyCode == 39) {
                    $('.single-portfolio').remove();
                    window.location.hash = $("#portfolio-items .current").prev().find('.full-page').attr("href");
                    return false;
                } else if (e.keyCode == 27) {
                    $('#portfolio-wrap').fadeOut('100', function () {
                        $('.single-portfolio').remove();
                    });
                    history.pushState('', document.title, window.location.pathname);
                    window.location.hash = '#_';
                    return false;
                }
            });
            $(window).bind('hashchange', function () {
                newHash = window.location.hash;
                url = newHash.replace(/[#\!]/g, '');
                if (newHash.substr(0, rootLength) == root) {
                    if ($pageWrap.is(':hidden')) {
                        $pageWrap.slideDown('3000', function () {});
                    }
                    $pageWrap.niceScroll({
                        cursorcolor: "#666",
                        cursorwidth: 6,
                        cursorborder: 0,
                        cursorborderradius: 0
                    });
                    $pageWrap.append('<div id="preloader"></div>');
                    $mainContent.load(url + " .single-portfolio", function (xhr, statusText, request) {
                        if (statusText == "success") {
                            setTimeout(function () {
                                $(".slider_container").flexslider({
                                    directionNav: true,
                                    controlNav: false
                                });
                                $('.single-portfolio .media-container').fitVids();
                                $pageWrap.find('#preloader').remove();
                            }, 300);
                        }
                        if (statusText == "error") {
                            $mainContent.html('<div class="row pad-top pad-bottom"><div class="col-md-12 pad-top pad-bottom"><div class="alert-message error"><p>The Content cannot be loaded.</p></div></div></div>');
                            $pageWrap.find('#preloader').remove();
                        }
                        closeProject();
                        nextProject();
                        prevProject();
                    });
                    $("#portfolio-items article").removeClass("current");
                    $("#portfolio-items .full-page[href='" + newHash + "']").parent().addClass("current");
                    var projectIndex = $('#portfolio-items').find('article.current').index();
                    var projectLength = $('#portfolio-items article').length - 1;
                    if (projectIndex == projectLength) {
                        jQuery('#next-project').addClass('disabled');
                        jQuery('#prev-project').removeClass('disabled');
                    } else if (projectIndex == 0) {
                        jQuery('#prev-project').addClass('disabled');
                        jQuery('#next-project').removeClass('disabled');
                    } else {
                        jQuery('#prev-project, #next-project').removeClass('disabled');
                    }
                } else if (newHash == '') {
                    $('#portfolio-wrap').fadeOut('100', function () {
                        $('.single-portfolio').remove();
                    });
                }
            });
            $(window).trigger('hashchange');
        }

        function closeProject() {
            $('#close-project').on('click', function () {
                $('#portfolio-wrap').fadeOut('100', function () {
                    $('.single-portfolio').remove();
                });
                history.pushState('', document.title, window.location.pathname);
                window.location.hash = '#_';
                $(document.body).removeClass('noscroll' );
                return false;
            });
        }

        function nextProject() {
            $("#next-project").on("click", function () {
                $('.single-portfolio').remove();
                window.location.hash = $("#portfolio-items .current").next().find('.full-page').attr("href");
                return false;
            });
        }

        function prevProject() {
            $("#prev-project").on("click", function () {
                $('.single-portfolio').remove();
                window.location.hash = $("#portfolio-items .current").prev().find('.full-page').attr("href");
                return false;
            });
        }
        if ($portfolioItems.length) {
            portfolioInit();
        }
    };

    function initColorBox() {
        //How to assign the Colorbox event to elements
				$(".cb-img").colorbox({rel:'cb-img', transition:"fade", width:"80%", height:"80%"});
				$(".ajax").colorbox();
				$(".cb-youtube").colorbox({iframe:true, innerWidth:"80%", innerHeight:"80%"});
				$(".cb-vimeo").colorbox({iframe:true, innerWidth:"80%", innerHeight:"80%"});
				$(".cb-iframe").colorbox({iframe:true, width:"80%", height:"80%"});
				$(".callbacks").colorbox({
					onOpen:function(){ alert('onOpen: colorbox is about to open'); },
					onLoad:function(){ alert('onLoad: colorbox has started to load the targeted content'); },
					onComplete:function(){ alert('onComplete: colorbox has displayed the loaded content'); },
					onCleanup:function(){ alert('onCleanup: colorbox has begun the close process'); },
					onClosed:function(){ alert('onClosed: colorbox has completely closed'); }
				});
     }    
    portfolio.fullWidth();
    portfolio.ajax();
    initColorBox();
    
    /*Pie Chart*/
    $(function () {
        $('.chart').appear(function () {
            $('.chart').easyPieChart({
                easing: 'easeOutBounce',
                barColor: "#838590",
                size: "150",
                lineWidth: 15,
                animate: 2000,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        });
    });

    /*Skill*/
    $('.skillBar li').each(function () {
        var b = $(this).find("span").attr("data-width");
        $(this).find("span").css({
            width: b + "%"
        })
    });

    /* Start Package select */

    $(function () {
        $(".package").click(function () {
            $('.package-container .package').each(function () {
                $(".package").removeClass("package-active");
            })
            $('.packages > div').each(function () {
                $(".packages > div").removeClass("package-show");
                $(".packages > div").addClass("package-hide");
            })
            var $currentTab = $(this);
            var $tabAria = $currentTab.attr('aria-controls');
            $currentTab.addClass("package-active");
            $("#" + $tabAria).removeClass("package-hide");
            $("#" + $tabAria).addClass("package-show");
        });
    });
    /* End Package select */

    // Contact Form Request
    $(".validate").validate();
    var form = $('#contactform');
    var submit = $('#contactForm_submit');
    var alertx = $('.form-respond');
    // form submit event
    $(document).on('submit', '#contactform', function (e) {
        e.preventDefault(); // prevent default form submit
        // sending ajax request through jQuery
        $.ajax({
            url: 'sendemail.php',
            type: 'POST',
            dataType: 'html',
            data: form.serialize(),
            beforeSend: function () {
                alertx.fadeOut();
                submit.html('Sending....'); // change submit button text
            },
            success: function (data) {
                form.fadeOut(300);
                alertx.html(data).fadeIn(1000); // fade in response data     
                setTimeout(function () {
                    alertx.html(data).fadeOut(300);
                    $('#name, #email,#phone, #message').val('');
                    form.fadeIn(1800);
                }, 4000);
            },
            error: function (e) {
                console.log(e)
            }
        });
    });
    // Minify the Nav Bar
    jQuery(document).scroll(function () {
        var position = jQuery(document).scrollTop();
        if ($("#home").length > 0) {
            var headerHeight = jQuery('#home').outerHeight();
        } else if ($(".header-video").length > 0) {
            var headerHeight = jQuery('.header-video').outerHeight();
        } else if ($("#single").length > 0) {
            var headerHeight = jQuery('#single').outerHeight();
        } else if ($("#blog").length > 0) {
            var headerHeight = jQuery('#blog').outerHeight();
        }
        var headerHeightHalf = (headerHeight / 2) - 80;

        if (jQuery('#home').length > 0) {
            var headerTop = jQuery('#home').offset().top;
        } else if (jQuery('.header-video').length > 0) {
            var headerTop = jQuery('.header-video').offset().top;
        } else if (jQuery('#blog').length > 0) {
            var headerTop = jQuery('#blog').offset().top;
        } else if (jQuery('#single').length > 0) {
            var headerTop = jQuery('#single').offset().top;
        }
        if (position >= headerHeight - headerHeightHalf) {
            jQuery('.trans-nav').addClass('minified');
        } else {
            jQuery('.trans-nav').removeClass('minified');
        }
        if (position > headerTop + headerHeightHalf + 75) {
            jQuery('.trans-nav').addClass('darken');
        } else {
            jQuery('.trans-nav').removeClass('darken');
        }
    });
    //Back To Top
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#back-top").fadeIn(200);
        } else {
            $("#back-top").fadeOut(200);
        }
    });
    $('#back-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
    });
});
//Navigation Scrolling
$(function() {
    $('.nav-menu li a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });
});
//Scroll nav Scrolling
$(function () {
    $('a.scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });
});
//Rotate Header Title
   if($("#header-title").length){
      var owl = $("#header-title");
      owl.owlCarousel({
        navigation : true,
        singleItem : true,
        //Basic Speeds
        slideSpeed : 200,
        paginationSpeed : 800,
        touchDrag: false,
        mouseDrag: false,
        //Autoplay
        autoPlay : 5000,
        stopOnHover : false,
        transitionStyle : "backSlide"
      });
    }
//Parallax
$(window).bind('load', function () {
    parallaxInit();
});

function parallaxInit() {
    $('#number').parallax("50%", 0.3); /*add as necessary*/
    $('#skill').parallax("50%", 0.3); /*add as necessary*/
    $('#clients').parallax("50%", 0.3); /*add as necessary*/
}
var onMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    onMobile = true;
}

/*-----------------------------------
Counter
-----------------------------------*/

$(function () {
    "use strict";
    $(".number-counters").appear(function () {
        $(".number-counters [data-to]").each(function () {
            var count = $(this).attr('data-to');
            $(this).delay(6000).countTo({
                from: 50,
                to: count,
                speed: 3000,
                refreshInterval: 50,
            });
        });
    });
});
// Swiper About Slide ------------------------------------------------------ //	
var mySwiper = new Swiper('.swiper-about', {
        mode: 'horizontal',
        loop: true,
        speed: 400,
        autoplay: 5000,
        autoResize: true,
        pagination: '.pagination-about',
        paginationClickable: true
    })
    // Swiper Testimonial ------------------------------------------------------ //	
var mySwiper = new Swiper('.swiper-testimonial', {
        mode: 'horizontal',
        loop: true,
        speed: 400,
        autoplay: 5000,
        autoResize: true,
        pagination: '.pagination-testimonial',
        paginationClickable: true
    })
    /*============================================
	Clients - Carrousel
	==============================================*/
    //options( 1 - ON , 0 - OFF)  
var auto_slide = 1;
var hover_pause = 1;
var key_slide = 1;
//speed of auto slide(  
var auto_slide_seconds = 5000;
/* IMPORTANT: i know the variable is called ...seconds but it's 
	in milliseconds ( multiplied with 1000) '*/
/*move the last list item before the first item. The purpose of this is 
	if the user clicks to slide left he will be able to see the last item.*/
$('#carousel_ul li:first').before($('#carousel_ul li:last'));
//check if auto sliding is enabled  
if (auto_slide == 1) {
    /*set the interval (loop) to call function slide with option 'right' 
	    and set the interval time to the variable we declared previously */
    var timer = setInterval('slide("right")', auto_slide_seconds);
    /*and change the value of our hidden field that hold info about 
	    the interval, setting it to the number of milliseconds we declared previously*/
    $('#hidden_auto_slide_seconds').val(auto_slide_seconds);
}
//check if hover pause is enabled  
if (hover_pause == 1) {
    //when hovered over the list  
    $('#carousel_ul').hover(function () {
        //stop the interval  
        clearInterval(timer)
    }, function () {
        //and when mouseout start it again  
        timer = setInterval('slide("right")', auto_slide_seconds);
    });
}
//check if key sliding is enabled  
if (key_slide == 1) {
    //binding keypress function  
    $(document).bind('keypress', function (e) {
        //keyCode for left arrow is 37 and for right it's 39 '  
        if (e.keyCode == 37) {
            //initialize the slide to left function  
            slide('left');
        } else if (e.keyCode == 39) {
            //initialize the slide to right function  
            slide('right');
        }
    });
}
//carousel clients

function slide(where) {
        var item_width = $('#carousel_ul li').outerWidth();
        if (where == 'left') {
            var left_indent = parseInt($('#carousel_ul').css('left')) + item_width;
        } else {
            var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;
        }
        $('#carousel_ul:not(:animated)').animate({
            'left': left_indent
        }, 1500, 'easeInOutCubic', function () {
            if (where == 'left') {
                $('#carousel_ul li:first').before($('#carousel_ul li:last'));
            } else {
                $('#carousel_ul li:last').after($('#carousel_ul li:first'));
            }
            $('#carousel_ul').css({
                'left': '-249px'
            });
        });
    }
    //Process Bar 
var processLine = {
    el: ".process-node",
    init: function () {
        processLine.bind();
    },
    bind: function () {
        $(window).scroll(function () {
            processLine.check();
        });
    },
    check: function () {
        $(processLine.el).each(function () {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 200) {
                $(this).closest("li").addClass("active").find(".line").addClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).closest("li").removeClass("active").find(".line").removeClass("active");
            }
        });
    }
}