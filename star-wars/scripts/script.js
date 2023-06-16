'use strict';
$(document).ready(()=>{
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        navClass: ['slider__arrow slider__prev','slider__arrow slider__next'],
        dotsClass:'slider__dots',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            900:{
                items:3
            },
            1100:{
                items:4
            },
            1700:{
                items:5
            }
        }
    })
});