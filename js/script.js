document.addEventListener('DOMContentLoaded', function(event) {
	
	function updatePaddingTop() {
	  const menuItems = document.querySelectorAll(".menu__left a[data-tab]");
	  if (menuItems && window.innerWidth > 1100) {
	    menuItems.forEach(function (menuItem) {
	      const dataTabValue = menuItem.getAttribute("data-tab");
	      const contentElements = document.querySelectorAll(`[data-content="${dataTabValue}"]`);
	      contentElements.forEach(function (contentElement) {
	        if(!contentElement.querySelector("span")){
		        const spanElement = document.createElement("span");
		        spanElement.textContent = getTextBeforeSymbol(menuItem.innerHTML);
	        	contentElement.appendChild(spanElement);
	        }
	        const spanEl = contentElement.querySelector("span");
	        const spanHeight = spanEl.offsetHeight;
	        const currentPaddingTop = 82;
	        const newPaddingTop = currentPaddingTop + spanHeight;
	        contentElement.style.paddingTop = `${newPaddingTop}px`;
	      });
	    });
	  }
	}
	function getTextBeforeSymbol(html) {
	  const match = html.match(/^[^<]*/);
	  return match ? match[0] : '';
	}


	updatePaddingTop();
	window.addEventListener("resize", updatePaddingTop);
	var menuItemHasSublist = document.querySelectorAll('.menu__item.has-sublist');
	if(menuItemHasSublist){
		menuItemHasSublist.forEach(function(menuItemHasSublist) {
		    menuItemHasSublist.addEventListener('mousemove', function(event) {
		    		event.preventDefault();
		    		document.querySelector('body').classList.add('black');
		    });
		    menuItemHasSublist.addEventListener('mouseleave', function(event) {
		    		event.preventDefault();
		    		document.querySelector('body').classList.remove('black');
		    });

		});
	}
	function handleScroll() {
		var header = document.querySelector('.header');
		var scroll = window.pageYOffset || document.documentElement.scrollTop;
    if (scroll > 1) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }
    var footer = document.querySelector('.footer');
    if(footer.getBoundingClientRect().top < 1800){
    	if(document.querySelector('.toup')){
    		document.querySelector('.toup').classList.add('active');
    	}
    }else{
    	if(document.querySelector('.toup')){
    		document.querySelector('.toup').classList.remove('active');
    	}    	
    }
	}
	handleScroll();
	window.addEventListener('scroll', handleScroll);

	var headerSearch = document.querySelector('.header__search');
  var headerSearchBody = document.querySelector('.header__search-body');
	headerSearchBody.addEventListener('click', function(event) {
	  headerSearch.classList.add('show');
	  headerSearch.closest('.header').classList.add('onSearch');
	  if (headerSearch.classList.contains('show')) {
	    headerSearch.querySelector('input').focus();
	  }
	});
	var searchClose = document.querySelector('.search__close');
	searchClose.addEventListener('click', function(event) {
	  headerSearch.classList.remove('show');
	  headerSearch.closest('.header').classList.remove('onSearch');
	});

	document.addEventListener('click', function(event) {
	  if (!headerSearch.contains(event.target)) {
	  	headerSearch.classList.remove('show');
	    headerSearch.closest('.header').classList.remove('onSearch');
	  }	  
	});

  var headerBurger = document.querySelector('.header__burger');
  var menu = document.querySelector('.menu');
  var body = document.querySelector('body');
	document.querySelector('.header__burger').addEventListener('click', function(event) {
	    headerBurger.classList.toggle('active');
	    menu.classList.toggle('active');
	    body.classList.toggle('lock');
	    if(document.querySelector('.menu__link.active')){
	    	document.querySelector('.menu__link.active').classList.remove('active');
	    }
	});
	var menuSublist = document.querySelectorAll('.menu__item.has-sublist>a');
	if(menuSublist){
		menuSublist.forEach(function(menuSublist) {
		    menuSublist.addEventListener('click', function(event) {
		    		event.preventDefault();
		    		menuSublist.classList.toggle('active');
		    });
		});
	}
	var menuMainItem = document.querySelectorAll('.menu-main__item');
	if(menuMainItem){
		menuMainItem.forEach(function(menuMainItem) {
		    menuMainItem.addEventListener('click', function(event) {
		    		event.preventDefault();
		    		menuMainItem.closest('.menu__item').querySelector('.menu__link').classList.remove('active');
		    });
		});
	}
 function moveElements() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1101) {
      const tabs = document.querySelectorAll('.menu__wrapper [data-tab]');
      tabs.forEach(tab => {
        const tabValue = tab.getAttribute('data-tab');
        const content = document.querySelector(`.menu__wrapper [data-content="${tabValue}"]`);
        if (content) {
          tab.parentNode.insertBefore(content, tab.nextSibling);
        }
      });
    }
  }
  window.addEventListener('load', moveElements);
  window.addEventListener('resize', moveElements);

	var menuLeftLinks = document.querySelectorAll('.menu__left>a[data-tab]');
	if(menuLeftLinks){
		menuLeftLinks.forEach(function(menuLeftLinks) {
		    menuLeftLinks.addEventListener('click', function(event) {
		    		event.preventDefault();
		    		if(window.innerWidth < 1101){
		    			menuLeftLinks.classList.toggle('arrow');
		    			slideToggle(menuLeftLinks.nextElementSibling);
		    		}
		        
		    });
		    const menuitem = menuLeftLinks.closest('.menu__item.has-sublist');
		    if (menuitem) {
		    	const sublistSvg = menuitem.querySelector('a svg');
		    	if (sublistSvg) {
		    		const clonedSvg = sublistSvg.cloneNode(true);
		    		menuLeftLinks.appendChild(clonedSvg);
		    	}
		    }
		});
	}

  const menuWrapLinks = document.querySelectorAll('.menu__wrap a img');
  if(menuWrapLinks){
	  menuWrapLinks.forEach(img => {
	    const altText = img.alt;
	    // const filteredAltText = altText.replace(/[^\x00-\x7F]/g, '');
	    const spanElement1 = document.createElement('b');
	    spanElement1.innerText = altText;
	    img.parentNode.insertBefore(spanElement1, img.nextSibling);
	  });
  }




	var tabsItems = document.querySelectorAll('.tabs [data-tab]');
	if(tabsItems){
		tabsItems.forEach(function(tabsItem) {
		    tabsItem.addEventListener('click', function(event) {
				    event.preventDefault();
				    var tabParent = this.closest('.tabs');
				    if (!tabParent) {
				        return; 
				    }
				    var tabActive = tabParent.querySelector('[data-tab].active');
				    var contentActive = tabParent.querySelector('[data-content].target');
				    if (tabActive) {
				        tabActive.classList.remove('active');
				    }
				    if (contentActive) {
				        contentActive.classList.remove('target');
				    }
				    this.classList.toggle('active');
				    const tabContent = this.getAttribute("data-tab");
				    const tabId = tabParent.querySelector(`[data-content="${tabContent}"]`);
					  if(tabId){
					  	var iframes = tabId.querySelectorAll('iframe[data-src]');
						  if(iframes){
							  iframes.forEach(function (iframe) {
							     iframe.setAttribute('src', iframe.getAttribute('data-src'));
							     iframe.removeAttribute('data-src');
							  });  	
						  }
						  var videos = tabId.parentNode.querySelectorAll('.company__video');
						  if(videos){
							  videos.forEach(function (videos) {
							     videos.querySelector('video').pause();
							  });  						  		
						  }					  	
					  }
				    if (tabId !== null) {
				        tabId.classList.add("target");
				    }
				    const tabName = this.getAttribute("data-name");
				    if(tabName){
				    	document.querySelector('[data-tabname]').innerHTML = tabName;
				    }

		    });
		});
	}

	var tabCertificate = document.querySelectorAll('.certificates__left [data-tab]');
	if(tabCertificate){
		tabCertificate.forEach(function(tabCertificate) {
		    tabCertificate.addEventListener('click', function(event) {
		    		event.preventDefault();
				    var certActive = document.querySelector('[data-content].show');
				    if (certActive) {
				    	 certActive.classList.remove('show');
				    }
				    const certContent = this.getAttribute("data-tab");
				    const certId = document.querySelector(`[data-content="${certContent}"]`);
				    
				    if (certId !== null && window.innerWidth <= 650) {
				        certId.classList.add("show");
				        document.querySelector('body').classList.add('certPopup');
				    }
		    });
		});
	}
	var closeCertificate = document.querySelectorAll('.certificates__wrapper>img, .certificates__body>p');
	if(closeCertificate){
		closeCertificate.forEach(function(closeCertificate) {
		    closeCertificate.addEventListener('click', function(event) {
		    		event.preventDefault();
		    		closeCertificate.closest('.certificates__body').classList.remove('show');
		    		document.querySelector('body').classList.remove('certPopup');
		    });
		});
	}
	var tabBrands = document.querySelectorAll('.brands__left [data-tab]');
	if(tabBrands){
		tabBrands.forEach(function(tabBrands) {
		    tabBrands.addEventListener('click', function(event) {
		    		event.preventDefault();
				    var brandActive = document.querySelector('[data-content].show');
				    if (brandActive) {
				    	 brandActive.classList.remove('show');
				    }
				    const brandContent = this.getAttribute("data-tab");
				    const brandId = document.querySelector(`[data-content="${brandContent}"]`);
				    
				    if (brandId !== null && window.innerWidth <= 760) {
				        brandId.classList.add("show");
				        document.querySelector('body').classList.add('certPopup');
				    }
		    });
		});
	}
	var closeBrand = document.querySelectorAll('.brands__wrapper>img, .brands__body>p');
	if(closeBrand){
		closeBrand.forEach(function(closeBrand) {
		    closeBrand.addEventListener('click', function(event) {
		    		event.preventDefault();
		    		closeBrand.closest('.brands__body').classList.remove('show');
		    		document.querySelector('body').classList.remove('certPopup');
		    });
		});
	}

	var menuBody = document.querySelectorAll('[data-tab]');
	function handleMenuClick(event) {
	    event.preventDefault();
	    var menuWrapper = this.closest('.menu__wrapper');
	    if (!menuWrapper) {
	        return; 
	    }
	    var activeTab = menuWrapper.querySelector('[data-tab].active');
	    var activeContent = menuWrapper.querySelector('[data-content].target');
	    if (activeTab) {
	        activeTab.classList.remove('active');
	    }
	    if (activeContent) {
	        activeContent.classList.remove('target');
	    }
	    this.classList.toggle('active');
	    const menuContent = this.getAttribute("data-tab");
	    const dataId = document.querySelector(`[data-content="${menuContent}"]`);
	    if (dataId !== null) {
	        dataId.classList.add("target");
	        updatePaddingTop();
	    }
	}

	function checkScreenWidth() {
	    if (window.innerWidth >= 1101) {
	        menuBody.forEach(function(menuBody) {
	            menuBody.removeEventListener('click', handleMenuClick);
	            menuBody.addEventListener('click', handleMenuClick);
	        });
	    } else {
	        menuBody.forEach(function(menuBody) {
	            menuBody.removeEventListener('click', handleMenuClick);
	        });
	    }
	}
	checkScreenWidth();
	window.addEventListener('resize', function() {
	    checkScreenWidth();
	});


	var servicesItem = document.querySelectorAll('.our-services__item');
	if(document.querySelector('.our-services__item span.active')){
		document.querySelector('.our-services__item span.active').style.maxHeight = document.querySelector('.our-services__item span.active').scrollHeight + 24 + 'px';
	}
	if(servicesItem){
		servicesItem.forEach(function(servicesItem) {
		    servicesItem.addEventListener('click', function(event) {
					  var slideableEl = document.querySelectorAll('.our-services__item');
					    slideableEl.forEach(function(slideableEl) {
					    if (slideableEl !== servicesItem && slideableEl.classList.contains('active')) {
					      slideableEl.classList.remove('active');
					    }
					  });
		    		servicesItem.classList.toggle('active');
		        slideToggle1(servicesItem.querySelector('span'));
		    });
		});
	}
	function slideToggle1(element) {
	  var target = element.style;
	  target.transition = 'all 0.3s ease-in-out';
	  var slideableElements = document.querySelectorAll('.our-services__item span');
	    slideableElements.forEach(function(item) {
	    if (item !== element && item.classList.contains('active')) {
	      var itemTarget = item.style;
	      itemTarget.maxHeight = null;
	      item.classList.remove('active');
	    }
	  });
	  if (target.maxHeight) {
	    target.maxHeight = null;
	    element.classList.remove('active');
	  } else {
	    target.maxHeight = element.scrollHeight + 'px';
	    element.classList.add('active');
	  }
	}


	function slideToggle(element) {
	  var target = element.style;
	  target.transition = 'all 0.3s ease-in-out';
	  if (target.maxHeight) {
	    target.maxHeight = null;
	    element.classList.remove('active');
	  } else {
	    target.maxHeight = element.scrollHeight + 'px';
	    element.classList.add('active');
	  }
	}

	var vacancySpoiler = document.querySelectorAll('.vacancy__spoiler-top');
	if(vacancySpoiler){
		vacancySpoiler.forEach(function(vacancySpoiler) {
		    vacancySpoiler.addEventListener('click', function(event) {
		    		vacancySpoiler.classList.toggle('active');
		    		vacancySpoiler.parentNode.classList.toggle('active');
		    		vacancySpoiler.nextElementSibling.classList.toggle('active');
		        slideToggle(vacancySpoiler.nextElementSibling);
		    });
		});
	}
	var faqTop = document.querySelectorAll('.faq__top');
	if(faqTop){
		faqTop.forEach(function(faqTop) {
		    faqTop.addEventListener('click', function(event) {
		    		faqTop.parentNode.classList.toggle('active');
		        slideToggle(faqTop.nextElementSibling);
		    });
		});
	}

	if(document.querySelector('.stages__slider')){
		const desktopBreakpoint = 761; 
		let swiperInstance;
		function handleSwiperInitialization() {
		  if (window.innerWidth >= desktopBreakpoint) {
		    if (swiperInstance) {
		      swiperInstance.destroy();
		      swiperInstance = null;
		    }
		  } else {
		    if (!swiperInstance) {
		      swiperInstance = new Swiper('.stages__slider', {
				      speed: 600,
				      spaceBetween: 8,
				      slidesPerView:1.1,
				      loop:false,
				      pagination: {
				        el: '.swiper-pagination',
				        type: 'fraction',
	
				      },
		      });
		    }
		  }
		}
		handleSwiperInitialization();
		window.addEventListener('resize', handleSwiperInitialization);		
	}
	if(document.querySelector('.service__swiper')){
		const desktopBreakpoint = 761; 
		let swiperInstance;
		function handleSwiperInitialization() {
		  if (window.innerWidth >= desktopBreakpoint) {
		    if (swiperInstance) {
		      swiperInstance.destroy();
		      swiperInstance = null;
		    }
		  } else {
		    if (!swiperInstance) {
		      swiperInstance = new Swiper('.service__swiper', {
				      speed: 600,
				      spaceBetween: 10,
				      slidesPerView:1.1,
				      loop:false,
				      pagination: {
				        el: '.service-pagination',
				        type: 'fraction',
				      },
		      });
		    }
		  }
		}
		handleSwiperInitialization();
		window.addEventListener('resize', handleSwiperInitialization);		
	}

  if(document.querySelector('.works__slider')){
      new Swiper('.works__slider', {
        speed: 600,
        spaceBetween: 24,
        slidesPerView: 2,
			  navigation: {
			    nextEl: '.works__next',
			    prevEl: '.works__prev',
			  },
		    breakpoints: {
		        1100: {
		            slidesPerView: 2,
		        },
		        650: {
		        		spaceBetween: 20,
		            slidesPerView: 1.2,
		        },		        
		        0: {
		        		spaceBetween: 16,
		            slidesPerView: 1.1
		        }		        
		    }
      });
   }

	const aboutustabs = document.querySelectorAll('.aboutus-tabs__content a');
	const indicator = document.getElementById('tab-indicator');
	if(aboutustabs.length){
		aboutustabs.forEach(aboutustabs => {
		    aboutustabs.addEventListener('click', () => {
		        updateIndicatorPosition(aboutustabs);
		        aboutustabs.parentNode.querySelector('a.active').classList.remove('active');
		        aboutustabs.classList.add('active');
		    });
		});
		function updateIndicatorPosition(aboutustabs) {
		    const tabRect = aboutustabs.getBoundingClientRect();
		    const contentRect = indicator.parentElement.getBoundingClientRect();
		    indicator.style.left = `${tabRect.left - contentRect.left}px`;
		    indicator.style.width = `${tabRect.width}px`;
		}
    setTimeout(function() {
    	updateIndicatorPosition(document.querySelector('.aboutus-tabs__content a.active'));	
    }, 500); 
	}


  if(document.querySelector('.reviews__swiper')){
      new Swiper('.reviews__swiper', {
        speed: 600,
        spaceBetween: 11,
        slidesPerView: 1,
			  navigation: {
			    nextEl: '.reviews__next',
			    prevEl: '.reviews__prev',
			  },
	      pagination: {
	        el: '.reviews-pagination',
	      },
		    breakpoints: {
		        751: {
		            autoHeight: false,
		        },	   
		        0: {
		            autoHeight: true,
		        }		        
		    }
      });
   }

	if(document.querySelector('.vacancy__left')){
		const desktopBreakpoint = 1101; 
		let swiperVacancy;
		function handleVacancyInitialization() {
		  if (window.innerWidth >= desktopBreakpoint) {
		    if (swiperVacancy) {
		      swiperVacancy.destroy();
		      swiperVacancy = null;
		    }
		  } else {
		    if (!swiperVacancy) {
		      swiperVacancy = new Swiper('.vacancy__left', {
				      speed: 600,
				      spaceBetween: 8,
				      slidesPerView:1.2,
				      loop:true,
				      centeredSlides:true,
		      });
		    }
		  }
		}
		handleVacancyInitialization();
		window.addEventListener('resize', handleVacancyInitialization);		
	}
	if(document.querySelector('.equipment-reviews .reviews__slider')){
		const swiperReviewsBreakpoint = 761; 
		let swiperReviews;
		function handleReviews() {
		  if (window.innerWidth >= swiperReviewsBreakpoint) {
		    if (swiperReviews) {
		    	for (var i = 0; i <= swiperReviews.length - 1; i++) {
		    		swiperReviews[i].destroy();
		    	}
		      swiperReviews = null;
		    }
		  } else {
		    if (!swiperReviews) {
		      swiperReviews = new Swiper('.equipment-reviews .reviews__slider', {
				      speed: 600,
				      spaceBetween: 29,
				      slidesPerView:2,
				      loop:false,
				      pagination: {
				        el: '.equipment-reviews .reviews-other__pagination',	
				      },
					    breakpoints: {
					        601: {
					            slidesPerView: 2,
					        },
					        501: {
					            slidesPerView: 1.8
					        },		   
					        0: {
					            slidesPerView: 1.3
					        }		        
					    }

		      });
		    }
		  }
		}
		handleReviews();
		window.addEventListener('resize', handleReviews);		
	}

	var filterItems = document.querySelectorAll('.portfolio__filter p');
	if(filterItems){
		filterItems.forEach(function(item) {
		  item.addEventListener('click', function(event) {
		    var i = item.getAttribute('data-filter');
		    if(i !== "all") {
			    var itemElements = document.querySelectorAll('.portfolio__item');
			    itemElements.forEach(function(item) {
			      item.style.display = 'none';
			    });    	
		      var filteredElements = document.querySelectorAll('.portfolio__item.f_' + i);
		      filteredElements.forEach(function(filteredItem) {
		        filteredItem.style.display = 'flex';
		      });
		    }
		    else{
			    var itemElements = document.querySelectorAll('.portfolio__item');
			    itemElements.forEach(function(item) {
			      item.style.display = 'flex';
			    });    	
		    }
		    filterItems.forEach(function(filterItem) {
		      filterItem.classList.remove('active');
		    });
		    item.classList.add('active');
		    document.querySelector('.portfolio__top').classList.remove('open');
		    document.querySelector('.portfolio__top span').innerHTML = item.innerHTML;
		  });
		});	
	}

	const portfolio__top = document.querySelector('.portfolio__top');
	if(portfolio__top){
		portfolio__top.addEventListener('click', function() {
				this.classList.toggle('open');		    
		});
		document.addEventListener('click', function(event) {
		  if (!document.querySelector('.portfolio__body').contains(event.target)) {
		    portfolio__top.classList.remove('open');
		  }	  
		});
	}


  if(document.querySelector('.gallery-swiper')){
      new Swiper('.gallery-swiper', {
        speed: 600,
        spaceBetween: 24,
        slidesPerView: 1,
			  navigation: {
			    nextEl: '.project__next',
			    prevEl: '.project__prev',
			  },
	      pagination: {
	        el: '.gallery-pagination',	
	      },

		    breakpoints: {
		        1100: {
		           spaceBetween: 24,
		        },
		        650: {
		        		spaceBetween: 20,
		        },		        
		        0: {
		        		spaceBetween: 16,
		        }		        
		    }
      });
   }


  if(document.querySelector('.solutions__slider')){
      new Swiper('.solutions__slider', {
        speed: 600,
        spaceBetween: 24,
        slidesPerView: 3,
			  navigation: {
			    nextEl: '.solutions__next',
			    prevEl: '.solutions__prev',
			  },
	      pagination: {
	        el: '.solutions__pagination',	
	      },

		    breakpoints: {
		        1100: {
		        	slidesPerView: 3,
		          spaceBetween: 24,
		        },
		        720: {
		        	slidesPerView: 2,
		        	spaceBetween: 20,
		        },		        
		        0: {
		        	slidesPerView: 1,
		        	spaceBetween: 16,
		        }		        
		    }
      });
   }
  if(document.querySelector('.rooms__slider')){
      new Swiper('.rooms__slider', {
        speed: 600,
        spaceBetween: 24,
        slidesPerView: 2,
			  navigation: {
			    nextEl: '.rooms__next',
			    prevEl: '.rooms__prev',
			  },
	      pagination: {
	        el: '.rooms__pagination',	
	      },

		    breakpoints: {
		        1100: {
		        	slidesPerView: 2,
		          spaceBetween: 24,
		        },
		        801: {
		        	slidesPerView: 1.5,
		        	spaceBetween: 20,
		        },		        
		        0: {
		        	slidesPerView: 1,
		        	spaceBetween: 16,
		        }		        
		    }
      });
   }


	var steps__row = document.querySelectorAll('.steps__row');
	if(steps__row){
		if(document.querySelector('.steps__row.active')){
			document.querySelector('.steps__row.active .steps__span').style.maxHeight = document.querySelector('.steps__row.active .steps__span').scrollHeight + 23 + 'px';
		}
		window.addEventListener('resize', function(){
			if(document.querySelector('.steps__row.active')){
				document.querySelector('.steps__row.active .steps__span').style.maxHeight = document.querySelector('.steps__row.active .steps__span').scrollHeight + 23+ 'px';
			}

		});
		steps__row.forEach(function(steps__row) {
		    steps__row.addEventListener('click', function(event) {
		    		steps__row.classList.toggle('active');
		        slideToggle2(steps__row.querySelector('.steps__span'));
		    });
		});
	}
	function slideToggle2(element) {
	  var target = element.style;
	  target.transition = 'all 0.3s ease-in-out';
	  var slideableElements = document.querySelectorAll('.steps__row .steps__span');
	    slideableElements.forEach(function(item) {
	    if (item !== element && item.parentNode.parentNode.classList.contains('active')) {
	      var itemTarget = item.style;
	      itemTarget.maxHeight = null;
	      item.parentNode.parentNode.classList.remove('active');
	    }
	  });
	  if (target.maxHeight) {
	    target.maxHeight = null;
	    element.parentNode.parentNode.classList.remove('active');
	  } else {
	    target.maxHeight = element.scrollHeight + 'px';
	    element.parentNode.parentNode.classList.add('active');
	  }
	}


	var tableToggle = document.querySelectorAll('.departure__table-title a');
	if (tableToggle) {
	  tableToggle.forEach(function (tableToggle) {
	    tableToggle.addEventListener('click', function (event) {
	      event.preventDefault();
	      var tableHidden = document.querySelectorAll('.departure__table');
	      if (tableHidden) {
	        tableHidden.forEach(function (tableHidden) {
	          tableHidden.classList.toggle('hidden');
	        });
	      }
	    });
	  });
	}
  const popupButton = document.querySelectorAll("[data-topopup]");
  if(popupButton){
	  popupButton.forEach(function (popupButton) {
	    popupButton.addEventListener("click", function (event) {
	    	event.preventDefault();
	      const dataPopup = this.getAttribute("data-topopup");
	      const dataClassPopup = document.querySelector(`${dataPopup}`);
	      if (dataClassPopup !== null) {
	        dataClassPopup.classList.add("open");
	        body.classList.add('popuplock');	
			    if (dataClassPopup.querySelector('video')) {
			        dataClassPopup.querySelector('video').play();
			    }

	      }

	    });
	  });  	
  }
	var popupClose = document.querySelectorAll('.popup__close');
	if(popupClose){
		popupClose.forEach(function(popupClose) {
		    popupClose.addEventListener('click', function(event) {
		    		body.classList.remove('popuplock');	
		    		popupClose.closest('.popup').classList.remove('open');
						const video = this.closest('.popup').querySelector('video');
				    if (video) {
				        video.pause();
				    }
		    });
		});		
	}

	var popup__row = document.querySelectorAll('.popup__row');
	var popup__top = document.querySelectorAll('.popup__top');
	if(popup__row){
		if(document.querySelector('.popup__row.active')){
			document.querySelector('.popup__row.active .popup__body').style.maxHeight = document.querySelector('.popup__row.active .popup__body').scrollHeight + 'px';
		}
		window.addEventListener('resize', function(){
			if(document.querySelector('.popup__row.active')){
				document.querySelector('.popup__row.active .popup__body').style.maxHeight = document.querySelector('.popup__row.active .popup__body').scrollHeight + 'px';
			}
		});
		popup__top.forEach(function(popup__top) {
		    popup__top.addEventListener('click', function(event) {
		    		popup__top.closest('.popup__row').classList.toggle('active');
		        slideToggle3(popup__top.nextElementSibling);
		    });
		});
	}
	function slideToggle3(element) {
	  var target = element.style;
	  target.transition = 'all 0.3s ease-in-out';
	  var slideableElements = document.querySelectorAll('.popup__body');
	    slideableElements.forEach(function(item) {
	    if (item !== element && item.parentNode.classList.contains('active')) {
	      var itemTarget = item.style;
	      itemTarget.maxHeight = null;
	      item.parentNode.classList.remove('active');
	    }
	  });
	  if (target.maxHeight) {
	    target.maxHeight = null;
	    element.parentNode.classList.remove('active');
	  } else {
	    target.maxHeight = element.scrollHeight + 'px';
	    element.parentNode.classList.add('active');
	  }
	}

	var knowledge__more = document.querySelectorAll('.knowledge__more');
	if(knowledge__more){
		knowledge__more.forEach(function(knowledge__more) {
		    knowledge__more.addEventListener('click', function(event) {
		    	event.preventDefault();
		    	knowledge__more.nextElementSibling.classList.add('open');
		    	knowledge__more.remove();	
		    });
		});		
	}
	var equipmentMore = document.querySelectorAll('.equipment__more');
	if(equipmentMore){
		equipmentMore.forEach(function(equipmentMore) {
		    equipmentMore.addEventListener('click', function(event) {
		    	event.preventDefault();
		    	var equipmenthiddens = equipmentMore.closest('.equipment').querySelectorAll('.hidden');
		    	if(equipmenthiddens){
			    	equipmenthiddens.forEach(function(equipmenthiddens) {
			    		equipmenthiddens.classList.toggle('show');
		          if (equipmenthiddens.classList.contains('show')) {
		            equipmentMore.querySelector('span').innerText = equipmentMore.getAttribute('data-hide');
		          } else {
		            equipmentMore.querySelector('span').innerText = equipmentMore.getAttribute('data-original');
		          }

			    	});		    		
		    	}
		    });
		});		
	}
   if(document.querySelector('[data-fancybox]')){
		 	Fancybox.bind("[data-fancybox]", {
			  Images: {
			  	zoom:false,
			  	zoomOpacity:false,
			  },
			  Thumbs: {
			    type: "classic",
			  },
		 	});
   }
	const telmask = document.querySelectorAll('.telmask');
	if(telmask){
		telmask.forEach(function(telmask) {
			const maskOptions = {
			  mask: '+{7}(000) 000-00-00',
			};
			const mask = IMask(telmask, maskOptions);
		});
	}				
	var calcButton = document.querySelectorAll('#calcpopup .popup__bottom button');
	if(calcButton){
		calcButton.forEach(function(calcButton){
			calcButton.addEventListener('click', function(event) {
				event.preventDefault();
				var closestPopup = calcButton.closest('.popup');
				if(closestPopup){
					closestPopup.classList.remove('open');
				}
				var calcFormPopup = document.querySelector('.calcForm')
				if(calcFormPopup){
					calcFormPopup.classList.add('open');
				}				
			});
		});
	}
	var calcFormBack = document.querySelectorAll('.calcForm__back');
	if(calcFormBack){
		calcFormBack.forEach(function(calcFormBack){
			calcFormBack.addEventListener('click', function(event) {
				var closestPopup1 = calcFormBack.closest('.popup');
				if(closestPopup1){
					closestPopup1.classList.remove('open');
				}
				var calcPopup = document.querySelector('#calcpopup');
				if(calcPopup){
					calcPopup.classList.add('open');
				}
			});
		});
	}
	
  var paragraphs = document.querySelectorAll('.main-equipment__body p');
  paragraphs.forEach(function (paragraph) {
    var link = paragraph.querySelector('a');
    if (link) {
      paragraph.style.cursor = 'pointer';
      paragraph.addEventListener('click', function () {
        window.location.href = link.href;
      });
    }
  });
	var configDescr = document.querySelectorAll('.config__item-descr');
	if(configDescr){
		configDescr.forEach(function(configDescr){
			configDescr.addEventListener('click', function(event) {
				configDescr.classList.toggle('active');
			});
			document.addEventListener('click', function(event) {
			  if (!configDescr.contains(event.target)) {
			    configDescr.classList.remove('active');
			  }	  
			});


		});
	}
  var decrementButtons = document.querySelectorAll('.decrement');
  var incrementButtons = document.querySelectorAll('.increment');
  if(decrementButtons){
	  decrementButtons.forEach(function (button) {
		  button.addEventListener('click', function (event) {
				  event.preventDefault();
				  decreaseQuantity(button);
				  configCalc();
		  });
	  });
	  incrementButtons.forEach(function (button) {
		  button.addEventListener('click', function (event) {
				  event.preventDefault();
				  increaseQuantity(button);
				  configCalc();
		  });
	  });
	  function decreaseQuantity(clickedButton) {
		  var parentDiv = clickedButton.closest('.quantity');
		  var quantityInput = parentDiv.querySelector('.quantityInput');
		  var currentValue = parseInt(quantityInput.value, 10);
		  if (!isNaN(currentValue) && currentValue >= 1) {
			  quantityInput.value = currentValue - 1;
			  checkInputValue(quantityInput);
		  }
	  }
	  function increaseQuantity(clickedButton) {
		  var parentDiv = clickedButton.closest('.quantity');
		  var quantityInput = parentDiv.querySelector('.quantityInput');
		  var currentValue = parseInt(quantityInput.value, 10);
		  if (!isNaN(currentValue)) {
			  quantityInput.value = currentValue + 1;
			  checkInputValue(quantityInput);
		  }
	  }
	  var quantityInputs = document.querySelectorAll('.quantityInput');
	  quantityInputs.forEach(function(input) {
		  checkInputValue(input);
	  });
	  function checkInputValue(input) {
	    var parentDiv = input.closest('.quantity');
	    var currentValue = parseInt(input.value, 10);
	    if (currentValue === 0) {
	        parentDiv.classList.add('disabled');
	    } else {
	        parentDiv.classList.remove('disabled');
	    }
		}
  }	
  var configPricesInputs = document.querySelectorAll('[data-configprice]');
  var configPricesLabel = document.querySelector(".config__bottom p span")
  if(configPricesInputs && configPricesLabel){
	  configPricesInputs.forEach(function(configPricesInput) {
	  	configPricesInput.addEventListener('change', function (event) {
	  		configCalc();
	  	});
	  });  
		function configCalc() {
		    var totalCost = 0;
		    configPricesInputs.forEach(function(configEl) {
		        var elementType = configEl.getAttribute("type");
		        
		        if (elementType === "checkbox" || elementType === "radio") {
		            if (configEl.checked) {
		                totalCost += parseFloat(configEl.getAttribute("data-configprice"));
		            }
		        } else if (elementType === "number") {
		            totalCost += parseFloat(configEl.getAttribute("data-configprice")) * configEl.value;
		        }
		    });
		    if(totalCost == 0){
		    	configPricesLabel.innerHTML = totalCost.toLocaleString() + ' р.';
		    }else{
		    	configPricesLabel.innerHTML = 'от ' + totalCost.toLocaleString() + ' р.';
		    }
		    
		    return totalCost;
		}
		configCalc();
  }

});

