export const scroll = () => {
  let offset = window.scrollY;
  const sticky = document.querySelector(".wsmainfull");
  if (sticky) {
    if (offset > 80) {
      sticky.classList.add("scroll");
    } else {
      sticky.classList.remove("scroll");
    }
  }
};

export const aTagClick = () => {
  const aTag = document.querySelectorAll("[href='#']");
  for (let i = 0; i < aTag.length; i++) {
    const a = aTag[i];
    a.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
};

export const isotopLayout = (container, item) => {
  setTimeout(() => {
    if (typeof window !== "undefined") {
      const Isotope = require("isotope-layout");
      new Isotope(container ? container : ".grid-loaded", {
        itemSelector: item ? item : ".project-details",
        percentPosition: true,
        masonry: {
          columnWidth: item ? item : ".project-details",
        },
      });
    }
  }, 1000);
};

export const pagination = (listClass, sort, active) => {
  let list = document.querySelectorAll(listClass);
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    if (active === 1) {
      if (i < sort) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    } else {
      if (i >= (active - 1) * sort && i < active * sort) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    }
  }
};

export const getPagination = (totalNumber, sort) => {
  let arr = new Array(Math.ceil(totalNumber / sort))
    .fill()
    .map((_, idx) => idx + 1);
  return arr;
};
