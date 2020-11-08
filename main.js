'use strict';

// Home
// nav animation 
const home = document.querySelector('#home'); 
const nav = document.querySelector('.header__nav');
const navBtn = document.querySelector('.mobile__nav__menu');
const navList = document.querySelector('.nav_menulists');


// popup nav after home section. 
function NavPop() {
  if(window.pageYOffset >= home.clientHeight){
      if(!nav.classList.contains('header__navMoved'))
      nav.classList.add('header__navMoved');
  } 
  else if (window.pageYOffset < home.clientHeight){
      if(nav.classList.contains('header__navMoved'))
      nav.classList.remove('header__navMoved');
  }
}

document.addEventListener('scroll', () =>{
  NavPop();
  nav.classList.remove('down');
  navBtn.classList.remove('change');
});

// nav hamburger btn event
navBtn.addEventListener('click', ()=>{
    nav.classList.toggle('down');
    navBtn.classList.toggle('change');
})

// home description typing effect 
const description = document.querySelector("#textContainer");
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
  

// project
const projectbtnContainer = document.querySelector('.project__categories');
const projects = document.querySelectorAll('.project__item');
const projectContainer = document.querySelector('.projects__projectsWithDescription');
const projectbtn = document.querySelectorAll('.project__btn');

projectbtnContainer.addEventListener('click', event => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  projectbtn.forEach( btn => {
    if(filter == btn.dataset.filter){
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    projects.forEach( project => {
      if(filter === 'all' || filter === project.dataset.type){
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });

    projectContainer.classList.remove('anim-out');
  }, 300) 
});



window.onload = () => printDescription();



