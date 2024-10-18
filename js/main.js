document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.product__card').forEach((product) => {
    product.querySelector('.product__favorite-btn').addEventListener('click', () => {
      product.querySelector('.product__favorite-btn').classList.toggle('active-favorite');
    });
  })

  document.querySelectorAll('.tooltiptext').forEach((tooltip) => {
    let checkTooltip = false;
    const tooltipBlock = document.querySelector('.tooltip');
    let tooltipBlockCenterX;
    let tooltipBlockBottomY;
    tooltip.addEventListener('mouseover', (e) => {
      tooltipBlockCenterX = tooltip.getBoundingClientRect().x + tooltip.getBoundingClientRect().width / 2;
      tooltipBlockBottomY = tooltip.getBoundingClientRect().y + tooltip.getBoundingClientRect().height;
      if (!checkTooltip) {
        const tooltipText = tooltip.innerHTML;
        tooltipBlock.innerHTML = tooltipText;
        tooltipBlock.style.top = `${tooltipBlockBottomY + 5}px`;
        tooltipBlock.style.left = `${tooltipBlockCenterX + 20}px`;
        tooltipBlock.classList.toggle('tooltip-active');
        checkTooltip = true;
      };
    });

    tooltip.addEventListener('mouseout', () => {
      checkTooltip = false;
      tooltipBlock.classList.toggle('tooltip-active');
      setTimeout (() => {
        tooltipBlock.style.left = `100vw`;
        tooltipBlock.innerHTML = '';
      }, 30)

    });
  });

  const bannerSwiper = new Swiper('.banner_swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    freeMode: {
      enabled: false,
      minimumVelocity: 0.02,
      momentum: true,
      momentumBounce: false,
      momentumRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
    },
    slidesPerView: 'auto',
  });

  const manufacturersSwiper = new Swiper('.manufacturers__swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 'auto',
    loop: true,
    navigation: {
      nextEl: '.manufacturers__swiper-button-next',
      prevEl: '.manufacturers__swiper-button-prev',
    },

    on: {
      init: function () {
        const nextButton = document.querySelector('.manufacturers__swiper-button-next');
        const prevButton = document.querySelector('.manufacturers__swiper-button-prev');

        // Получаем общую ширину всех слайдов
        const totalSlidesWidth = Array.from(this.slides).reduce((acc, slide) => {
          return acc + slide.offsetWidth;
        }, 0);

        // Получаем ширину видимого контейнера слайдера
        const swiperWidth = this.el.offsetWidth;

        // Если общая ширина слайдов меньше ширины слайдера
        if (totalSlidesWidth <= swiperWidth) {
          // Удаляем класс swiper-button-lock
          nextButton.classList.remove('manufacturers__swiper-button-next');
          prevButton.classList.remove('manufacturers__swiper-button-prev');

          // Добавляем класс swiper-button-disabled
          nextButton.classList.add('swiper-button-disabled');
          prevButton.classList.add('swiper-button-disabled');

          document.querySelector('.manufacturers__list').classList.toggle('justify-content-center')
        };

      },
    },
  });

  document.querySelectorAll('.products-slider').forEach((swiperContainer) => {
    const nextBtn = swiperContainer.querySelector('.product__swiper-button-next');
    const prevBtn = swiperContainer.querySelector('.product__swiper-button-prev');
    const scrollBar = swiperContainer.querySelector('.product__swiper-scrollbar');

    // Инициализировать каждый слайдер с одинаковыми параметрами
    new Swiper(swiperContainer.querySelector('.product__swiper'), {
      direction: 'horizontal',
      slidesPerView: 'auto',

      // Настройки навигации (кнопки уникальны для каждого слайдера)
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },

      scrollbar: {
        el: scrollBar,
        draggable: true,
      },

    });
  });

})
