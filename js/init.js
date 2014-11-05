$(function(){
	function calcHeight() {
		var h = $(window).height();
		$(".mid").each(function() {
			var h2 = $(this).outerHeight();
			if (h < 480) {
				if (h2 < 480) {
					$(this).parent(".swiper-slide").css("height","480px").children(".mid").css("top","0 !important");
				}
				else {
					$(this).parent(".swiper-slide").css("height",h2+"px").children(".mid").css("top",0);
				}
			}

			else {
				if (h>h2) {
					$(this).parent(".swiper-slide").css("height",h+"px").children(".mid").css("top",(h-h2)/2+"px");
				}
				else {
					$(this).parent(".swiper-slide").css("height",h2+"px").children(".mid").css("top",0);
				}
			}
		});

		// modal

		$(".modal").css("height",h-120 + "px");
		$(".scroll-content").css("height",h-264 + "px");
		$(".scroll-content").mCustomScrollbar({theme:"dark"});
	};

	window.addEventListener("resize", function() {
		calcHeight();
	}, false);

	window.addEventListener("orientationchange", function() {
		calcHeight();
	}, false);

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
		var form = 1;

		if (name == '') 
		{
			$("#name").addClass("error");
			form = 0;
		}

		if (email == '') 
		{
			$("#email").addClass("error");
			form = 0;
		}

		if (message == '') 
		{
			$("#message").addClass("error");
			form = 0;
		}				

		var reg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i); 
		if (!reg.test(email))
		{
			$("#email").addClass("error");
			form = 0;
		}

		if (form == 1)
		{
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
		}		
	});

	$("input,textarea").focus(function(){
		$(this).removeClass("error");
	});


	// slider we are

	var swiperWhy = new Swiper('.swiper-why',{
		speed: 300,
		simulateTouch: false,
		onSlideChangeEnd: function(swiperWhy){
			var i = swiperWhy.activeIndex;
			$(".why-left a").removeClass("active");
			$(".why-left a").eq(i).addClass("active");
		}
	});

	// why-left a click

	$(".why-left a").click(function(event){
		event.preventDefault();
		var w = $(window).width();
		var h = $(window).height();
		var i = $(this).index();

		if(w<640 || h < 580) {
			var h2 = $(this).children("span").html();
			var p = $(".swiper-why .swiper-wrapper .swiper-slide").eq(i).children(".why-inner").html();
			modal(h2,p);
		}

		else {
			$(".why-left a").removeClass("active");
			$(this).addClass("active");
			swiperWhy.swipeTo(i, 300);
		}		
	});

	// akardion
	$(".akardion a").click(function(event){
		event.preventDefault();
		var w = $(window).width();
		var h = $(window).height();
		if(w<640 || h < 580) {
			var h2 = $(this).children(".service-h").html();
			var p = $(this).next(".service-t").children(".service-inner").html();
			modal(h2,p);
		}

		else {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
			}
			else {
				$(".akardion a").removeClass("active");
				$(this).addClass("active");
			}
			calcHeight();
			swiperParent.reInit();			
		}
			
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
		$(".mobile-menu-opener").removeClass("opener-hide");
		$(".modal").removeClass("modal-anim");
		setTimeout(function(){
			$(".modal").css("z-index",-1);
		},400);
	});

	$(".profi1").click(function(e) {
		e.preventDefault();
		$(".mobile-menu-opener").addClass("opener-hide");
		$("#worker1").css("z-index",1);
		$("#worker1").addClass("modal-anim");
	});

	$(".profi2").click(function(e) {
		e.preventDefault();
		$(".mobile-menu-opener").addClass("opener-hide");
		$("#worker2").css("z-index",1);
		$("#worker2").addClass("modal-anim");
	});

	// mobile menu
	$(".mobile-menu-opener").click(function(e) {
		e.preventDefault();
		$(".menu-mobile").addClass("menu-mobile-open").animate({right: 0}, 300);
	});

	$(".icon-close-white").click(function(e) {
		e.preventDefault();
		closeMobileMenu();
	});	

	function closeMobileMenu() {
		$(".menu-mobile").animate({right: "-280px"}, 300, function(){
			$(".menu-mobile").removeClass("menu-mobile-open");
		});
	}

	$(".hide-menu a").click(function(e) {
		e.preventDefault();
		$(".menu-mobile").removeClass("menu-mobile-open");
		$(".menu-mobile").css("right","-280px");		
		$(".hide-menu a").removeClass("active");
		$(this).addClass("active");
		var i = $(this).index();
		$("nav ul li").eq(i).children("a").click();
	});

	// mobile popup
	function modal(h,p) {
		$("#modal .modal-h").html("").html(h);
		$("#modal .content").html("").html(p);
		$(".modal-content").mCustomScrollbar({theme:"dark"});
		$(".mobile-menu-opener").addClass("opener-hide");
		$("#modal").css("z-index",1);
		$("#modal").addClass("modal-anim");
	}	
});