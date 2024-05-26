/*
 Project Name	 : Untold
 Project Date	 : 24 November, 2016
 Project Developer: Borsan Bogdan

 ===============================================
 Table Of Contents
 ================================================

 1. Loading Page
 2. Header
 3. Parallax
 4. Count Down
 5. Biography
 6. Albums
 7. Event
 8. jPlayer
 9. Slider Horizontal
 10. Menu
 11. Window load function
 12. Window ready function

 Table Of Contents end
 ================================================
*/

jQuery(document).ready(function($){

	"use strict";

	var $body			 = jQuery('body');

	// FitVides Option
	jQuery("html").fitVids({ customSelector: "iframe"});

	jQuery('a[data-featherlight=image], a.attachment , p.attachment a , a[rel=gallery-single], figure[id*=attachment] a').featherlightGallery({
		previousIcon: '<i class="fa fa-angle-left"></i>',	 /* Code that is used as previous icon */
		nextIcon: '<i class="fa fa-angle-right"></i>',		 /* Code that is used as next icon */
		galleryFadeIn: 100,		  /* fadeIn speed when slide is loaded */
		galleryFadeOut: 300		  /* fadeOut speed before slide is loaded */
	});

	jQuery('.gallery-untold-items').isotope();

	jQuery('.gallery-untold-items').imagesLoaded(function() {

		jQuery('.gallery-untold-items').isotope();

	});

	var mobileAffixCondition = 'isFalse';

	var mobileAffix = {
		'init': function(){

			var actualScroll 		= jQuery(window).scrollTop(),
				topScrollForAffix 	= 0,
				affixHeaderClass	= 'mobile-affix',
				affixClassSelector	= jQuery('body');

			if ( actualScroll > topScrollForAffix ) {

				if ( mobileAffixCondition == 'isFalse' ) {

					affixClassSelector.addClass(affixHeaderClass);

					mobileAffixCondition = 'isTrue';

				}

			} else {

				affixClassSelector.removeClass(affixHeaderClass);

				mobileAffixCondition = 'isFalse';

			}

		}
	}

	mobileAffix.init();

	jQuery(window).scroll(function(){

		mobileAffix.init();

	});

	jQuery('.change-logo-to-black').on('scrollSpy:enter', function() {
		jQuery('body').addClass('content-white');
		jQuery('body').removeClass('content-black');
	});

	jQuery('.change-logo-to-black').on('scrollSpy:exit', function() {
		jQuery('body').addClass('content-black');
		jQuery('body').removeClass('content-white');
	});


	jQuery('.change-logo-to-white').on('scrollSpy:enter', function() {
		jQuery('body').addClass('content-black');
		jQuery('body').removeClass('content-white');
	});

	jQuery('.change-logo-to-white').on('scrollSpy:exit', function() {
		jQuery('body').removeClass('content-black');
		jQuery('body').addClass('content-white');
	});

	jQuery('.change-logo-to-white').scrollSpy();
	jQuery('.change-logo-to-black').scrollSpy();

	if ( jQuery('.only-white-logo').length ) {

		jQuery('body').addClass('only-white-logo');

	}

	if ( jQuery('.album-single-class').length ) {

		jQuery('body').addClass('albums');

	}

	jQuery(".scroll-to").on('click', function(e) {
		e.preventDefault();
		var intElemHeight;
		if ($(this).attr('scroll-to')) {
			intElemHeight = $($(this).attr('scroll-to')).offset().top;
		} else {
			intElemHeight = $($(this).attr('href')).offset().top;
		}
		$("body, html").animate({scrollTop:intElemHeight});
	});

	//================================================
	// Header
	//================================================
	if (jQuery('#header').length > 0) {

		jQuery(".icon-scroll-bottom, .scroll-bottom").on('click', function() {
			var intElemHeight = document.getElementById('header').offsetHeight;
			$("body, html").animate({
					scrollTop: intElemHeight
				}, 'slow');
		});

		function centredHeaderContent(){

			if ( jQuery('.ct-center').length ) {

				var ctHalfHeight = jQuery('.header-01 .ct-center').height() / 2,
					ctMT = jQuery('.header-01 .ct-center').css('margin-top',-ctHalfHeight);

			}

		}

		centredHeaderContent();

		jQuery(window).resize(function(){

			centredHeaderContent();

		});
	}


	//================================================
	// Parallax
	//================================================
	jQuery('#header, .item-album-full-width-bg-img').parallax();

	jQuery.fn.untoldScroll = function(opts) {
		var $self = jQuery(this),
			defaults = {
				duration: 800,
				easing: 'easeOutExpo',
				minWidth: 992
			};

		var UntoldScroll = {
			$el: $self,
			options: $.extend(
				defaults,
				$self.data(),
				opts
			),
			$projectWrap: jQuery('.project-wrap', $self),
			init: function() {
				var _this = this;
				_this.prepare();
				_this.events();
				jQuery(window).resize(function() {
					_this.$el.trigger('resizeParallax');
				})
			},
			resize: function() {
				var _this = this;
				_this.prepare();
			},
			prepare: function() {
				var _this = this,
					maxHeight = 0,
					tempDelta = 0,
					ww = window.innerWidth;
				_this.active = false;
				if (ww > _this.options.minWidth) {
					_this.active = true;
					var $project = jQuery('.section-project'),
						$footer = jQuery(),
						bottom = $project.outerHeight(true),
						percentFooter;

					jQuery('.pi-parallax', _this.$projectWrap).each(function() {
						var wh = jQuery(window).height(),
							height = jQuery(this).innerHeight(),
							offsetTop = jQuery(this).offset().top,
							deltaY = wh - offsetTop,
							percent = 100,
							total;

						if (jQuery(this).data('percent') && parseInt(
								jQuery(this).data('percent')
							)) {
							percent = parseInt(jQuery(this).data('percent'));

						}
						total = (height - deltaY + bottom) * 100 / percent + jQuery(window).height();

						if (total > maxHeight) {
							maxHeight = total;
							percentFooter = percent;
							tempDelta = _this.$projectWrap.height() - height;
						}
					});

					if (jQuery('#wpadminbar').length) {
						maxHeight -= 32 * 100;
					}
					// $body.height(maxHeight);
					jQuery('.pi-parallax', _this.$el).each(function() {
						_this.setTransleateY(jQuery(this), 0);
					});
					_this.setTransleateY($footer, -tempDelta);
				} else {
					_this.active = false;
					_this.$el.css({
						position: '',
						width: ''
					});
					$body.css('height', '');
					jQuery('.pi-parallax', _this.$el).css('transform', '');
				}
			},
			events: function() {
				var _this = this;
				jQuery(window).scroll(function() {
					jQuery('.pi-parallax', _this.$el).each(function() {
						if (_this.active) {
							_this.enusScoll(jQuery(this));
						}
					})
				})
					.trigger('scroll');
				_this.$el.on('resizeParallax', function() {
					_this.resize();
				});
			},
			enusScoll: function($el) {
				var _this = this,
					defaults = {
						duration: 800,
						easing: 'easeOutExpo',
						percent: 100
					},
					options = $.extend(defaults, $el.data()),
					scrollTop = jQuery(window).scrollTop(),
					start = scrollTop,
					transform = $el.css('transform'),
					matrix = transform.replace(/[^0-9\-.,]/g, '').split(','),
					currentY = parseInt(matrix[13] || matrix[5]),
					targetY = -start * options.percent / 200,
					delta = targetY - currentY;
				if ($el.hasClass('banner')) {
					currentY = parseInt($el.css('top'));
					delta = targetY - currentY;
				}
				if ($el.data('delta')) {
					targetY = (-start) * options.percent / 100 - $el.data('delta');
					delta = targetY - currentY;
				}
				$el.stop().animate({
					prop: 1000
				}, {
					start: function(object) {},
					step: function(now, fx) {
						var positionY;
						positionY = currentY + delta * fx.pos;
						_this.setTransleateY($el, positionY);
					},
					progress: function(now, fx) {},
					complete: function() {
						_this.setTransleateY($el, targetY);
					},
					queue: true,
					duration: options.duration,
					easing: options.easing
				})
			},
			setTransleateY: function($el, y) {
				if ($el.hasClass('banner')) {
					if (typeof(y) == 'string') {
						$el.css({
							'top': ''
						});
					} else {
						y = parseFloat(y);
						$el.css({
							'top': y + 'px'
						});
					}
				} else {
					if (typeof(y) == 'string') {
						$el.css({
							'-webkit-transform': '',
							'-moz-transform': '',
							'-ms-transform': '',
							'-o-transform': '',
							'transform': ''
						});
					} else {
						y = parseFloat(y);
						$el.css({
							'-webkit-transform': 'translateY(' + y + 'px)',
							'-moz-transform': 'translateY(' + y + 'px)',
							'-ms-transform': 'translateY(' + y + 'px)',
							'-o-transform': 'translateY(' + y + 'px)',
							'transform': 'translateY(' + y + 'px)'
						});
					}
				}
			}
		};
		return UntoldScroll.init();
	};


	//================================================
	// Count Down
	//================================================
	jQuery('[data-countdown]').each(function() {
		var $this = jQuery(this), finalDate = jQuery(this).data('countdown');
		$this.countdown(finalDate, function(event) {
			$this.html(event.strftime('%Dd %Hh %Mm %Ss'));
		});
	});


	//================================================
	// Biography
	//================================================
	jQuery(function () {
		if(jQuery('.biography').hasClass('biography-03')) {
			if (jQuery(window).width() > 768) {
				var followScroll = jQuery(".follow-scroll");

				var $sidebar = followScroll,
					$sidebarH = followScroll.height(),
					$sidebarW = followScroll.width(),
					$maxScroll = jQuery(".max-scroll").height(),
					$window = jQuery(window),
					offset = $sidebar.offset(),
					topPadding = 100;

				$window.scroll(function () {
					if ($window.scrollTop() > offset.top - 100) {
						$sidebar.addClass('follow-scroll-active').removeClass('follow-scroll-bottom');
					} else {
						$sidebar.removeClass('follow-scroll-active');
						$sidebar.stop().css({
							top: 0,
							width: $sidebarW
						});
					}
					if ($window.scrollTop() > offset.top + $maxScroll - topPadding - $sidebarH) {
						$sidebar.removeClass('follow-scroll-active').addClass('follow-scroll-bottom');
						$sidebar.stop().css({top: $maxScroll - $sidebarH});
					} else {
						$sidebar.stop().css({top: topPadding});
					}
				});
			}
		}
	});


	//================================================
	// Albums
	//=================================================
	jQuery(".item-album-full-width-bg-img").each(function() {
		var imgbg = jQuery(this).find('img').attr('src');
		jQuery(this).children('.ct-bg-img').css('background-image', 'url(' + imgbg + ')');
	});


	//================================================
	// Event
	//=================================================
	jQuery(document).on('mouseenter','.events-02 .item-event', function () {
		jQuery(this).prev().addClass('hover');
		jQuery(this).addClass('hover');
		jQuery(this).next().addClass('hover');
	}).on('mouseleave','.events-02 .item-event',  function(){
		jQuery(this).prev().removeClass('hover');
		jQuery(this).removeClass('hover');
		jQuery(this).next().removeClass('hover');
	});


	//================================================
	// jPlayer
	//=================================================

	jQuery('.btn-playlist').on('click', function(){
		jQuery(this).toggleClass('active');
		jQuery('.playlist-wrap').fadeToggle('open');
		$body.toggleClass('playlist-full-page');
	});


	//================================================
	// Slider Horizontal
	//=================================================
	/* Basic Navigation */
	jQuery(function() {
		var $frame = jQuery('#basic');
		var $slidee = $frame.children('ul').eq(0);
		var $wrap = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			pagesBar: $wrap.find('.pages'),
			activatePageOn: 'click',
			speed: 500,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			forward: $wrap.find('.forward'),
			backward: $wrap.find('.backward'),
			prev: $wrap.find('.prev'),
			next: $wrap.find('.next'),
			prevPage: $wrap.find('.prevPage'),
			nextPage: $wrap.find('.nextPage')
		});

		// To Start button
		$wrap.find('.toStart').on('click', function() {
			var item = jQuery(this).data('item');
			// Animate a particular item to the start of the frame.
			// If no item is provided, the whole content will be animated.
			$frame.sly('toStart', item);
		});

		// To Center button
		$wrap.find('.toCenter').on('click', function() {
			var item = jQuery(this).data('item');
			// Animate a particular item to the center of the frame.
			// If no item is provided, the whole content will be animated.
			$frame.sly('toCenter', item);
		});

		// To End button
		$wrap.find('.toEnd').on('click', function() {
			var item = jQuery(this).data('item');
			// Animate a particular item to the end of the frame.
			// If no item is provided, the whole content will be animated.
			$frame.sly('toEnd', item);
		});

		// Add item
		$wrap.find('.add').on('click', function() {
			$frame.sly('add', '<li>' + $slidee.children().length + '</li>');
		});

		// Remove item
		$wrap.find('.remove').on('click', function() {
			$frame.sly('remove', -1);
		});
	}());

	/* Centered Navigation */
	jQuery(function() {
		var $frame = jQuery('#centered');
		var $wrap = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'centered',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 4,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			prev: $wrap.find('.prev'),
			next: $wrap.find('.next')
		});
	}());

	/* Force Centered Navigation */
	jQuery(function() {
		var $frame = jQuery('#forcecentered');
		var $wrap = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'forceCentered',
			smart: 1,
			activateMiddle: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			prev: $wrap.find('.prev'),
			next: $wrap.find('.next')
		});
	}());

	/* Cycle By Items */
	jQuery(function() {
		var $frame = jQuery('#cycleitems');
		var $wrap = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Cycling
			cycleBy: 'items',
			cycleInterval: 1000,
			pauseOnHover: 1,

			// Buttons
			prev: $wrap.find('.prev'),
			next: $wrap.find('.next')
		});

		// Pause button
		$wrap.find('.pause').on('click', function() {
			$frame.sly('pause');
		});

		// Resume button
		$wrap.find('.resume').on('click', function() {
			$frame.sly('resume');
		});

		// Toggle button
		$wrap.find('.toggle').on('click', function() {
			$frame.sly('toggle');
		});
	}());

	/* Cycle By Pages */
	jQuery(function() {
		var $frame = jQuery('#cyclepages');
		var $wrap = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			pagesBar: $wrap.find('.pages'),
			activatePageOn: 'click',
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Cycling
			cycleBy: 'pages',
			cycleInterval: 1000,
			pauseOnHover: 1,
			startPaused: 1,

			// Buttons
			prevPage: $wrap.find('.prevPage'),
			nextPage: $wrap.find('.nextPage')
		});

		// Pause button
		$wrap.find('.pause').on('click', function() {
			$frame.sly('pause');
		});

		// Resume button
		$wrap.find('.resume').on('click', function() {
			$frame.sly('resume');
		});

		// Toggle button
		$wrap.find('.toggle').on('click', function() {
			$frame.sly('toggle');
		});
	}());

	/* One Item Per Frame */
	jQuery(function() {
		var $frame = jQuery('#oneperframe');
		var $wrap = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'forceCentered',
			smart: 1,
			activateMiddle: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			prev: $wrap.find('.prev'),
			next: $wrap.find('.next')
		});
	}());

	/* Crazy */
	jQuery(function() {
		var $frame = jQuery('#crazy');
		var $slidee = $frame.children('ul').eq(0);
		var $wrap = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 3,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			pagesBar: $wrap.find('.pages'),
			activatePageOn: 'click',
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			forward: $wrap.find('.forward'),
			backward: $wrap.find('.backward'),
			prev: $wrap.find('.prev'),
			next: $wrap.find('.next'),
			prevPage: $wrap.find('.prevPage'),
			nextPage: $wrap.find('.nextPage')
		});

		// To Start button
		$wrap.find('.toStart').on('click', function() {
			var item = jQuery(this).data('item');
			// Animate a particular item to the start of the frame.
			// If no item is provided, the whole content will be animated.
			$frame.sly('toStart', item);
		});

		// To Center button
		$wrap.find('.toCenter').on('click', function() {
			var item = jQuery(this).data('item');
			// Animate a particular item to the center of the frame.
			// If no item is provided, the whole content will be animated.
			$frame.sly('toCenter', item);
		});

		// To End button
		$wrap.find('.toEnd').on('click', function() {
			var item = jQuery(this).data('item');
			// Animate a particular item to the end of the frame.
			// If no item is provided, the whole content will be animated.
			$frame.sly('toEnd', item);
		});

		// Add item
		$wrap.find('.add').on('click', function() {
			$frame.sly('add', '<li>' + $slidee.children().length + '</li>');
		});

		// Remove item
		$wrap.find('.remove').on('click', function() {
			$frame.sly('remove', -1);
		});
	}());


	//================================================
	// Menu
	//=================================================
	var $containPrimary   = '#menu-page',
		$buttonToggle	 = '.button-menu-page',
		$activeToggle	 = 'active',

		$effect_perspective_contain   = '.effect-perspective-rotateleft #page-wrap',
		$effect_perspective_animate   = '.animate',
		$effect_perspective_modalview = '.modalview';


	jQuery('.server-details-button').on('click', function () {
		jQuery($buttonToggle).addClass('active');
		jQuery('#server-details').addClass('active');

		if($body.hasClass('content-always-black')) {
			$body.addClass('menu-page-active');
		} else if($body.hasClass('content-white')) {
			$body.addClass('menu-page-active');
		} else if($body.hasClass('content-black')) {
			$body.addClass('menu-page-active');
		}

		jQuery('.effect-perspective-rotateleft #page-wrap').addClass('modalview animate');
	})

	jQuery('.open-menu').on('click', function () {
		jQuery($buttonToggle).trigger('click')
	})

	jQuery($buttonToggle).on('click', function () { 
		if (jQuery($buttonToggle).hasClass('active') && jQuery('#server-details').hasClass('active')) {
				jQuery(this).removeClass('active');
				jQuery('#server-details').removeClass('active');

				if($body.hasClass('content-always-black')) {
					$body.removeClass('menu-page-active');
				} else if($body.hasClass('content-white')) {
					$body.removeClass('menu-page-active');
				} else if($body.hasClass('content-black')) {
					$body.removeClass('menu-page-active');
				}

				jQuery('.effect-perspective-rotateleft #page-wrap').removeClass('animate');
				setTimeout(function() {
					jQuery('.effect-perspective-rotateleft #page-wrap').removeClass('modalview');
				}, 350);
		} else if (jQuery($buttonToggle).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('#menu-page').removeClass('active');

			if($body.hasClass('content-always-black')) {
				$body.removeClass('menu-page-active');
			} else if($body.hasClass('content-white')) {
				$body.removeClass('menu-page-active');
			} else if($body.hasClass('content-black')) {
				$body.removeClass('menu-page-active');
			}

			jQuery('.effect-perspective-rotateleft #page-wrap').removeClass('animate');
			setTimeout(function() {
				jQuery('.effect-perspective-rotateleft #page-wrap').removeClass('modalview');
			}, 350);
		} else {
			jQuery(this).addClass('active');
			jQuery('#menu-page').addClass('active');

			if($body.hasClass('content-always-black')) {
				$body.addClass('menu-page-active');
			} else if($body.hasClass('content-white')) {
				$body.addClass('menu-page-active');
			} else if($body.hasClass('content-black')) {
				$body.addClass('menu-page-active');
			}

			jQuery('.effect-perspective-rotateleft #page-wrap').addClass('modalview animate');
		}
	});

	jQuery('.ct-wrap').on('click', function () {
		jQuery(this).removeClass($activeToggle );
		jQuery($containPrimary).removeClass($activeToggle );
		$body.removeClass('menu-page-active content-white').addClass('content-black');
		jQuery($effect_perspective_contain).removeClass($effect_perspective_animate);
		setTimeout(function() {
			jQuery($effect_perspective_contain).removeClass($effect_perspective_modalview);
		}, 350);
	});

	jQuery(".ct-list-menu menu-item-has-children > a").on('click', function( event ) {
		event.preventDefault();
	});

	if (jQuery(window).width() > 768) {
		jQuery(".menu-01 .ct-list-menu a").on('mouseenter mouseleave click', function(e){
			if (e.type == "mouseenter") {
				jQuery(this).parent().parent('ul').find('> li').removeClass('active open');
				if(jQuery(this).parent().hasClass('menu-item-has-children')) {
					jQuery(this).parent().addClass('active open');
				}
			} else if (e.type == "click") {
				jQuery(this).parent().parent('ul').find('> li').removeClass($activeToggle );
			}
		});

		jQuery(".menu-01 .ct-list-menu menu-item-has-children a").on('mouseleave', function(){
			jQuery(this).parent('ul').find('> li').removeClass('active open');
		});

		jQuery(".menu-04 .ct-list-menu a").on('mouseenter mouseleave click', function(e){
			if (e.type == "mouseenter") {
				jQuery(this).parent().parent('ul').find('> li').removeClass('active open');
				if(jQuery(this).parent().hasClass('menu-item-has-children')) {
					jQuery(this).parent().addClass('active open');
				}
			} else if (e.type == "click") {
				jQuery(this).parent().parent('ul').find('> li').removeClass($activeToggle);
			}
		});

		jQuery(".menu-04 .ct-list-menu menu-item-has-children").on('mouseleave', function(){
			jQuery(this).parent('ul').find('> li').removeClass('active open');
		});
	}
	else {
		jQuery(".menu-01 .ct-list-menu a").on('click', function(){
			if(jQuery(this).parent().hasClass('menu-item-has-children')) {

			}
		});

		jQuery(".menu-04 .ct-list-menu a").on('click', function(){
			if(jQuery(this).parent().hasClass('menu-item-has-children')) {

			}
		});
	}

	setTimeout(function() {
		jQuery(".untold-play").trigger('click');
	},10);
	
	playerPlayOne.init();

    jQuery('.hide-player-button').on('click',function(){

        jQuery('.main-music-player').toggleClass('hide-player');

    });

    jQuery(window).scroll(function(){

        var aS = jQuery(window).scrollTop(),
            wH = jQuery(window).height(),
            dH = jQuery(document).height(),
            pM = jQuery('.main-music-player');

        if ( aS >= ( dH - wH ) ) {

            pM.addClass('hide-player-footer');

        } else {

            pM.removeClass('hide-player-footer');

        }

    });
	
});


//================================================
// Window load function
//=================================================
jQuery(window).on('load', function(){
	var $containParallax = jQuery('.albums-05');
	var $elementParallax = jQuery('.pi-parallax');

	if ($elementParallax.length > 0) {
		jQuery($containParallax).untoldScroll();

		return false;
	}
});
