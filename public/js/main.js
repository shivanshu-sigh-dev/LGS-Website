const triggerEmailClient = event => {
  event.preventDefault();

  $(".loading").show();
  $(".sent-message").hide();
  // get the data entered by the user
  const name = document.getElementById("name").value;
  const from = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  $.ajax({
    type: 'POST',
    url: '/sendMail',
    contentType: 'application/json',
    data: JSON.stringify({
      "name": name,
      "from": from,
      "sub": subject,
      "msg": message
    }),
    success: response => {
      response = $.trim(response);
      if(response === "success"){
        $(".loading").hide();
        $(".sent-message").show();
      } else {
        $(".loading").hide();
        alert("Someting went wrong. Please try again later.");
      }
    },
    error: error => {
      $(".loading").hide();
      alert("Someting went wrong. Please try again later.");
    }
  });
};

const sendQuotation = event => {
  event.preventDefault();

  const name = document.getElementById("fname").value;
  const from = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const company = document.getElementById("company").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("Query").value;
  const website = document.getElementById("website").value;
  
  const services = [];

  const checkBoxes = document.querySelectorAll(".cbk:checked");
  for (let index = 0; index < checkBoxes.length; index++) {
    const element = checkBoxes[index];
    services.push(element.value);
  }

  $.ajax({
    type: 'POST',
    url: '/quote',
    contentType: 'application/json',
    data: JSON.stringify({
      "name": name,
      "from": from,
      "sub": subject,
      "msg": message,
      "phone": phone,
      "company": company,
      "website": website,
      "services": services.toString()
    }),
    success: response => {
      response = $.trim(response);
      if(response === "success"){
        window.location.href = "/thanks";
      } else if(response === "invalid"){
        alert("Please fill all of the required fields.");
      } else {
        alert("Someting went wrong. Please try again later.");
      }
    },
    error: error => {
      alert("Someting went wrong. Please try again later.");
    }
  });
};

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
   let heroCarouselIndicators = select("#hero-carousel-indicators")
   let heroCarouselItems = select('#heroCarousel .carousel-item', true)
 
   heroCarouselItems.forEach((item, index) => {
     (index === 0) ?
     heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
       heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
   }); 

})();

/**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });
