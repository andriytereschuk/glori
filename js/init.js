$(function(){
	function calcHeight() {
		var h = $(window).height();
		$(".mid").each(function() {
			var h2 = $(this).outerHeight();
			if (h>h2) {
				$(this).parent(".swiper-slide").css("height",h+"px").children(".mid").css("top",(h-h2)/2+"px");
			}
			else {
				$(this).parent(".swiper-slide").css("height",h2+"px").children(".mid").css("top",0);
			}
		});

		// modal

		$(".modal").css("height",h-120 + "px");
		$(".scroll-content").css("height",h-264 + "px");
		$(".content").mCustomScrollbar({theme:"dark"});
	};

	$(window).resize(function(){
		calcHeight();
	});
	calcHeight();

	var w = $(window).width();
	var sp;
	if (w>1280) {
		sp = 1000;
	}

	else {
		sp = 500;
	}

	var swiperParent = new Swiper('.swiper-parent',{
		mode:'vertical',
		speed: sp,
		slidesPerView: 'auto',
		simulateTouch: false,
		calculateHeight: true,
		mousewheelControl: true,
		keyboardControl: true,
		hashNav: true,

		onSwiperCreated: function(swiperParent){
			$("body").addClass("loaded");
		},

		onSlideChangeStart: function(swiperParent){
			var i = swiperParent.activeIndex;
			$("nav")
				.attr("class","")
				.addClass("page"+i)
				.find("a")
				.removeClass("active")
				.eq(i)
				.addClass("active");
			$(".hide-menu")
				.find("a")
				.removeClass("active")
				.eq(i)
				.addClass("active");
		}
	});

	// Nav a click

	$("nav ul li a").click(function(event){
		event.preventDefault();
		var i = $(this).parent("li").index();
		swiperParent.swipeTo(i, sp);
	});

	// Online offer

	$(".online-offer").click(function(event){
		event.preventDefault();
		swiperParent.swipeTo(5, sp);
	});

	// scroo to page 2

	$(".icon-arrow-down").click(function(event){
		event.preventDefault();
		swiperParent.swipeTo(1, sp);
	});		

	// Video
	var $video  = $("video"),
	$parent = $video.parent(),
	poster  = $video.attr("poster");
	// Disable for touch devices
	if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
		$video.remove();
	} else {
		video = $video.get(0);

		$video.find("source").each(function() {
			var $source = $(this);
			if (maxWidth = $source.attr("data-max-width")) {
				if ($(window).width() <= maxWidth) {
					$source.attr("src", $source.attr("data-src"));
					$source.attr("data-src", null);
				} else {
					$source.remove();
				}
			} else {
				$source.attr("src", $source.attr("data-src"));
				$source.attr("data-src", null);
			}
		});

		// Autoplay
		if ($video.attr("autoplay")) {
			$video.show();
			$video.get(0).play();
		}
	}
	// Responsive poster image
	poster && $parent.css("background-image", "url(" + poster + ")");	


	// Send message
	$(".send").click(function(event){
		event.preventDefault();
		var name = $("#name").val();
		var email = $("#email").val();
		var message = $("#message").val();
		var form = '1';

		$.ajax({
			type: "POST",
			url: "mail.php",
			data: {
				name: name,
				email: email ,
				message: message,
				form: form
			},
			success: function(data) {
				alert("Повідомлення відіслано");
			}
		});
	});


	// slider we are

	var swiperWhy = new Swiper('.swiper-why',{
		speed: 300,
		simulateTouch: false
	});

	// why-left a click

	$(".why-left a").click(function(event){
		event.preventDefault();
		if ($(this).hasClass("active")) {
			
		}
		else {
			$(".why-left a").removeClass("active");
			$(this).addClass("active");
			var i = $(this).index();
			swiperWhy.swipeTo(i, 300);
		}		
	});

	// akardion
	$(".akardion a").click(function(event){
		event.preventDefault();
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
		}
		else {
			$(".akardion a").removeClass("active");
			$(this).addClass("active");
		}
		calcHeight();
		swiperParent.reInit();			
	});

	// slider we are

	var swiperTest = new Swiper('.swiper-testimonials',{
		speed: 400,
		autoplay: 10000,
		loop: true,
		autoplayDisableOnInteraction: false,
		simulateTouch: false,

		onSwiperCreated: function(swiperParent){
			$(".timeline").addClass("go");
		},

		onSlideChangeStart: function(swiperParent){
			$(".timeline").removeClass("go");
		},

		onSlideChangeEnd: function(swiperParent){
			$(".timeline").addClass("go");
		}				
	});

	$("#left").click(function(event){
		event.preventDefault();
		swiperTest.swipePrev();		
	});

	$("#right").click(function(event){
		event.preventDefault();
		swiperTest.swipeNext();			
	});

	// Modal team
	$(".modal").css("z-index",-1);

	$(".icon-close-popup").click(function(e) {
		e.preventDefault();
		$(".modal").removeClass("modal-anim");
		setTimeout(function(){
			$(".modal").css("z-index",-1);
		},400);
	});

	$("#worker1-info").click(function(e) {
		e.preventDefault();
		$("#worker1").css("z-index",1);
		$("#worker1").addClass("modal-anim");
	});

	$("#worker2-info").click(function(e) {
		e.preventDefault();
		$("#worker2").css("z-index",1);
		$("#worker2").addClass("modal-anim");
	});

	// mobile menu
	$(".mobile-menu-opener").click(function(e) {
		e.preventDefault();
		$(".menu-mobile").addClass("menu-mobile-open");
	});

	$(".icon-close-white").click(function(e) {
		e.preventDefault();
		closeMobileMenu();
	});	

	function closeMobileMenu() {
		$(".menu-mobile").removeClass("menu-mobile-open");
	}

	$(".hide-menu a").click(function(e) {
		e.preventDefault();
		$(".hide-menu a").removeClass("active");
		$(this).addClass("active");
		var i = $(this).index();
		$("nav ul li").eq(i).children("a").click();
		closeMobileMenu();
	});		
});