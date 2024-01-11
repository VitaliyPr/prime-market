const getElement = {
  one: selector => document.querySelector(selector),
  all: selector => document.querySelectorAll(selector),
}

new Swiper('#preview-slider', {
  pagination: { el: '#preview-pagination', clickable: true },
  navigation: {
    nextEl: '#preview-button-next',
    prevEl: '#preview-button-prev',
  },
  autoplay: { delay: 2500 },
  breakpoints: { 900: { autoplay: true } },
})

new Swiper('#reviewed-slider', {
  slidesPerView: 4,
  spaceBetween: 30,
  grabCursor: true,
  autoplay: {
    delay: 2500,
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    550: { slidesPerView: 2 },
    700: { slidesPerView: 2, spaceBetween: 20 },
    900: { slidesPerView: 3 },
    1250: { slidesPerView: 4 },
  },
})

var swiper = new Swiper("#gallery-slider", {
  spaceBetween: 7,
  slidesPerView: 4,
  loop: true,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    992: { spaceBetween: 30 },
  },
});
var swiper2 = new Swiper("#gallery-slider2", {
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '#gallery-button-next',
    prevEl: '#gallery-button-prev',
  },
  thumbs: {
    swiper: swiper,
  },
});

const toggleNavbar = () => {
  const navbar = getElement.one('.navbar')
  const activeCls = 'navbar--small'

  const toggle = clsMethod => navbar.classList[clsMethod](activeCls)

  const scroll = () => {
    if (window.screen.width <= 900) return toggle('add')
    if (window.scrollY >= 225) return toggle('add')

    toggle('remove')
  }

  scroll()

  window.addEventListener('scroll', scroll)
}

const showElements = () => {
  const btnsOpen = getElement.all('[data-open]')
  const bntsClose = getElement.all('[data-close]')
  const hide = { clsMethod: 'remove', dataAttr: 'data-close' }
  const show = { clsMethod: 'add', dataAttr: 'data-open' }

  const toggle = ({ btn, clsMethod, dataAttr }) => {
    const data = JSON.parse(btn.getAttribute(dataAttr))
    const el = getElement.one(`[data-el=${data.el}]`)

    btn.addEventListener('click', () => {
      if (!data.class) {
        return (el.className = data.mainClass)
      }

      el.classList[clsMethod](data.class)
    })
  }

  btnsOpen.forEach(btn => toggle({ ...show, btn }))
  bntsClose.forEach(btn => toggle({ ...hide, btn }))
}

const toggleScrollUp = () => {
  const fixed = getElement.one('[data-fixed]')
  const scrollUp = getElement.one('[data-scrollup]')
  const activeCls = 'fixed--scroll'

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 225) {
      fixed.classList.add(activeCls)
    } else {
      fixed.classList.remove(activeCls)
    }
  })

  scrollUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

toggleNavbar()
toggleScrollUp()
showElements()


$('.page-content__sidebar-btn').on('click', function () {
  $(this).parent().toggleClass('active');
});

if ($('.accordion').length) {
  $('.accordion').accordion({
    onChanging: function onChanging() {
      $(this).closest('.accordion').toggleClass('is-active');
    }
  });
  $('[data-accordion-close]').on('click', function (evt) {
    evt.preventDefault();
    $('.accordion').accordion('close', 0);
  });
};

$("select").niceSelect();

if(document.querySelector('.cabinet')){
	// получаем массив всех вкладок
	const tabs = document.querySelectorAll(".cabinet__link");
	// получаем массив всех блоков с содержимым вкладок
	const contents = document.querySelectorAll(".cabinet__content");

	// запускаем цикл для каждой вкладки и добавляем на неё событие
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener("click", ( event ) => {

			// сначала нам нужно удалить активный класс именно с вкладок
			let tabsChildren = event.target.parentElement.children;
      
			for (let t = 0; t < tabsChildren.length; t++) {
				tabsChildren[t].classList.remove("cabinet__link--active");
			}
			// добавляем активный класс
			tabs[i].classList.add("cabinet__link--active");
			// теперь нужно удалить активный класс с блоков содержимого вкладок
			let tabContentChildren = event.target.parentElement.nextElementSibling.children;
      console.log (tabContentChildren)
			for (let c = 0; c < tabContentChildren.length; c++) {
				tabContentChildren[c].classList.remove("cabinet__content--active");
			}
			// добавляем активный класс
			contents[i].classList.add("cabinet__content--active");
		});
	}
};

$('.cabinet-info__btn').on('click', function () {
  $(this).parent().parent().parent().addClass('edit');
});

$('.close-edit').on('click', function () {
  $(this).parent().parent().parent().removeClass('edit');
});