import { Link } from "react-router-dom";
import buy from "../assets/buy-a-house.png";
import rent from "../assets/rent-a-house-online.png";
import visualize from "../assets/visualization-on-screen.png";

const ctaCard = [
  {
    id: 1,
    title: "Browse Homes",
    link: "/search",
    img: buy,
    description:
      "Find your dream home or investment opportunity. Explore a wide range of properties for sale in your desired location.",
    btn: "browse homes",
  },
  {
    id: 2,
    title: "Rent a Home",
    link: "/search",
    img: rent,
    description:
      "Discover a wide range of rental properties . Explore listings of apartments and houses available for rent.",
    btn: "find rentals",
  },
  {
    id: 3,
    title: "Visualize",
    link: "/visualize",
    img: visualize,
    description:
      "Gain insights into the housing market. Explore real-time data on property trends, rental prices, and market demand.",
    btn: "discover",
  },
];

const Cta = () => {
  return (
    <section className=' bg-slate-100 max-w-full h-fit py-20 flex items-center'>
      <div className='container flex flex-col items-center lg:flex-row'>
        {ctaCard.map((card) => {
          const { id, title, link, img, description, btn } = card;
          return (
            <div
              key={id}
              className='bg-white rounded-lg drop-shadow-xl px-6 pb-11 m-2  max-w-[90%] md:max-w-[70%] lg:max-w-[30%]  text-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 '
            >
              <img src={img} alt={title} className='mx-auto h-60 w-auto' />
              <div className='flex flex-col gap-8 items-center '>
                <h2 className='text-4xl font-bold text-black'>{title}</h2>
                <p className='text-xl text-stone-600'>{description}</p>
                <Link
                  to={link}
                  className='group relative overflow-hidden w-fit border-2 border-indigo-500 rounded-md capitalize bg-white  text-xl py-2 px-4 font-bold '
                >
                  <div class='absolute inset-0 w-0 bg-indigo-500 transition-all duration-[375ms] ease-out group-hover:w-full'></div>
                  <span class='relative text-indigo-500 group-hover:text-white'>
                    {btn}
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Cta;
