'use strict';

let home = document.querySelector('#home'); 
let nav = document.querySelector('.header__nav');
let navBtn = document.querySelector('.mobile__nav__menu');

// nav animation
window.onscroll = () =>{
        NavPop();
}

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
