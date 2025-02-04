import { useRef, useEffect, useState } from "react";
import User1 from "../../assets/images/testomonials/user.jpg";
import User2 from "../../assets/images/testomonials/user.jpg";
import User3 from "../../assets/images/testomonials/user.jpg";
import User4 from "../../assets/images/testomonials/user.jpg";
import User5 from "../../assets/images/testomonials/user.jpg";
import User6 from "../../assets/images/testomonials/user.jpg";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export const Testimonials = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [visibleCards, setVisibleCards] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        { name: "John Doe", role: "Farmer", image: User1, rating: 5, text: "DairyCream has revolutionized our farm management." },
        { name: "Jane Smith", role: "Dairy Farmer", image: User2, rating: 4, text: "The sales tools are fantastic and easy to use." },
        { name: "Michael Johnson", role: "Farm Owner", image: User3, rating: 5, text: "Great customer support and usability." },
        { name: "Emily Davis", role: "Dairy Manager", image: User4, rating: 5, text: "Inventory management is so much easier now." },
        { name: "David Wilson", role: "Dairy Farmer", image: User5, rating: 4, text: "Data visualization tools are top-notch." },
        { name: "Sarah Brown", role: "Farm Owner", image: User6, rating: 5, text: "24/7 support is a game-changer." },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setVisibleCards(1);
            else if (window.innerWidth < 1024) setVisibleCards(2);
            else setVisibleCards(3);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const cardWidth = (carouselRef.current.firstChild as HTMLElement)?.clientWidth || 300;
            const scrollAmount = cardWidth * (direction === "left" ? -1 : 1);

            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            setCurrentIndex((prevIndex) =>
                direction === "left"
                    ? Math.max(0, prevIndex - 1)
                    : Math.min(testimonials.length - visibleCards, prevIndex + 1)
            );
        }
    };

    return (
        <div className="bg-white py-10">
            <div className="mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">What Our Users Say</h2>
                <div className="relative">
                    <div ref={carouselRef} className="flex overflow-x-auto scroll-smooth gap-2 scrollbar-hide">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="flex-none w-full sm:w-1/2 lg:w-1/3 p-4">
                                <div className="bg-base-100 shadow-xl p-6 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                                        <div className="ml-4">
                                            <h3 className="text-xl font-bold">{testimonial.name}</h3>
                                            <p className="text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="mb-4">{testimonial.text}</p>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={24} className={i < testimonial.rating ? "text-yellow-500" : "text-gray-300"} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll("left")}
                        disabled={currentIndex === 0}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full disabled:bg-gray-400">
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        disabled={currentIndex >= testimonials.length - visibleCards}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full disabled:bg-gray-400">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
