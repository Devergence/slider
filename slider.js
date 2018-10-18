var dotsWrapper = document.querySelector(".dots_wrapper");

var nextSlide = document.querySelector(".next");

var prevSlide =  document.querySelector(".prev");

var sliderWrapper = document.querySelector('.carousel-slide');

var sliderImage = document.querySelectorAll('.carousel-slide img');

var imageSize = sliderImage[0].clientWidth;

var indexSlide = 1;

var firstSlide = sliderImage[0];

var lastSlide = sliderImage[sliderImage.length-1];



sliderWrapper.style.transform = 'translateX(' + (-imageSize * indexSlide) + 'px)';


function countSlides() {
    // count how many bullets we need
    for(let i = 0; i < sliderImage.length; i++){
        dotsWrapper.insertAdjacentHTML('beforeEnd', "<li class=\"dots\"><a href=\"#\"></a></li>");
    }

    //added cloned slides
    let firstAppendedSlide = firstSlide.cloneNode(true);
    let lastAppendedSlide = lastSlide.cloneNode(true);

    //clone first and last images and set up ids
    sliderWrapper.appendChild(firstAppendedSlide).setAttribute("id", "first-cloned");
    sliderWrapper.insertBefore(lastAppendedSlide, sliderImage[0] ).setAttribute("id", "last-cloned");

}

// bullet events
var bulletButton = document.querySelectorAll('.dots a');

// bulletButton.addEventListener('click', ()=> {
//     for(let i=0; i <= sliderImage.length; i++ ) {
//
//     }
// });

nextSlideFunc = () => {
    if(indexSlide >= sliderImage.length -1){
        sliderWrapper.insertBefore(sliderWrapper.children[indexSlide-1],sliderWrapper.children[0]);
    };
    sliderWrapper.style.transition = "transform 0.4s ease-in-out";
    indexSlide++;
    sliderWrapper.style.transform = 'translateX(' + (-imageSize * indexSlide) + 'px)';
};

prevSlideFunc = () => {
    if(indexSlide <= 0) return;
    sliderWrapper.style.transition = "transform 0.4s ease-in-out";
    indexSlide--;
    sliderWrapper.style.transform = 'translateX(' + (-imageSize * indexSlide) + 'px)';
};

//button events
nextSlide.addEventListener('click', nextSlideFunc);

prevSlide.addEventListener('click', prevSlideFunc);

sliderWrapper.addEventListener('transitionend', ()=> {
    if(sliderImage[indexSlide].id === 'last-cloned'){
        sliderWrapper.style.transition = "none";
        indexSlide = sliderImage.length -2;
        sliderWrapper.style.transform = 'translateX(' + (-imageSize * indexSlide) + 'px)';
        console.log('+');
    }
    if(sliderImage[indexSlide].id === 'first-cloned'){
        sliderWrapper.style.transition = "none";
        indexSlide = sliderImage.length - indexSlide;
        sliderWrapper.style.transform = 'translateX(' + (-imageSize * indexSlide) + 'px)';
    }
});

// setInterval(nextSlideFunc, 3000);

window.onload = function() {
    countSlides();
};

