
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
});

$.fn.scrollStopped = function(callback) {
  var that = this, $this = $(that);
  $this.scroll(function(ev) {
    clearTimeout($this.data('scrollTimeout'));
    $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
  });
};


const mSize = 1280;
var winWidth = $(window).width(), 
    winHeight = $(window).height(),
    resizeTimer,
    resizeTimer2,
    startOffset = isMobile() ? "100%" : "80%";

function isMobile(){
  var UserAgent = navigator.userAgent;
  if (UserAgent.match(/iPhone|iPad|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
  {
    return true;
  }else{
    // Ipad Safari Browser
    if ( detectIpad() ) {
      return true;
    }else {
      return false;
    } 
  }
}

function detectIpad() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	// Lying iOS13 iPad
	if (userAgent.match(/Macintosh/i) !== null && getWindowWidth () < 1025 ) {
		// need to distinguish between Macbook and iPad
		var canvas = document.createElement("canvas");
		if (canvas !== null) {
			var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			if (context) {
				var info = context.getExtension("WEBGL_debug_renderer_info");
				if (info) {
					var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
					if (renderer.indexOf("Apple") !== -1)
					return true;
				}
			}
		}
	}
	return false;
}

function gnbMenu(){
  var toggling = false;
  var obj = $('.gnb-sub');

  if($('.header-dim').length <= 0) $('.header').after('<div class="header-dim"></div>');

  function slidein(){
      $(obj).stop().slideDown(300, function(){
          showGnb = true
      });
  }
  function slideout(e){
    $(obj).stop().slideUp(300, function(e){
      showGnb = false
      $('.header').removeClass('on');
      });
  }

  $('.header').on('mouseover', function(e) {
    if($('.header .gnb, .header .gnb-sub ul').has(e.target).length){
      clearTimeout(toggling);
      $('.header').addClass('on');
      $('.header-dim').fadeIn();
      toggling = setTimeout(slidein, 300);
    }else{
      clearTimeout(toggling);
      toggling = setTimeout(slideout, 200);
    }
  });

  $('.header').on('mouseleave', function(e) {
    clearTimeout(toggling);
    toggling = setTimeout(slideout, 200);
  });

  $('.gnb-sub > .inner > ul > li').on('mouseover', function(e) {
    let index = $(this).index();
    $('.header .gnb li').removeClass('on');
    $('.header .gnb li').eq(index).addClass('on');
  });
  $('.gnb-sub > .inner > ul > li').on('mouseleave', function(e) {
    $('.header .gnb li').removeClass('on');
  });
}

function gnbMobile(){
  let init = function(){
    $('.gnb-sub > .inner-wrap > ul > li > ul').parents('li').addClass('has-menu');
  }();

  $('.header').off('mouseover');
  $('.header').off('mouseleave');
  $('.gnb-sub').attr('style', '');

  $('.menu-btn').on('click', function(){
    if(!$(this).hasClass('close')){
      $('body').css('overflow', 'hidden');
      $(this).addClass('close')
      $('.header').addClass('gnb-m-open');
      $('.gnb-sub').addClass('open');
    }else{
      $('body').css('overflow', '');
      $(this).removeClass('close')
      
      $('.gnb-sub').removeClass('open');
      setTimeout(function(){
        $('.header').removeClass('gnb-m-open');
      }, 400);
    }
  });

  $('.gnb-sub > .inner-wrap > ul > li .btn-tog').off();
  $('.gnb-sub > .inner-wrap > ul > li .btn-tog').on('click', function(){
    $('.gnb-sub > .inner-wrap > ul > li').removeClass('on');
    $('.gnb-sub > .inner-wrap > ul > li > ul').slideUp();
    let $menu = $(this).parents('.link').next('ul');
    if($menu.is(':hidden')){
      $(this).parents('li').addClass('on');
      $menu.slideDown();
    }else{
      $(this).parents('li').removeClass('on');
      $menu.slideUp();
    }
  });
  $('.gnb-sub > .inner-wrap > ul ul > li > a').on('click', function(){
    $('.menu-btn.close').click();
    $('.gnb-sub > .inner-wrap > ul > li').removeClass('on');
    $('.gnb-sub > .inner-wrap > ul > li > ul').hide();
  });
}


function scrollud(){
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = 0;
    $(window).on('scroll', function(){
    didScroll = true;
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollTop > 200) {
      $('.header').addClass('type2');
    }else{
      $('.header').removeClass('type2');
    }    
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
      return;
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('body').removeClass('scroll-up').addClass('scroll-down');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
        $('body').removeClass('scroll-down').addClass('scroll-up');
      }
    }
    lastScrollTop = st;
  }

}

