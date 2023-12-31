


// console.log(title.innerHTML);

document.addEventListener('DOMContentLoaded', () => {
  let selector = document.querySelector('.service-center__select');
  let currentCity = selector.textContent;
  let cityList = document.querySelector('.service-center__city-list');
  let formCity = document.querySelector('.service-center__choose-city');
  let wrapper = document.querySelector(('.header__wrapper'));
  let header = document.querySelector('.header');
  let cityTitle = document.querySelector('.service-center__city-choice__title');
  let cityHeader = document.querySelector('.service-center__city-choice__header');
  let contactsBtn = document.querySelector('.contacts__button');
  let serviceBtn = document.querySelector('.service-center__button');
  let thanksModal = document.querySelector('.modal-thanks');
  let closeModalBtn = document.querySelector('.modal-thanks__close');


  if(localStorage['city']) {
    selector.textContent = localStorage.getItem('city');
  }

  const mobCities = document.querySelector('.js-cities__mob');
  let mobCityList = document.querySelector('.js-cities__list');
      
  //city choice 

  function  handleOverLay(event) {
    if (event.target.classList.contains('service-center__list-item') || event.target === selector) return;
    close();
  } 

  function open () {
    selector.classList.add('_active');
    cityList.classList.add('_city-list_active');
    document.addEventListener('click', handleOverLay);
  }

  function close() {
    selector.classList.remove('_active');
    cityList.classList.remove('_city-list_active');
    document.removeEventListener('click', handleOverLay);
  }

  function openMobCity() {
    mobCities.classList.add('js-cities__active');
      let cityList = document.querySelector('.service-center__city-list');
      cityList.style.opacity = 1;
      cityList.style.visibility = 'visible';
      cityList.style.height = 100 + 'vh';
      cityList.style.background = '#' + 181818;
      let list = cityList.cloneNode(true);
      mobCityList.after(list);
  }

  function closeMobCity() {
    document.querySelector('.js-cities__close').addEventListener('click', () => {
        mobCities.classList.remove('js-cities__active');
        cityList.style.opacity = 0;
        cityList.style.visibility = 'hidden';
    })
  }
  
  function chooseMobCity() {
    document.querySelectorAll('.service-center__list-item').forEach( e => {
      const city = e;
     city.addEventListener('click', () => {
        selector.textContent = city.dataset.city;
        currentCity = city.dataset.city;
        localStorage.setItem('city', city.dataset.city);
        mobCities.classList.remove('js-cities__active');
        cityList.style.opacity = 0;
        cityList.style.visibility = 'hidden';
      })
    })
  }

  function checkWindowWidth() {

    if (window.matchMedia('(max-width: 767px)').matches) {
      openMobCity();
      closeMobCity();
      chooseMobCity();

    } else {
          selector.classList.contains('_active') ? close() : open();
          chooseCity();
          
    }
  }

  selector.addEventListener('click', () => {
    checkWindowWidth();
  })

  function chooseCity() {
    document.querySelectorAll('.service-center__list-item').forEach( e => {
      const city = e;
      city.addEventListener('click', () => {
        selector.textContent = city.dataset.city;
        currentCity = city.dataset.city;
        localStorage.setItem('city', city.dataset.city);
        selector.classList.remove('_active');
        cityList.classList.remove('_city-list_active');
        
      })
    })
  }
  

  //faq 
  document.querySelectorAll('.faq__question').forEach( item => {
    item.addEventListener('click', () => {
      
      const arrow = item;
      const content = item.nextElementSibling;

      if (content.style.maxHeight) {
        document.querySelectorAll('.faq__text').forEach( item => {
          item.style.maxHeight = null;
          item.style.opacity = null;
          }) 
        document.querySelectorAll('.faq__question').forEach(item => {
          item.classList.remove('_active');
        })
      } else {
        document.querySelectorAll('.faq__text').forEach( item => {
          item.style.maxHeight = null;
          item.style.opacity = null;  
        })
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = 1;
        
        document.querySelectorAll('.faq__question').forEach(item => {
          item.classList.remove('_active');
        })
        arrow.classList.add('_active');
      }
    })
  })

  function openMobileMenu() {
    let mobMenu = document.querySelector('.js-menu__mob');
    let openBtn = document.querySelector('.header__menu-burger');
    let closeBtn = document.querySelector('.js-menu__close');
    let menuItems = document.querySelectorAll('.js-menu__mob-item');
    openBtn.addEventListener('click', () => {
      mobMenu.classList.add('js-menu__mob_active');
    });
    closeBtn.addEventListener('click', () => {
      mobMenu.classList.remove('js-menu__mob_active');
    });

      menuItems.forEach( item  => {
        
        item.addEventListener('click', () => {
          mobMenu.classList.remove('js-menu__mob_active');
        })
      })
    }

    openMobileMenu();


  


//menu scroll effects
    let headerBlockHeight = +window.getComputedStyle(header, null).height.replace('px', '');

    window.addEventListener('scroll', () => {
      getStickyHeader(header, headerBlockHeight);
    })

    function getStickyHeader(elem, triggerHeight) {
      if (window.scrollY >= triggerHeight) {
        elem.classList.add('header__sticky_js');
        
      } else {
        elem.classList.remove('header__sticky_js');
      
      }  
    }

  //hide menu on scroll

  function hideUnhideMenuOnScroll() {
    const serviceCenter = document.querySelector('.service-center');
    let scrollPosition = document.documentElement.scrollTop;
  

    window.onscroll = function() {
      let currentScrollPosition = document.documentElement.scrollTop;

      if (scrollPosition < currentScrollPosition && scrollPosition > serviceCenter.clientHeight) {
          header.classList.add('header__hide_js');
          wrapper.classList.remove('header__black-bgc_js');
      } else if(currentScrollPosition <= 0) {
        wrapper.classList.remove('header__black-bgc_js');
      } else {
        header.classList.remove('header__hide_js');
        wrapper.classList.add('header__black-bgc_js');
      }
      scrollPosition = currentScrollPosition;
      }
    }

    hideUnhideMenuOnScroll();


 //validation and sending form
 class ValidationForm {
  constructor (form) {
    this.form = form;
    this.inputWrappers = this.form.querySelectorAll('div');
    this.button = this.form.querySelector('button');
    this.inputs = this.form.querySelectorAll('.__js__input');
    this.modalThanks = document.querySelector('.modal-thanks__overlay');
    this.modalCloseButton = document.querySelector('.modal-thanks__close');
    this.inputs.forEach(element => {
      if (element.name == 'name') {
        this.name = element
      } else if (element.name ==  'tel') {
        this.tel = element
      } else if (element.name == 'email') {
        this.email = element
      } else if (element.name == 'message') {
        this.message = element
      }
    })
  }

  initForm() {

    const phoneOptions = {
        mask: '+{7} (000) 000-00-00',
    };

    new IMask(this.tel, phoneOptions);
   
    this.inputWrappers.forEach(wrapper => {
      const input = wrapper.querySelector('input');
      const errText = wrapper.querySelector('p');
      input.addEventListener('input', (event) => this.handleInputChanges(event, input, errText));
      input.addEventListener('blur', (event) => this.handleInputBlur(event, input, errText));
    })

    this.button.addEventListener('click', (event) => {
        event.preventDefault();
        let isValid = this.form.checkValidity()
          if (isValid) { 
          this.sendForm(event);
        }
      })
  }

  setBtnDisabled() {
    this.button.disabled = true;
    this.button.classList.add('_disabled');
  }

  setBtnActive() {
      this.button.disabled = false;
      this.button.classList.remove('_disabled');
  }

  handleInputChanges = (event, input, errText) => {
      (this.form.checkValidity()) ? this.setBtnActive() : this.setBtnDisabled();

      if (input.validity.valid && errText.classList.contains('_unhide')) {
        errText.classList.remove('_unhide');
      }
        
  }

  handleInputBlur = (event, input, errText) => {
    if(!input.validity.valid) {
      errText.classList.add('_unhide');
    }
  }

  sendForm(event) {
    let formData = new FormData(this.form);
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: formData,
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    })
    .then(res=> {
      res.json()
        this.showModal();
        this.form.reset();
    })
    .catch(err=>{
        console.log(err);
    })
  }

  hideModal() {
    this.modalThanks.addEventListener('click', (e) =>  {
      if(e.target === e.currentTarget || e.target.classList.contains('modal-thanks__close')) {
        this.modalThanks.classList.remove('modal-thanks__overlay_active');
      }
    });
  }

  showModal() {
    this.modalThanks.classList.add('modal-thanks__overlay_active');
    this.hideModal();
  }
}

let serviceCenter = document.querySelector('.service-center__form');
new ValidationForm(serviceCenter).initForm();
new ValidationForm(document.querySelector('.contacts__form')).initForm();

})

