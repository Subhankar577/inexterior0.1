(function($) {	
	"use strict";

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var HeaderHeight = $('.main-header').height();
			var scrollLink = $('.scroll-to-top');

			if (windowpos > HeaderHeight) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();
	

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
		
		//Dropdown Button
		$('.main-header .navigation li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		//$('.main-header .navigation li.dropdown > a').on('click', function(e) {
			//e.preventDefault();
		//});
	}
	
	
	//Search Popup
	if($('#search-popup').length){
		
		//Show Popup
		$('.search-box-btn').on('click', function() {
			$('#search-popup').addClass('popup-visible');
		});

		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
	            $('#search-popup').removeClass('popup-visible');
	        }
	    });

		//Hide Popup
		$('.close-search,.search-popup .overlay-layer').on('click', function() {
			$('#search-popup').removeClass('popup-visible');
		});
	}
	
	
	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu .navigation').html();
		$('.mobile-menu .navigation').append(mobileMenuContent);
		$('.sticky-header .navigation').append(mobileMenuContent);

		$('.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
	            $('body').removeClass('mobile-menu-visible');
	        }
	    });

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

	}
	
	// Main Slider Carousel
	if ($('.banner-carousel').length) {
		$('.banner-carousel').owlCarousel({
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			singleItem:true,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:6000,
			navText: [
				'<span class="fas fa-angle-left"></span>',
				'<span class="fas fa-angle-right"></span>'
			],
			responsive:{
				0:{ items:1 },
				600:{ items:1 },
				1024:{ items:1 }
			}
		});    		
	}


	// Testimonial Carousel
	if ($('.testimonial-carousel').length) {
		$('.testimonial-carousel').owlCarousel({
			animateOut: 'slideOutDown',
    		animateIn: 'fadeIn',
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoHeight: false,
			autoplay: true,
			autoplayTimeout:10000,
			navText: [
				'<span class="fa fa-angle-left"></span>',
				'<span class="fa fa-angle-right"></span>'
			],
			responsive:{
				0:{ items:1 },
				600:{ items:1 },
				800:{ items:2 },
				1024:{ items:2 },
				1200:{ items:2 }
			}
		});    		
	}
	
	
	//Product Tabs
	if($('.project-tab').length){
		$('.project-tab .project-tab-btns .p-tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).hasClass('actve-tab')){
				return false;
			}else{
				$('.project-tab .project-tab-btns .p-tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				$('.project-tab .p-tabs-content .p-tab').removeClass('active-tab');
				$(target).addClass('active-tab');
			}
		});
	}
	
	
	//Product Carousel
	if ($('.project-carousel').length) {
		$('.project-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [
				'<span class="fa fa-angle-left"></span>',
				'<span class="fa fa-angle-right"></span>'
			],
			responsive:{
				0:{ items:1 },
				600:{ items:2 },
				800:{ items:2 },
				1024:{ items:3 },
				1200:{ items:4 },
				1400:{ items:4 }
			}
		});    		
	}
	
	
	//
	//====================================================================//
	// Sortable Masonary with Filters
	//====================================================================//
	//
	function sortableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				masonry: {
					columnWidth : '.masonry-item.small-block'
				},
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});

			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');

				try {
					$container.isotope({ 
						filter: selector,
						animationOptions: {
							duration: 500,
							easing: 'linear',
							queue: false
						}
					});
				} catch(err) {}

				return false;
			});
	
			winDow.on('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter: selector,
					animationOptions: {
						duration: 500,
						easing: 'linear',
						queue: false
					}
				});
			});
	
			var filterItemA = $('.filter-btns li');

			filterItemA.on('click', function(){
				var $this = $(this);

				if (!$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}
	
	sortableMasonry();
	
	
	//Masonary
	function enableMasonry() {
		if($('.masonry-items-container').length){
	
			var winDow = $(window);
			var $container=$('.masonry-items-container');
	
			$container.isotope({
				itemSelector: '.masonry-item',
				masonry: {
					columnWidth : '.masonry-item.col-lg-4'
				},
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
	
			winDow.on('resize', function(){
				$container.isotope({ 
					itemSelector: '.masonry-item',
					animationOptions: {
						duration: 500,
						easing: 'linear',
						queue: false
					}
				});
			});
		}
	}
	
	enableMasonry();
	
	
	
	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");

				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}
	
	
	//Gallery Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}
	 
	
	//Custom Seclect Box
	if($('.custom-select-box').length){
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}
	 
	
	//Jquery Spinner / Quantity Spinner
	if($('.quantity-spinner').length){
		$("input.quantity-spinner").TouchSpin({
			verticalbuttons: true
		});
	}
	
	 
	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect: 'fade',
			closeEffect: 'fade',
			helpers: {
				media: {}
			}
		});
	}

	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');

			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1500);
		});
	}
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});

		wow.init();
	}


