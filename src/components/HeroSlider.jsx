import { useState, useEffect, useRef } from "react";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
  
  // Sample slide data
  const slides = [
    {
      id: 1,
      para: "Savor the taste of quality order now and enjoy dining experience",
      title: "Szechwan Vegetable Hakka Noodles",
      image: "https://www.themealdb.com/images/media/meals/1529444830.jpg",
    },
    {
      id: 2,
      para: "Taste the flavour of spice",
      title: "Canadian Butter Tarts",
      image:
        "https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg",
    },
    {
      id: 3,
      para: "Traditional Italian taste",
      title: "Classic Spaghetti Carbonara",
      image:
        "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    },
    {
      id: 4,
      para: "Experience the authentic flavors of India",
      title: "Classic Margherita Pizza",
      image:
        "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 5,
      para: "Indulge in the rich and creamy taste of Italy",
      title: "Creamy Mushroom Risotto",
      image:
        "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
    },
  ];

  const infiniteSlides = [
    { ...slides[slides.length - 1], key: "clone-last" },
    ...slides.map((slide, idx) => ({ ...slide, key: `real-${idx}` })),
    { ...slides[0], key: "clone-first" },
  ];

  const getRealIndex = () => {
    if (currentIndex === 0) return slides.length - 1;
    if (currentIndex === infiniteSlides.length - 1) return 0;
    return currentIndex - 1;
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(slides.length);
    } else if (currentIndex === infiniteSlides.length - 1) {
      setCurrentIndex(1);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const jumpToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  // --- KEYBOARD FUNCTIONALITY ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isTransitioning]); // Dependencies ensure the functions use latest state

  // --- AUTO PLAY ---
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, isTransitioning]);


  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset end touch
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div>
      <div className="relative flex justify-center bg-amber-100 dark:bg-amber-950 dark:hover:bg-amber-900 py-2 transition-colors duration-500 hover:bg-amber-200/70 overflow-hidden">
        {/* Buttons - Hidden on small screens for better UX, visible on md+ */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="hidden md:block absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 z-50 font-bold text-2xl lg:text-3xl text-stone-600 dark:text-amber-100 bg-white/70 hover:bg-white/90 dark:hover:bg-amber-800/90 dark:bg-amber-800/70 hover:scale-110 transition-all shadow-lg"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="hidden md:block absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 z-50 font-bold text-2xl lg:text-3xl text-stone-600 dark:text-amber-100 bg-white/70 hover:bg-white/90 dark:hover:bg-amber-800/90 dark:bg-amber-800/70 hover:scale-110 transition-all shadow-lg"
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>

        {/* Wrapper: Width adjusts from 95% on mobile to 92% on desktop */}
        <div className="w-[95%] md:w-[92%] max-w-6xl overflow-hidden py-3">
          <div
            ref={sliderRef}
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="flex gap-4 md:gap-6"
            style={{
              // Responsive gap calculation for the transform math
              transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * (window.innerWidth < 768 ? 1 : 1.5)}rem))`,
              transition: isTransitioning
                ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          >
            {infiniteSlides.map((item) => (
              <div
                key={item.key}
                className="shrink-0 w-full rounded-3xl p-6 md:py-6 flex flex-col sm:flex-row items-center justify-around bg-white/40 dark:bg-orange-200/20 backdrop-blur-md border border-amber-600/20 shadow-md hover:shadow-xl transition-all"
              >
                <div className="mb-2 sm:mb-0 sm:order-2">
                  <img
                    src={item.image}
                    className="w-32 h-32 xs:w-40 sm:w-48 xs:h-40 sm:h-48 rounded-full object-cover shadow-lg"
                    alt={item.title}
                  />
                </div>

                {/* Text Content: Centered on mobile, left-aligned on sm+ */}
                <div className="w-full sm:w-1/2 px-4 md:px-6 text-center sm:text-left sm:order-1">
                  <p className="text-[12px] md:text-base text-gray-600 dark:text-zinc-300 tracking-widest uppercase">
                    {item.para}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-semibold tracking-wide mb-3 mt-1 uppercase lg:leading-12 leading-tight dark:text-white">
                    {item.title}
                  </h2>
                  <button className="bg-orange-400/70 dark:bg-orange-500/70 hover:bg-orange-500 text-gray-800 dark:text-zinc-300 font-medium px-4 md:px-5 py-2 rounded-xl transition-all text-base md:text-lg">
                    User Experience
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                getRealIndex() === index
                  ? "bg-amber-600 dark:bg-amber-200 w-5"
                  : "bg-amber-600/40 dark:bg-amber-300/40 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