function flotingMenu(){
  var top = $(window).scrollTop();
  $('.floting-menu .top-btn').on('click', function(){
      $(window).scrollTop(0);
      if($('.main-container-wrap').length > 0 && $('body').hasClass('pcload')) {
        $('.nav-dot-container .nav-dot').eq(0).click();
      }
      return false;
  });

  $(window).scroll(function(){
      top = $(window).scrollTop();

      if(top> $(window).height()) {
          $('.floting-menu').addClass('on');
      }else{
          setTimeout(function(){
              $('.floting-menu').removeClass('on'); 
          }, 300);
      }
  });
}


function mainWebScrollAni(){
  if(mainWebScrollAni.act || $('.main-container').length <= 0) return;
  mainWebScrollAni.act = true;

  let prevPage= 1;
  const helper = {
      getDelta(event) {
          if(event.wheelDelta) {
              return event.wheelDelta;
          } else {
              return -event.detail;
          }
      },
      throttle(method, delay, context) {
          let inThrottle = false;
          return function() {
            
              if (!inThrottle) {
                if($('.wrap').hasClass('last') && helper.getDelta(event) > 0) {
                  setTimeout(() => {
                    $('.wrap').removeClass('last');
                    $('body').removeClass('scroll-down')
                  }, 100);
                    return;
                }              
                  inThrottle = true;
                  method.apply(context, arguments);
                    if(prevPage == context.currentPageNumber && prevPage == context.totalPageNumber) {
                      
                      $('.wrap').addClass('last')
                      $('body').removeClass('scroll-up').addClass('scroll-down')
                    }else{
                      $('.wrap').removeClass('last')
                    }
                  
                  prevPage = context.currentPageNumber
                  setTimeout(() => {
                    inThrottle = false;
                  }, delay);
              }
          }
      },
      debounce(method, delay, context) {
          let inDebounce;
          return function() {
              clearTimeout(method.inDebounce);
              inDebounce = setTimeout(() => {
                  method.apply(context, arguments);
              }, delay);
          }
      }
  }
  class ScrollPages {
      constructor(currentPageNumber, totalPageNumber, pages){
          this.currentPageNumber = currentPageNumber;
          this.totalPageNumber = totalPageNumber;
          this.pages = pages;
          this.viewHeight = document.documentElement.clientHeight;
      }
      // mouseScroll(event) {
      //     let delta = helper.getDelta(event);
      //     if (delta < 0) {
      //         this.scrollDown();
      //     } else {
      //         this.scrollUp();
      //     }
      // }

      mouseScroll(event) {
        const activeSection = document.querySelector('.fullscreen-container .f-section.in-sight .content-scroll');
    
        if (activeSection) {
            const scrollTop = activeSection.scrollTop;
            const scrollHeight = activeSection.scrollHeight;
            const clientHeight = activeSection.clientHeight;
    
            if (event.deltaY > 0) { // Scroll Down
                if (scrollTop + clientHeight + 1 < scrollHeight) {
                    return; 
                } else {
                    this.scrollDown();
                }
            } else { // Scroll Up
                if (scrollTop > 0) {
                    return;
                } else {
                    this.scrollUp(); 
                }
            }
        } else {
            let delta = helper.getDelta(event);
            if (delta < 0) {
                this.scrollDown();
            } else {
                this.scrollUp();
            }
        }
    }

      scrollDown() {
          if (this.currentPageNumber !== this.totalPageNumber){
              this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
              this.currentPageNumber++;
              this.updateNav();
              this.textFadeInOut();
              document.querySelector('.in-sight').previousElementSibling.classList.remove('up-scroll');
              document.querySelector('.in-sight').previousElementSibling.classList.add('down-scroll');
              $('body').removeClass('scroll-up').addClass('scroll-down');;
              if(this.currentPageNumber > 1){
                // this.pages.style.top += document.querySelector('.footer').clientHeight
                $('.header').addClass('type2');
                $('.floting-menu').addClass('on');
              }else{
                $('.floting-menu').removeClass('on');
              }
          }
      }
      scrollUp() {
          if (this.currentPageNumber !== 1) {
              this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
              this.currentPageNumber--;
              this.updateNav();
              this.textFadeInOut();
              document.querySelector('.in-sight').classList.remove('down-scroll');
              document.querySelector('.in-sight').classList.add('up-scroll');
              $('body').removeClass('scroll-down').addClass('scroll-up');
              if(this.currentPageNumber <= 1){
                $('body').removeClass('scroll-up scroll-down');
                $('.header').removeClass('type2');
              }
          }
      }
      scrollTo(targetPageNumber) {
          while (this.currentPageNumber !== targetPageNumber) {
              if (this.currentPageNumber > targetPageNumber) {
                  this.scrollUp();
              } else {
                  this.scrollDown();
              }
          }
      }
      createNav() {
          const pageNav = document.createElement('div');
          pageNav.className = 'nav-dot-container';
          this.pages.appendChild(pageNav);
          for(let i=0; i < this.totalPageNumber; i++) {
              pageNav.innerHTML += '<p class="nav-dot"><span></span></p>';
          }
          const navDots = document.getElementsByClassName('nav-dot');
          this.navDots = Array.prototype.slice.call(navDots);
          this.navDots[0].classList.add('dot-active');
          this.navDots.forEach((e, index) => {
              e.addEventListener('click', event => {
                  this.scrollTo(index+1);
                  $('.wrap main-wrap last').removeClass('last');
                  this.navDots.forEach(e => {
                      e.classList.remove('dot-active');
                  });
                  e.classList.add('dot-active');
              });
          });
      }
      updateNav() {
          this.navDots.forEach(e => {
              e.classList.remove('dot-active');
          });
          this.navDots[this.currentPageNumber-1].classList.add('dot-active');
      }
      resize() {
        if(window.innerWidth < mSize) return;
          this.viewHeight = document.documentElement.clientHeight;
          this.pages.style.height = this.viewHeight + 'px';
          this.pages.style.top = -this.viewHeight * (this.currentPageNumber-1) + 'px';
      }
      textFadeInOut() {
          const containersDom = document.getElementsByClassName('f-section');
          let textContainers = Array.prototype.slice.call(containersDom);
          textContainers.forEach((e) => {
              e.classList.remove('in-sight');
          });
          let textContainerInSight = textContainers[this.currentPageNumber-1];
          textContainerInSight.classList.add('in-sight')
      }
      init() {
          let handleMouseWheel = helper.throttle(this.mouseScroll, 500, this);
          let handleResize = helper.debounce(this.resize, 500, this);
          this.pages.style.height = this.viewHeight + 'px';
          this.createNav();
          this.textFadeInOut();
          if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
              document.addEventListener('wheel', handleMouseWheel);
          } else {
              document.addEventListener('DOMMouseScroll', handleMouseWheel);
          }

          window.addEventListener('resize', function(){
            if(window.innerWidth < mSize){
              if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
                document.removeEventListener('wheel', handleMouseWheel);
              } else {
                  document.removeEventListener('DOMMouseScroll', handleMouseWheel);
              }
              mainWebScrollAni.act = false
              document.getElementById('all-pages').removeAttribute('style');
              // document.querySelector('.visual-txt').classList.remove('animated');
            }else{
              $(window).scrollTop(0);
            }
          });
          window.addEventListener('resize', handleResize);          

      }
  }

  var s = new ScrollPages(1,4,document.getElementById('all-pages'));
   s.init();
}

