  //hide menu on scroll

  function hideUnhideMenuOnScroll() {
    // const serviceCenter = document.querySelector('.service-center');
    let scrollPosition = document.documentElement.scrollTop;
    let header = document.querySelector('.header');
  

    window.onscroll = function() {
      let currentScrollPosition = document.documentElement.scrollTop;

      if (scrollPosition < currentScrollPosition ) {
          header.classList.add('header__hide_js');
      } else {
        header.classList.remove('header__hide_js');
      }
      scrollPosition = currentScrollPosition;
      }
    }

    hideUnhideMenuOnScroll();


      // let closeModalBtn = document.querySelector('.modal-thanks__close');
  
      // closeModalBtn.onclick = function (e) {
      //   thanksModal.classList.remove('modal-thanks__active');
      // }

      class ValidationForm {
        constructor (form) {
          this.form = form;
          this.inputWrappers = this.form.querySelectorAll('div');
          this.button = this.form.querySelector('button');
          this.inputs = this.form.querySelectorAll('.__js__input');
          this.modalThanks = document.querySelector('.modal-thanks__overlay');
          this.requestNumber = document.querySelector('.modal-thanks__request-number');
          this.inputs.freqorEach(element => {
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
    
          // this.button.addEventListener('click', (event)=> {
          //     event.preventDefault();
          //     this.sendForm(event);
              
          // })

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
    
          for (let pair of formData.entries()) {
              console.log(pair);
          }
    
          fetch('https://www.yamaguchi.ru/', {
              method: 'POST',
              body: formData,
              headers: {
                  'Access-Control-Allow-Origin': "*"
              }
          })
          .then(res => {
            res.text();
          })
          .then(data => {
            console.log(data);
            this.requestNumber.textContent = data;
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
    
      new ValidationForm(document.querySelector('.contacts__form')).initForm();