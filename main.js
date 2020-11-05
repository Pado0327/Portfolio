'use strict';

// Home
// nav animation 
let home = document.querySelector('#home'); 
let nav = document.querySelector('.header__nav');
let navBtn = document.querySelector('.mobile__nav__menu');


window.onscroll = () =>{
    NavPop();
}

// nav hamburger btn event
navBtn.addEventListener('click', ()=>{
    nav.classList.toggle('down');
    navBtn.classList.toggle('change');
})

// popup nav after home section. 
function NavPop() {
    if(window.pageYOffset > home.clientHeight){
        if(!nav.classList.contains('header__navMoved'))
        nav.classList.add('header__navMoved');
    } 
    else if (window.pageYOffset < home.clientHeight){
        if(nav.classList.contains('header__navMoved'))
        nav.classList.remove('header__navMoved');
    }
}

// home description typing effect 
let description = document.querySelector("#textContainer");
let text = description.innerText; 


//TODO: may need to add more texts later. 
function printDescription() {
    description.innerHTML = '';
    let index = 0;
    let timer = setInterval(function () {
      description.innerHTML += text.charAt(index);
      if (++index == description.length) {
        clearInterval(timer);
      }
    }, 100);
  }
  

window.onload = () => printDescription();