function mainMobileScrollAni(){
  if(mainMobileScrollAni.act || $('.main-container').length <= 0) return;
  mainMobileScrollAni.act = true;
  
  let container = document.querySelector('.main-visual');
  let startY;
  

  const helper = {
    getDelta(event) {
        if(event.wheelDelta) {
            return event.wheelDelta;
        } else {
            return -event.detail;
        }
    },
    throttle(method, delay, context) {
      let inThrottle = false;
      return function() {
          if (!inThrottle) {
              inThrottle = true;
              method.apply(context, arguments);
              setTimeout(() => {
                inThrottle = false;
              }, delay);
          }
      }
    }
  }  

  let handleMouseWheel = helper.throttle(function(event){
    if($('body').hasClass('pcload')) return;
    // let headerH = $('.header').height() - 1;
    let headerH = 0;
    let delta = helper.getDelta(event);
    let t = document.querySelector('.intro-work-desc-wrap').offsetTop - headerH;
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (delta < 0 && scrollTop < window.innerHeight - (headerH + 5)) {
      $('html, body').animate({scrollTop:t}, 500); 
      $('.header').addClass('type2');
    }else if(scrollTop <= 5){
      $('.header').removeClass('type2');
    }
  }, 500, this);

  if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
      document.addEventListener('wheel', handleMouseWheel);
  } else {
      document.addEventListener('DOMMouseScroll', handleMouseWheel);
  }  
  
  container.addEventListener('touchstart', function(e) {
    startY = e.touches[0].pageY;
    scrollTop = container.scrollTop;
  });
  
  container.addEventListener('touchend', function(e) {
    const y = e.changedTouches[0].pageY;
    const diff = y - startY;

    let headerH = 0;
    let t = document.querySelector('.intro-work-desc-wrap').offsetTop - headerH;
    if (diff < -5) { 
        $('html, body').animate({scrollTop:t}, 500); 
        $('.header').addClass('type2');
    } 
  });

  window.addEventListener('resize', function(){
    if(window.innerWidth >= mSize){
      mainMobileScrollAni.act = false;
    }
  });

  window.addEventListener('scroll', function(){
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > 10) {
      $('.header').addClass('type2');
    }else{
      $('.header').removeClass('type2');
    }    
  });
  
  function updateClasses() {
    var element = container.querySelector('.visual-txt')
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const halfWindowHeight = windowHeight / 2;

    if (rect.bottom < windowHeight * 0.2 || rect.top > windowHeight) {
      element.classList.remove('animated');
    } else if (rect.bottom >= halfWindowHeight && rect.top <= halfWindowHeight) {
      element.classList.add('animated');
    }
  }
  function handleScroll() {
    updateClasses();
  }
  window.addEventListener("scroll", handleScroll);
  updateClasses();

}

