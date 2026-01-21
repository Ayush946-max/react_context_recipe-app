import { useState, useEffect, useRef } from "react";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef(null);

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

  return (
    <div>
      <div className="relative flex justify-center bg-amber-100 pt-2 transition-colors duration-500 hover:bg-amber-200/70 overflow-hidden">
        {/* Buttons */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 z-50 font-bold text-3xl text-stone-600 bg-white/70 hover:bg-white/90 hover:scale-110 transition-all shadow-lg"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 z-50 font-bold text-3xl text-stone-600 bg-white/70 hover:bg-white/90 hover:scale-110 transition-all shadow-lg"
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>

        <div className="w-[92%] max-w-6xl overflow-hidden py-3">
          <div
            ref={sliderRef}
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            className="flex gap-6"
            style={{
              // The 1.5rem matches the gap-6 (24px) to keep centering perfect
              transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem))`,
              transition: isTransitioning
                ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          >
            {infiniteSlides.map((item) => (
              <div
                key={item.key}
                className="shrink-0 w-full rounded-3xl py-6 flex flex-col sm:flex-row items-center justify-around bg-white/40 backdrop-blur-md border border-amber-600/20 shadow-md hover:shadow-xl transition-all"
              >
                <div className="sm:w-1/2 px-6">
                  <p className="text-xs text-gray-600 tracking-widest uppercase">
                    {item.para}
                  </p>
                  <h2 className="lg:text-4xl sm:text-3xl text-xl font-semibold tracking-wide my-3 uppercase">
                    {item.title}
                  </h2>
                  <button className="bg-orange-400/70 hover:bg-orange-500 text-gray-800 font-semibold px-5 py-2 rounded-xl transition-all">
                    Save Recipe
                  </button>
                </div>
                <img
                  src={item.image}
                  className="w-40 sm:w-48 h-40 sm:h-48 rounded-full object-cover shadow-lg"
                  alt={item.title}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${getRealIndex() === index ? "bg-amber-600 w-5" : "bg-amber-600/40 w-1.5"}`}
            />
          ))}
        </div>

        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="absolute top-4 right-4 px-2 py-1 bg-white/70 rounded-full text-sm z-50"
        >
          <i className={isAutoPlay ? "ri-pause-line" : "ri-play-line"}></i>
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
