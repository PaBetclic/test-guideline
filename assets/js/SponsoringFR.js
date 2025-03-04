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
  
  
    smoothScroll();
    updateActiveMenu();
    handleSubMenu();
    handleBurgerMenu();
    copyToClipboard();
  
    $(window).on('scroll', function () {
      updateActiveMenu();
      handleSubMenu();
    });
    $(window).trigger('scroll');
  });
  
