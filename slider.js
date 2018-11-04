var carouselContainer,
  dotsWrapper,
  nextSlide,
  prevSlide,
  sliderWrapper,
  sliderImage,
    wholeImages,
  imageSize = null;

var indexSlide = 0; /* номер текущего слайда */

var CarouselPlay = 1; /* индикатор для карусели: если 1 - автопромотка слайдов включена, 0 - выключена */

function fillDots() {
  /* рисуем маркеры быстрого перехода между слайдами */
  for (let i = 0; i < sliderImage.length; i++) {
    dotsWrapper.insertAdjacentHTML(
      "beforeEnd",
      '<li class="dots"><a href="#" onclick="bullet_SlideSelect(this);"></a></li>'
    );
  }
}

function bullet_SlideSelect(elem) {
  /* функция по обработке нажатия на маркере, входящий параметр - объект-ссылка "a" в маркере "dots" */
  var bulletButton = document.querySelectorAll(".dots a");
  indexSlide = 0;

  for (let i = 0; i < bulletButton.length; i++) {
    if (bulletButton[i] != elem) bulletButton[i].parentNode.className = "dots";
    else {
      indexSlide = i;
      bulletButton[i].parentNode.className = "dots active";
    }
  }
  ShowSlideByIndex(indexSlide);
}

function ShowSlideByIndex(indexSlide) {
  /* функция промотки области карусели до нужной позиции */
  sliderWrapper.style.left = (-imageSize * indexSlide) + "px";
}


function nextSlideFunc() {
  // indexSlide++;

    let startLeft = 0;
  // if (indexSlide >= sliderImage.length) {
  //     indexSlide = 0; /* если находимся на последнем элементе - проматываем к первому элементу */
  // }

        // console.log(imageSize[i].style.left)

    let timer = setInterval(function() {

        sliderWrapper.style.left = -(startLeft+=20) + "px";

        if (startLeft > imageSize ) {
            clearInterval( timer );
        }

    }, 10);


 console.log(sliderWrapper.style.left)
    // var animate = setInterval(function() {
    //     if(i <= sliderWidth) {
    //         allImages[cur].style.marginLeft = "-" + i + "%";
    //         i--;
    //     } else {
    //         clearInterval(animate);
    //     }
    // }, time);

    // console.log(sliderWrapper.style.left);

  bullet_SlideSelect(
    document.querySelectorAll(".dots a")[indexSlide]
  ); /* имитируем нажатие на нужном маркере */
}



function prevSlideFunc() {
  if (indexSlide == 0)
    indexSlide = sliderImage.length; /* если находимся на первом элементе - проматываем к последнему элементу */
  indexSlide--;
  bullet_SlideSelect(
    document.querySelectorAll(".dots a")[indexSlide]
  ); /* имитируем нажатие на нужном маркере */
}

function carouselStart(elem) {
  CarouselPlay = 1;
}

function carouselStop(elem) {
  CarouselPlay = 0;
}

function carouselByTime() {
  if (CarouselPlay == 1) nextSlideFunc();
}

window.onload = function() {

  /* инициализируем переменные после загрузки страницы */
  carouselContainer = document.querySelector(".carousel-container"); //верхний уровень слайдера
  dotsWrapper = document.querySelector(".dots_wrapper"); //обертка для дотов
  nextSlide = document.querySelector(".next"); //правая кнопка
  prevSlide = document.querySelector(".prev"); //левая кнопка

  sliderWrapper = document.querySelector(".carousel-slide"); //обертка картинок
  sliderImage = document.querySelectorAll(".carousel-slide img"); //сама картинка
  imageSize = sliderImage[0].clientWidth; //ширина картинки
  wholeImages = imageSize * sliderImage.length;

  sliderWrapper.style.left = -imageSize * indexSlide + "px";

  fillDots(); /* рисуем маркеры-точки быстрого перехода между слайдами */
  bullet_SlideSelect(
    document.querySelectorAll(".dots a")[0]
  ); /* выполняем ради появления маркера, что текущий слайд - первый */

  // привязываем эвенты на кнопки прокрутки слайдов
  nextSlide.addEventListener("click", nextSlideFunc);
  prevSlide.addEventListener("click", prevSlideFunc);

  // привязываем блокировку карусели при наведении курсора мыши на область под слайды/карусель
  carouselContainer.addEventListener("mouseover", carouselStop);
  carouselContainer.addEventListener("mouseout", carouselStart);

  // setInterval(
  //   carouselByTime,
  //   3000
  // ); /* запускаем карусель только после того, как загрузится вся страница */
};
