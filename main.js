'use strict';

// ========== Home =============
// nav animation
const home = document.querySelector('#home');
const aboutme = document.querySelector('#aboutme');
const project = document.querySelector('#project');
const contactme = document.querySelector('#contactme');
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
  nav.classList.toggle('hdown');
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

  const scrollTo = document.querySelector(`${dataLink}`);

  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(target);
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
  nav.classList.remove('hdown');
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
    if (++index == text.length) {
      clearInterval(timer);
    }
  }, 100);
}

window.onload = () => printDescription();

// header contents fading effect when scorlling down.
const headerMain = document.querySelector('.main__container');

document.addEventListener('scroll', () => {
  if (window.scrollY <= home.clientHeight) {
    headerMain.style.opacity =
      (home.clientHeight - window.scrollY) / home.clientHeight;
  }
});

// highlight nav list when scrolling down.
const sectionArray = [home, aboutme, project, contactme];
const navItemArray = [
  navList.children[0],
  navList.children[1],
  navList.children[2],
  navList.children[3],
];

let SelectedNavitem = navItemArray[0];
let index = 0;

function selectNavItem(selected) {
  SelectedNavitem.classList.remove('highlight');
  SelectedNavitem = selected;
  SelectedNavitem.classList.add('highlight');
}

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const selectedIndex = sectionArray.indexOf(entry.target);
      if (entry.boundingClientRect.y < 0) {
        index = selectedIndex + 1;
      } else if (entry.boundingClientRect.y > 0) {
        index = selectedIndex - 1;
      }
    }
  });
};

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sectionArray.forEach((section) => {
  observer.observe(section);
});

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    index = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    index = navItemArray.length - 1;
  }

  selectNavItem(navItemArray[index]);
});

// ========== project =============

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

// Projects Pop up
const popUpbtn = document.querySelector('.popUp__closebtn');
const popUp_background = document.querySelector('.popUp__background');
const popUp_Container = document.querySelector('.popUp__container');
const popUp_img = document.querySelector('#popUp__img');
const popUp_title = document.querySelector('#popUp__title');
const popUp_description = document.querySelector('#popUp__description');
const popUp_languages = document.querySelector('.languages');
const popUp_git = document.querySelector('#git');
const popUp_site = document.querySelector('#site');
let tempProject;
//flag? to close when you click anywhere outside field.

async function fetchProjectJSON() {
  const response = await fetch('assets/projects.json');
  const projects = await response.json();

  return projects;
}

projectContainer.addEventListener('click', (e) => {
  if (e.target.dataset.type == undefined) {
    return;
  }

  if (e.target.classList[0] == 'popUp__openbtn') {
    popUp_background.classList.replace('down', 'up');

    fetchProjectJSON().then((projects) => {
      tempProject = projects.filter((project) => {
        return project['ProjectName'] == e.target.dataset.type;
      });

      ProvideInfoToPopUp(tempProject);
    });

    document.body.style.overflow = 'hidden';
  }
});

popUp_background.addEventListener('click', (e) => {
  if (
    e.target.classList[0] == 'popUp__background' ||
    e.target.classList[0] == 'popUp__closebtn'
  ) {
    popUp_background.classList.replace('up', 'down');
    document.body.style.overflow = 'visible';
  }
});

function ProvideInfoToPopUp(project) {
  popUp_img.src = project[0]['img'];
  popUp_img.alt = project[0]['ProjectName'];
  popUp_title.innerText = project[0]['Title'];
  popUp_description.innerHTML = project[0]['Description'];
  popUp_languages.innerText = project[0]['Languages'];
  popUp_git.href = project[0]['Github'];
  popUp_site.href = project[0]['Site'];
}
