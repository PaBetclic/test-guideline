$(document).ready(function () {
    const scrollOffset = 100;
  
    function smoothScroll() {
      $('.nav-item a, .big-ul-menu > li > p > a').on('click', function (e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        const targetElement = $(targetId);
        const targetPosition = targetElement.offset().top - scrollOffset;
        $('html, body').animate({ scrollTop: targetPosition }, 0);
      });
    }
  
    function updateActiveMenu() {
      const sections = $('.div-element-menu');
      const menuItems = $('.nav-item a');
      const mainSections = $('.sections-menu');
      const mainMenuItems = $('.big-ul-menu > li > p > a');
  
      sections.each(function () {
        const section = $(this);
        const sectionId = section.attr('id');
        const sectionTop = section.offset().top - $(window).scrollTop();
  
        if (sectionTop <= 200 && sectionTop + section.outerHeight() > 200) {
          menuItems.removeClass('small-title-is-active');
          const currentMenuItem = menuItems.filter(`[href="#${sectionId}"]`);
          currentMenuItem.addClass('small-title-is-active');
  
          mainSections.each(function (index) {
            if ($(this).find(`#${sectionId}`).length > 0) {
              mainMenuItems.removeClass('title-is-active');
              mainMenuItems.eq(index).addClass('title-is-active');
            }
          });
        }
      });
    }
  
    function handleSubMenu() {
      $('.li-small-menu').each(function () {
        const sectionId = $(this).attr('id').replace('Big', '');
        const section = $(`#${sectionId}`);
        if (section.length === 0) return;
  
        const sectionTop = section.offset().top;
        const sectionHeight = section.outerHeight();
        const scrollPosition = $(window).scrollTop();
        const subMenu = $(this).find('.small-ul-menu');
  
        if (scrollPosition >= sectionTop - 100 && scrollPosition <= sectionTop + sectionHeight - 100) {
          if (!subMenu.is(':visible')) {
            subMenu.stop().slideDown(300);
          }
        } else {
          subMenu.stop().hide();
        }
      });
    }
  
    function updateButtonStyles() {
      $('.btn-secondary').removeClass('active');
      $('input[type="radio"]:checked').each(function () {
        $(this).parent('.btn-secondary').addClass('active');
      });
    }
  
    function manageImages() {
      $("#colored-options, #monochrome-options").hide();
  
      function hideAllImages() {
        $(".image").fadeOut(150);
      }
  
      $('input[name="type"]').change(function () {
        const selectedType = $(this).val();
        hideAllImages();
  
        if (selectedType === "colored") {
          $("#colored-options").show();
          $("#monochrome-options").hide();
          $('input[name="colored-filter"][value="not-bright-red"]').prop("checked", true);
          $("#image-colored-not-bright-red").delay(150).fadeIn(150);
        } else if (selectedType === "monochrome") {
          $("#monochrome-options").show();
          $("#colored-options").hide();
          $('input[name="monochrome-filter"][value="light"]').prop("checked", true);
          $("#image-monochrome-light").delay(150).fadeIn(150);
        }
        updateButtonStyles();
      });
  
      $('input[name="colored-filter"], input[name="monochrome-filter"]').change(function () {
        hideAllImages();
        const selectedFilter = $(this).val();
  
        if ($(this).attr('name') === "colored-filter") {
          if (selectedFilter === "not-bright-red") {
            $("#image-colored-not-bright-red").delay(150).fadeIn(150);
          } else if (selectedFilter === "bright-red") {
            $("#image-colored-bright-red").delay(150).fadeIn(150);
          }
        } else {
          if (selectedFilter === "light") {
            $("#image-monochrome-light").delay(150).fadeIn(150);
          } else if (selectedFilter === "dark") {
            $("#image-monochrome-dark").delay(150).fadeIn(150);
          }
        }
        updateButtonStyles();
      });
    }
  
    function imageCarousel() {
      const images = document.querySelectorAll('.fade-img');
      let currentIndex = 0;
  
      function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
      }
      setInterval(showNextImage, 1900);
  
      const images2 = document.querySelectorAll('.fade-img2');
      let currentIndex2 = 0;
  
      function showNextImage2() {
        images2[currentIndex2].classList.remove('active2');
        currentIndex2 = (currentIndex2 + 1) % images2.length;
        images2[currentIndex2].classList.add('active2');
      }
      setInterval(showNextImage2, 2200);
    }
  
    function addZoomEffect(containerSelector) {
      const container = document.querySelector(containerSelector);
      const image = container.querySelector('img');
      let isZoomed = false;
  
      container.addEventListener('mousemove', (e) => {
        if (!isZoomed) return;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const moveX = ((x / rect.width) - 0.5) * 40;
        const moveY = ((y / rect.height) - 0.5) * 40;
        image.style.transform = `scale(2.2) translate(${moveX}%, ${moveY}%)`;
      });
  
      container.addEventListener('mouseenter', () => {
        isZoomed = true;
        image.style.transform = 'scale(2.2)';
      });
  
      container.addEventListener('mouseleave', () => {
        isZoomed = false;
        image.style.transform = 'scale(1)';
      });
    }
  
    addZoomEffect('.container-img-6');
    addZoomEffect('.container-img-7');
  
    function handleBurgerMenu() {
      const burgerMenu = document.querySelector('.burger-menu');
      const menuAside = document.querySelector('.menu-aside');
      const menuLinks = document.querySelectorAll('.menu-aside a');
  
      burgerMenu.addEventListener('click', () => {
        menuAside.classList.toggle('open');
        burgerMenu.classList.toggle('open');
      });
  
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          menuAside.classList.remove('open');
          burgerMenu.classList.remove('open');
        });
      });
    }
  
    function copyToClipboard() {
      const colorBlocks = document.querySelectorAll('.bloc-reference');
      const copyNotification = document.getElementById('copy-notification');
  
      colorBlocks.forEach(block => {
        block.addEventListener('click', () => {
          const hexCode = block.getAttribute('data-hex');
          navigator.clipboard.writeText(hexCode).then(() => {
            copyNotification.style.display = 'block';
            setTimeout(() => {
              copyNotification.style.display = 'none';
            }, 2000);
          }).catch(err => {
            console.error('Échec de la copie dans le presse-papier :', err);
          });
        });
      });
    }
  
    function handleMediaVisibility() {
      const lottiePlayers = $('lottie-player');
      const videos = $('video');
  
      function toggleMediaVisibility(entries) {
        entries.forEach(entry => {
          const element = entry.target;
          if (entry.isIntersecting) {
            if ($(element).is('lottie-player')) {
              element.play();
            } else if ($(element).is('video')) {
              element.play();
            }
          } else {
            if ($(element).is('lottie-player')) {
              element.pause();
            } else if ($(element).is('video')) {
              element.pause();
            }
          }
        });
      }
  
      const observer = new IntersectionObserver(toggleMediaVisibility, {
        root: null,
        threshold: 0.5
      });
  
      lottiePlayers.each(function () {
        observer.observe(this);
      });
      videos.each(function () {
        observer.observe(this);
      });
    }
  
    smoothScroll();
    updateActiveMenu();
    handleSubMenu();
    manageImages();
    imageCarousel();
    handleBurgerMenu();
    copyToClipboard();
    handleMediaVisibility();
  
    $(window).on('scroll', function () {
      updateActiveMenu();
      handleSubMenu();
    });
    $(window).trigger('scroll');
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const colorBar = document.querySelector(".container-bar-anim");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          colorBar.style.transition = "margin-top 0.5s ease";
          colorBar.style.marginTop = "30px";
          const numbers = document.querySelectorAll(".animNumber");
          numbers.forEach(number => {
            number.style.opacity = "1";
          });
          setTimeout(() => {
            animateBar();
          }, 500);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: "-65% 0px",
      threshold: 0
    });
  
    observer.observe(colorBar);
  
    function animateBar() {
      const bars = document.querySelectorAll(".barAnim");
      bars.forEach(bar => {
        const numberElement = bar.querySelector(".animNumber");
        const finalWidth = numberElement.getAttribute("data-width");
        bar.style.width = finalWidth;
        animateNumber(numberElement, parseInt(finalWidth));
      });
    }
  
    function animateNumber(element, finalValue) {
      let current = 25;
      const increment = (finalValue - current) / 50;
      const duration = 1000;
      const intervalTime = duration / 50;
  
      const interval = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= finalValue) || (increment < 0 && current <= finalValue)) {
          clearInterval(interval);
          element.textContent = `${finalValue}%`;
        } else {
          element.textContent = `${Math.round(current)}%`;
        }
      }, intervalTime);
    }
  });
  