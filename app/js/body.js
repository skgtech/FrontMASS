/**
 * @fileOverview JS code that used to be inline in the html body
 */

jQuery(document).ready(function() {

  jQuery('.tp-banner').show().revolution(
  {
    dottedOverlay:"none",
    delay:9000,
    startwidth:1200,
    startheight:350,
    hideThumbs:200,

    thumbWidth:100,
    thumbHeight:50,
    thumbAmount:3,


    navigationType:"none",
    navigationArrows:"solo",
    navigationStyle:"preview4",

    touchenabled:"on",
    onHoverStop:"on",
    nextSlideOnWindowFocus:"off",

    swipe_velocity: 0.7,
    swipe_min_touches: 1,
    swipe_max_touches: 1,
    drag_block_vertical: false,

    keyboardNavigation:"off",

    navigationHAlign:"center",
    navigationVAlign:"bottom",
    navigationHOffset:0,
    navigationVOffset:20,

    soloArrowLeftHalign:"left",
    soloArrowLeftValign:"center",
    soloArrowLeftHOffset:20,
    soloArrowLeftVOffset:0,

    soloArrowRightHalign:"right",
    soloArrowRightValign:"center",
    soloArrowRightHOffset:20,
    soloArrowRightVOffset:0,

    shadow:0,
    fullWidth:"off",
    fullScreen:"on",

    spinner:"spinner0",

    stopLoop:"off",
    stopAfterLoops:-1,
    stopAtSlide:-1,

    shuffle:"off",
    forceFullWidth:"on",
    fullScreenAlignForce:"off",
    minFullScreenHeight:"",

    hideThumbsOnMobile:"off",
    hideNavDelayOnMobile:1500,
    hideBulletsOnMobile:"off",
    hideArrowsOnMobile:"off",
    hideThumbsUnderResolution:0,

    fullScreenOffsetContainer: "",
    fullScreenOffset: "",
    hideSliderAtLimit:0,
    hideCaptionAtLimit:0,
    hideAllCaptionAtLilmit:0,
    startWithSlide:0
    });

}); /*ready*/