function triggerScrollObject () {
	$("[data-scroll]").each(function() {
    if($(window).width() > mSize && $(this).data('ani-case') == 'mobile') {
      $(this).removeAttr('data-scroll');
    }

    var $scrollElem = this;
		var scrollElemOffset = $(this).data("scroll-offset") ? $(this).data("scroll-offset") : startOffset;
        
    new Waypoint({
      element: $scrollElem,
      handler: function(direction) {
        if ( direction === "down" ) {
          $scrollElem.classList.add('animated');
        }else if ( direction === "up") {
          $scrollElem.classList.remove('animated');
        }
      },
      triggerOnce: false,
      offset: scrollElemOffset
    })
    
	});
}


function loadInit(){
  if($('.main-wrap').length > 0){
    $('html, body').addClass('main');
  }

  if(!$('html, body').hasClass('load')){
    setTimeout(function(){
      $(window).scrollTop(0);
      if($(".body-dim").length > 0){
        $(".body-dim").animate({"opacity":"0"}, 300,"easeInOutCubic",function  () {
          $(".body-dim").css("visibility", "hidden");
        });      
      }
    }, 100)
  }

  setTimeout(function(){
    $("html, body").addClass('load');

    if($(window).width() >= mSize){
      $("body").addClass('pcload');
    }else{
      $("body").addClass('mobileload');
      $(".main-visual.f-section").addClass('in-sight');
    }

  if(location.href.match('#')){
    let id = location.href.split('#')[1];
    setTimeout(function(){
      pageMove(id);
    }, 800)
    }
  }, 700);
}