/* ==========================================================================
   When document is Scrolling
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		sortableMasonry();
		enableMasonry();
	});	

})(window.jQuery);


// Disable right-click (original code)
document.addEventListener('contextmenu', event => event.preventDefault());


/* ==========================================
   INFINITE VIDEO CAROUSEL
   visible videos | 1.5s autoplay
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".video-slider");
  if (!slider) return;

  const track = slider.querySelector(".video-track");
  const prevBtn = slider.querySelector(".slider-arrow.prev");
  const nextBtn = slider.querySelector(".slider-arrow.next");

  const originals = Array.from(track.querySelectorAll(".video-card"));
  const total = originals.length;

  if (total < 4) {
    console.warn("Add at least 4 video cards for the infinite slider.");
    return;
  }

  const cloneCount = 3;      // cards cloned on each side (matches 3 visible)
  const DURATION = 450;      // slide animation time (ms)
  const AUTOPLAY_DELAY = 2500;

  // ---- Create clones for the infinite loop ----
  for (let i = 0; i < cloneCount; i++) {
    const frontClone = originals[total - 1 - i].cloneNode(true);
    frontClone.setAttribute("aria-hidden", "true");
    frontClone.tabIndex = -1;
    track.prepend(frontClone);

    const backClone = originals[i].cloneNode(true);
    backClone.setAttribute("aria-hidden", "true");
    backClone.tabIndex = -1;
    track.append(backClone);
  }

  // ---- State ----
  let index = cloneCount;   // start on the first real card
  let isAnimating = false;
  let queued = 0;           // extra clicks received while animating
  let autoplayTimer = null;

  // Width of one card + the gap between cards
  function getStep() {
    const card = track.querySelector(".video-card");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  // Move the track
  function setPosition(animate) {
    track.style.transition = animate
      ? `transform ${DURATION}ms ease-in-out`
      : "none";
    track.style.transform = `translateX(${-index * getStep()}px)`;
  }

  // Start one slide
  function slide(direction) {
    if (isAnimating) {
      // Remember fast clicks so they are not lost
      queued = Math.max(-3, Math.min(3, queued + direction));
      return;
    }
    isAnimating = true;
    index += direction;
    setPosition(true);
  }

  // When a slide finishes, jump silently if we reached a clone
  track.addEventListener("transitionend", function (e) {
    if (e.target !== track || e.propertyName !== "transform") return;

    isAnimating = false;

    // Went past the last real card -> jump back to the first real card
    if (index >= total + cloneCount) {
      index -= total;
      setPosition(false);
    }

    // Went before the first real card -> jump to the last real card
    if (index < cloneCount) {
      index += total;
      setPosition(false);
    }

    // Run any queued fast-click slides
    if (queued !== 0) {
      const dir = Math.sign(queued);
      queued -= dir;
      slide(dir);
    }
  });

  // ---- Arrow buttons ----
  nextBtn.addEventListener("click", function () {
    slide(1);
    restartAutoplay();
  });

  prevBtn.addEventListener("click", function () {
    slide(-1);
    restartAutoplay();
  });

  // ---- Autoplay ----
  function startAutoplay() {
    autoplayTimer = setInterval(() => slide(1), AUTOPLAY_DELAY);
  }

  function restartAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // ---- Keep position correct on resize ----
  window.addEventListener("resize", function () {
    setPosition(false);
  });

  // ---- Start ----
  setPosition(false);
  startAutoplay();
});