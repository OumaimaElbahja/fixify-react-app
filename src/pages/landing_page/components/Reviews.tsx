import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    text: "Service excellent ! Mon iPhone a été réparé en 1h. Je recommande vivement Fixify pour sa rapidité et professionnalisme.",
    rating: 5,
    author: "Marie Laurent",
  },
  {
    id: 2,
    text: "Équipe très professionnelle et prix très compétitifs. Mon ordinateur portable fonctionne comme neuf maintenant !",
    rating: 5,
    author: "Pierre Dubois",
  },
  {
    id: 3,
    text: "Service client exceptionnel et réparation de qualité. Je reviendrai sans hésiter pour mes futurs besoins de réparation.",
    rating: 5,
    author: "Sophie Martin",
  },
  {
    id: 4,
    text: "Réparation rapide et efficace de ma tablette. Le technicien a pris le temps de m'expliquer le problème. Très satisfait !",
    rating: 5,
    author: "Jean Moreau",
  },
];

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % testimonials.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) =>
        (prev - 1 + testimonials.length) % testimonials.length,
    );
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating);
  };

  return (
    <section className="bg-[#ffffff] relative py-12 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-['Poppins'] font-bold text-[#1a3151] text-3xl md:text-4xl lg:text-[36px] leading-[60px]">
            Avis Clients
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonial Cards Container */}
          <div className="relative h-[340px] md:h-[320px] lg:h-[304px] overflow-hidden">
            {/* Cards */}
            {testimonials.map((testimonial, index) => {
              let position = "translate-x-full opacity-0";

              if (index === currentIndex) {
                position = "translate-x-0 opacity-100";
              } else if (
                index ===
                (currentIndex - 1 + testimonials.length) %
                  testimonials.length
              ) {
                position = "-translate-x-full opacity-0";
              }

              return (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${position}`}
                >
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-[654px]">
                      {/* Card */}
                      <div className="bg-[#ffffff] h-[239px] rounded-[26px] shadow-[-4px_4px_4px_0px_rgba(0,0,0,0.25)] p-8 flex flex-col justify-center">
                        {/* Testimonial Text */}
                        <div className="text-center mb-6">
                          <p className="font-['Poppins'] text-[#195ea8] text-lg lg:text-[20px] leading-normal max-w-[529px] mx-auto">
                            {testimonial.text}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="text-center mb-4">
                          <span className="font-['Poppins'] text-[#e17613] text-[20px]">
                            {renderStars(testimonial.rating)}
                          </span>
                        </div>

                        {/* Author */}
                        <div className="text-center">
                          <p className="font-['Poppins'] font-semibold text-[20px] text-[rgba(16,50,84,0.9)]">
                            {testimonial.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center mt-8 gap-4">
            {/* Previous Arrow */}
            <button
              onClick={handlePrevious}
              className="flex h-[50px] w-[50px] items-center justify-center bg-[#E27E21] hover:bg-[#d66a0e] transition-colors rounded-full shadow-lg group"
            >
              <svg
                className="w-6 h-6 transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentIndex
                      ? "bg-[#E27E21]"
                      : "bg-[#D9D9D9]"
                  }`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="flex h-[50px] w-[50px] items-center justify-center bg-[#E27E21] hover:bg-[#d66a0e] transition-colors rounded-full shadow-lg group"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <div className="text-center mt-4">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-[#E27E21] rounded-full animate-pulse"></div>
                <span>Défilement automatique</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}