let tswiper = undefined;
function tabSwiper(){
  if($('.tab-type1').length <= 0) return;

  if(tswiper != undefined){ 
    tswiper.destroy();
    tswiper = undefined;
  }

  tswiper = new Swiper(".tab-type1", {
      slidesPerView: 'auto',
      // centeredSlides: true,
  });  

  if(!tswiper.allowSlideNext) {
    $('.tab-type1').addClass('activated')
  }

  $('.tab-type1 li a').on('click', function(){
    let index = $(this).parents('li').index();
    tswiper.slideTo(index);

    $('.tab-type1 li').removeClass('on');
    $(this).parents('li').addClass('on');
  });
}


let gSwiper = undefined;
function geographicSwiper(){
  if($('.geographic-swiper').length <= 0) return;

  if(gSwiper != undefined){ 
    gSwiper.destroy();
    gSwiper = undefined;
  }

  const progressCircle = '<div class="autoplay-progress"><svg viewBox="0 0 48 48"> <circle cx="24" cy="24" r="20"></circle></svg>';
  gSwiper = new Swiper(".geographic-swiper", {
      // slidesPerView: 'auto',
      // centeredSlides: true,
      loop: true,
      autoplay: {
          delay: 3500,
          disableOnInteraction: false,
      },
      freeMode: false,
      slidesPerView: 1,
      pagination: {
        el: ".geographic-swiper .pagenation"
      },
      navigation: {
        nextEl: ".geographic-swiper .btn-next",
        prevEl: ".geographic-swiper .btn-prev",
      },
      on: {
        autoplayTimeLeft(s, time, progress) {
          if((!document.querySelector(".autoplay-progress"))) $('.swiper-pagination-bullet').wrap('<span class="bullet"></span>').after(progressCircle);
          // $('.swiper-pagination-bullet').after(progressCircle);

          if(document.querySelectorAll(".autoplay-progress").length > 0){
            document.querySelectorAll(".autoplay-progress svg").forEach(function(el){  
              el.style.setProperty("--progress", 1 - progress);
            });
          }
        }
      }      
  });  
}



function introWorkDesc(){
  if($('.intro-work-desc').length <= 0) return;
  $('.intro-work-desc li').each(function(){
    if($(this).find('.over').length <= 0){
      let clone = $(this).find('a').clone().addClass('over');
      $(this).append(clone);
    }
  })
}

function timeline(){
  if($(".timeline li").length <= 0 ) return;
  var items = $(".timeline li"),
  timelineHeight = $(".timeline ol").height(),
  greyLine = $('.default-line'),
  lineToDraw = $('.draw-line'),
  isScrolling;

  if(lineToDraw.length) {
    $(window).on('scroll', function () {
      var redLineHeight = lineToDraw.height(),
          greyLineHeight = greyLine.height(),
          windowDistance = $(window).scrollTop(),
          windowHeight = $(window).height() / 2,
          timelineDistance = $(".timeline").offset().top;
  
      if(windowDistance >= timelineDistance - windowHeight) {
        line = windowDistance - timelineDistance + windowHeight;
        
        if(line <= greyLineHeight) {
          lineToDraw.css({
            'height' : line + 15 + 'px'
          });
        }
      }else{
        lineToDraw.height(0);
      }
  
      function setline(){
        items.each(function(index){
          var bottom = lineToDraw.offset().top + lineToDraw.outerHeight(true);
          var circlePosition = $(this).offset();
          if(bottom > circlePosition.top) {				
            $(this).addClass('in-view');
          } else {
            $(this).removeClass('in-view');
          }
        });	        
      }
      setline();


      clearTimeout(isScrolling);
      isScrolling= setTimeout(function() {  
        setline();
      }, 350);
    });
  }
}

