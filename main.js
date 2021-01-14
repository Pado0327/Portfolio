'use strict';

// Home
// nav animation
const home = document.querySelector('#home');
const nav = document.querySelector('.header__nav');
const navBtn = document.querySelector('.mobile__nav__menu');
const arrowUpBtn = document.querySelector('.topbtn');

// popup nav after home section.
function NavAndArrowUpPop() {
  if (window.pageYOffset >= home.clientHeight) {
    if (!nav.classList.contains('header__navMoved')) {
      nav.classList.add('header__navMoved');
    }
    arrowUpBtn.classList.add('visibleArrow');
  } else if (window.pageYOffset < home.clientHeight) {
    if (nav.classList.contains('header__navMoved')) {
      nav.classList.remove('header__navMoved');
    }
    arrowUpBtn.classList.remove('visibleArrow');
  }
}

// nav hamburger btn event
navBtn.addEventListener('click', () => {
  nav.classList.toggle('down');
  navBtn.classList.toggle('change');
});

//scrolling to the section
const navList = document.querySelector('.nav__menulists');
const contactBtn = document.querySelector('.contactmebtn');

function OnClick(e) {
  const target = e.target;
  const dataLink = target.dataset.link;
  if (dataLink == null) {
    return;
  }
  document.querySelector(`${dataLink}`).scrollIntoView({ behavior: 'smooth' });
}

navList.addEventListener('click', (e) => {
  OnClick(e);
});

contactBtn.addEventListener('click', (e) => {
  OnClick(e);
});

// scroll animation.
document.addEventListener('scroll', () => {
  NavAndArrowUpPop();
  nav.classList.remove('down');
  navBtn.classList.remove('change');
});

// home description typing effect
const description = document.querySelector('#textContainer');
let text = description.innerText;

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

// header contents fading effect when scorll down.
const headerMain = document.querySelector('.main__container');

document.addEventListener('scroll', () => {
  if (window.scrollY <= home.clientHeight) {
    headerMain.style.opacity =
      (home.clientHeight - window.scrollY) / home.clientHeight;
  }
});

// project
const projectbtnContainer = document.querySelector('.project__categories');
const projects = document.querySelectorAll('.project__item');
const projectContainer = document.querySelector(
  '.projects__projectsWithDescription'
);
const projectbtn = document.querySelectorAll('.project__btn');

// show corresponding project items with animation.
projectbtnContainer.addEventListener('click', (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  projectbtn.forEach((btn) => {
    if (filter == btn.dataset.filter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === 'all' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });

    projectContainer.classList.remove('anim-out');
  }, 300);
});
