(function() {

// cache some commonly used jQuery objects
	var $centerDiv = $(".center-h");
	var $tagline = $("#tagline");
	var $aboutInfo = $("#about-info");
	var $finderSearch = $("#finder-search");
	var $clubListing = $("#club-listing");
	var $body = $('body');
	var hidden = $("#hidden-box");
	var $showList, $listing, $clubHead, title, $line;

/* Page Object
================== */ 
	var pages = [
			{
				"title" : "About",
				"image"	: "about-bg.jpg",
				"info"	: "The Active campaign's goal is to fight childhood obesity. We believe that by getting childern active in sports and exercising rather then infront of a screen it can have a direct impact and decrease the obesity percentage. Active's solution to combat the issue is to provide a centeral website and application that would surrounding area's local sports and activity clubs.",
				"info2"	: "To become a sponsor or get more information on the active campaign please email info@activekids.com."
			},
			{
				"title" : "Home",
				"image"	: "homeimg.jpg"
			},
			{
				"title" : "Pick a Sport"
			},
			{
				"title" : "Find",
				"image"	: "find-bg.jpg"
			},
			{
				"title" : "Share",
			}

		]
/* Page Object and Image caching 
================================ */

	// Home Page
	var home = pages[1];
	var homeBg = home.image;
	// About Page
	var about = pages[0];
	var aboutBg = about.image;
	// Find Page
	var find = pages[3];
	var findBg = find.image;
	// Story page 
	var stories = pages[4];



/* Functions 
================ */

// Utiltity log
function log(msg) {
	console.log(msg);
}

// Dynamicly control title
function titleChange(obj) {
	$('title').text("Active" + " | " + obj.title)
}

// Controls landing page Acitve and tagline fades
function nameAndTagFade() {

// mouseover needs to change to fade loop
	title  = document.getElementsByTagName("title")[0].innerHTML;
	log(title);
	log("this is going on");
	}

// Controls the fading on pages
function bodyFade(obj) {
	$('body').fadeOut(1100,function(){
		var $tagline = $('#tagline');
		$this = $(this);
		$this.css("background-image", "url(images/" + obj + ")");
		$this.fadeIn(1200);
		$tagline.hide();
	});
}

// page fade actions

function pageFade(obj) {
	bodyFade(obj);
	$centerDiv.fadeOut(700, function() {
		$tagline.fadeOut(700);
	});
	// Needs to be changed to fadout(700);
}

// Put line above active page

function activePage(elem) {
	elem.css("border-top", "1px solid white").css("padding-top", "8px")
}

// Deactive Page, get rid of line 
function deactivePage(ary) {
	var i;
	for(i = 0; i < ary.length; i++) {
		ary[i].css("border-top", "none");
	}
}

// Function helper for event loop
function finderHelper(n,data){
		$(".listing").fadeIn(1000);
		$clubHead.fadeIn(1000);
		for(var i = 0; i < data.zips[n].clubs.length; i++) {
			$clubListing.append("<a target='_blank' href='http://www.valleyymca.org/index.cfm?'<li class='list-show'>" + data.zips[n].clubs[i] + "</li></a>");
		}
		log(data.zips[n].clubs.length);
}

// Dynamicly upate with zip code on find page
function findLoop(value,data,callback) {
	$listShow = $('.list-show');
	$clubHead = $("#club-header");
	console.log(value);
	if (value === "85225") {
		finderHelper(0,data);
	} else if (value === "85280") {
		finderHelper(1,data);
	} else if (value === "85210") {
		finderHelper(2,data);
	} else {
		$(".listing").fadeOut(500,function() {
			$listShow.remove();
		});
		$clubHead.fadeOut(500);
	}
}

function findByZip() {
	$("input").keyup(function() {
    var value = $(this).val();
		
		$.getJSON('js/zip.json', function(data) {
			// Zip code event loop
			findLoop(value,data,function(){});
			}); // getJSON
  }).keyup();
}

// Fade listing out
function listingOut() {
	$listing = $(".listing");
	$listing.fadeOut(1000);
}

var changeA = function(bool) {
	var a = $("a");
	if(bool === true) {
		a.css("color", "black");
	} else {
		a.css("color","white");
	}
}

var loopText = function() {
	$clubHead = $("#club-header");

	var t = $('title').text();


};

var sportFade = function(mainElem, fadeElem) {
	mainElem.hover(function() {
		fadeElem.css("color", "black");
	}, function() {
		fadeElem.css("color", "white");
	})
}

setInterval(function(){loopText()},8000)


// Git rid out subheading and extra about info stuff
function removeAbout() {
	$(".about-info2").hide();
	$("#sponsers").hide();
	$("#about-heading").hide();
	$aboutInfo.hide();
}

function removeVideo() {
	$('#videowraper').remove();
}

function removeSponsers2() {
	$("#sponsers2").fadeOut(1000);
}

function removeIcons() {
	$(".sports").hide();
	$(".sports-2").hide();
}


// Click on logo (home)
$("#logo-img").on('click', function(e) {
	e.preventDefault();
	hidden.hide();
	changeA(false);
	titleChange(home);
	// pass page object with image attribute to change background image
	bodyFade(homeBg);
	// Fade in center Div
	$centerDiv.fadeIn(2400);
	// Init homepage fader
	deactivePage([$("#about-nav"), $("#find-nav"), $('#stories-nav')]);
	$('#finder-search').fadeOut(2000);
	listingOut();
	// Sim REST HTTP request
	console.log('GET /home');
	loopText(function(){});
	$finderSearch.hide();
	$clubHead.is(":visible") ? $clubHead.hide() : log($clubHead);
	$clubListing.is(":visible") ? $clubListing.hide() : log($clubListing);
	removeAbout();
	removeVideo();
	removeSponsers2();
	removeIcons();

	});



// When click on about
	$("#about-nav").on('click', function(e) {
		e.preventDefault();
		titleChange(about);
		$clubHead.hide();
		// pass page object with image attribute to change background image
		bodyFade(aboutBg);
		// Addition actions
		$centerDiv.fadeOut(700);
		changeA(false);
		$tagline.css("display", "none");
		activePage($(this));
		console.log('GET /about');
		$aboutInfo.text(about.info).fadeIn(3000);
		$(".about-info2").fadeIn(3000);
		$finderSearch.fadeOut(2000);
		deactivePage([$("#find-nav"), $("#stories-nav")]);
		listingOut();
		$clubHead.hide();
		$clubListing.hide();
		$("#sponsers").fadeIn(3000);
		$("#about-heading").fadeIn(3000);
		removeVideo();
		removeSponsers2();
		removeIcons();
		hidden.hide();
	});

// When click find nav

	$('.find-n').on('click', function(e) {
		title  = document.getElementsByTagName("title")[0].innerHTML;
		changeA(false);
		log(title);
		$clubHead = $("#club-header");
		$listing = $(".listing");
		e.preventDefault();
		
		console.log('GET /find');	
		titleChange(find)	
		// pass page object with image attribute to change background image
		// Hide fader
		pageFade(findBg);
		$finderSearch.fadeIn(3400);
		activePage($(this));
		deactivePage([$("#about-nav"), $('#stories-nav')]);
		// If the ul is visible, then fadout it out, else fide it in
		$clubListing.is(':visible') ? $clubListing.fadeOut(2000) : $clubListing.fadeIn(2000);
		if ($("input").val().length === 5 && !$("input").val().NaN) {
			$clubHead.fadeIn(3000);
		}
		removeAbout();
		removeVideo();
		removeSponsers2();
		removeIcons();


	});

// When click on stories

$("#stories-nav").on('click', function(e) {
	var $body = $('body');
	e.preventDefault();
	log("GET /stories");
	$tagline.hide();
	$(".center-h").hide();
	$clubHead.hide();
	titleChange(stories);
	changeA(false);
	$("body").css("background-image", "none");
	activePage($(this));
	$("video").fadeIn(4000);
	removeAbout();
	$finderSearch.hide();
	$("#sponsers2").before("<div id='videowraper'><video id='video' src='video/videoHD.mp4'autoplay loop preload></video></div>");
	$('video').fadeIn(100);
	$("#sponsers2").fadeIn(1000);
	deactivePage([$("#about-nav"), $("#find-nav")]);
	removeIcons();
	hidden.hide();
	$clubListing.hide();
})

// When click on find nav redux 
$("#find-nav").on("click", function(e) {
	var basket = $("#basket");
	var bask = $(".b"); 
	var soccer = $("#soccer");
	var soc = $(".s");
	var football = $("#football");
	var foot = $(".f");
	var volley = $("#volley");
	var v = $(".v");
	var base = $("#baseball");
	var bay = $(".ba");
	var ten = $("#tenis");
	var t = $(".t");
	e.preventDefault();
	hidden.hide();
	log("GET /find");
	changeA(true);
	$tagline.hide();
	$(".center-h").hide();
	$clubHead.hide();
	titleChange(stories);
	$("body").css("background-image", "none");
	$(".sports").fadeIn(3000);
	$(".sports-2").fadeIn(3000);
	sportFade(basket, bask);
	sportFade(soccer, soc);
	sportFade(football, foot);
	sportFade(volley, v);
	sportFade(base, bay);
	sportFade(ten, t);
	removeAbout();
	removeVideo();
	removeSponsers2();
	$clubHead.hide();
	$clubListing.hide();
	$finderSearch.hide();

})

// toogle search box

$("#toggle-x").on('click', function() {

	$finderSearch.hide();
	hidden.fadeIn(1000);
})

hidden.on("click", function() {
	$(this).hide();
	$finderSearch.fadeIn(1000);
});


function hovering() {
	var a = $("#about-nav");
	var b = $("#find-nav");
	var c = $("#stories-nav");
	a.hover(function(e) {
		a.css("border-top", "1px solid white");
	}, function() {
		a.css("border", "none")
	});

	b.hover(function(e) {
		b.css("border-top", "1px solid white");
	}, function() {
		b.css("border", "none")
	});

	c.hover(function(e) {
		c.css("border-top", "1px solid white");
	}, function() {
		c.css("border", "none")
	})
}

hovering();



findByZip();


})();