let aniing = false;
function pageMove(page){
  let tabH = $('.tab-type1').length > 0 ? $('.tab-type1').outerHeight() : 0;
  let headerH = $('[data-id='+page+']').offset().top < $(window).scrollTop() ? $('.header').height() : 0;
  let minus = tabH + headerH;
  let top = $('[data-id='+page+']').offset().top - (minus - 1);
  $('html, body').animate({'scrollTop': top}, 1000, function(){
    aniing = false;
    history.replaceState({}, null, location.pathname);
  });
}

function pageMoveSet(){
  $('.gnb-sub ul ul li a').on('click', function(){
    if(this.href.match('#')){
      let id = this.href.split('#')[1];
      setTimeout(function(){
        pageMove(id);
      }, 800);
    }
  });
}

function tabMenuScroll(){
  if($('.tab-type1').length <= 0) return;
  let $tab = $('.tab-type1');
  

  if($tab.length <= 0) return;
  $('.tab-type1 a').on('click', function(e){
    e.preventDefault();
    let $this = $(this);
    let id = $this.attr('data-tab');
    let $target =  $('[data-id='+id+']');
    let $siblings = $this.parents('li').siblings('').find('a');
    let pos =  $target.offset().top;

    

    $siblings.each(function(){
      $(this).parents('li').removeClass('on');
    });    
    $this.parents('li').addClass('on');

    aniing = true;
    pageMove(id);

    return false;
  });

  //scroll
  $(window).on('scroll', function(){
      if(aniing) return;
      let sct = $('html, body').scrollTop();
            
      $('[data-tab]').each(function(){
        let $this = $(this);
        let id = $this.attr('data-tab');
        let tabH = $('.tab-type1').length > 0 ? $('.tab-type1').outerHeight() : 0;
        let headerH = $('body').hasClass('scroll-up') ? $('.header').height() : 0;
        let minus = tabH + headerH;        
        let pos = $('[data-id='+id+']').offset().top - (minus);
        if(sct > pos) {
          $('[data-tab]').parent().removeClass('on');
          $('[data-tab='+id+']').parent().addClass('on');
          if(tswiper) tswiper.slideTo($('[data-tab='+id+']').parent().index())
        }else{
          $('[data-tab='+id+']').parent().removeClass('on');
        }
      })
  });
}



function toastOpen(text, type, callback){
  const $toast = $('<div class="toast-pop '+type+'" id="toast">' +
        '<div class="dim"></div>' +
          '<div class="toast-text"><i></i><span class="txt">'+ text +'</span><button type="button" class="close"></button></div>' +
    '</div>');

    if($('#toast').length > 0) return;

    $('body').append($toast);

    setTimeout(function(){
      $toast.addClass('on');
    }, 200);
    setTimeout(function(){
      $toast.removeClass('on');
    }, 1500);
    setTimeout(function(){
      $toast.remove()
    }, 2200);
    setTimeout(function(){
      if(callback) callback();
    }, 2500);
}

function inquiry(){
  if(inquiryForm.name.value == "" || inquiryForm.tel.value == "" || inquiryForm.mail.value == "" ) {
    toastOpen('필수 항목을 입력해주세요.', 'error');
    return false;  
  }else{
    toastOpen('문의사항 등록을 완료했어요.', 'check');
    return false;  
  }
  
}


window.addEventListener('load', function(){
  
  loadInit();
  triggerScrollObject();
  scrollud();
  introWorkDesc();
  timeline();
  flotingMenu();
  pageMoveSet();
  tabMenuScroll();
  geographicSwiper();

  if($(window).width() >= mSize){
    mainWebScrollAni();
    gnbMenu();
  }else{
    gnbMobile();
    mainMobileScrollAni();
    tabSwiper();
  }

  $(window).on('resize', function(){
  if($(window).width() != winWidth){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {       
        tabSwiper();
        timeline();
        if($(window).width() >= mSize){
            if($("body").hasClass('mobileload')){
              $('body-dim').show();
              location.reload();
            }
            
          }else{
            if($("body").hasClass('pcload')) {
              $('body-dim').show();location.reload();
            }
          }

      }, 0);
  }
  winWidth = $(window).width(), winHeight = $(window).height();
  });

});
