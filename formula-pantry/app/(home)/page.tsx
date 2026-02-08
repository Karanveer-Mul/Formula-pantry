import Hero from "./component/Hero";
import Regulations from "./component/Regulations/Regulations";
import LatestNewsSection from "./component/LatestNews/LatestNewsSection";

export const Home = () => {
  return (
    <div className="w-full overflow-hidden lg:text-[8px]">
      <Hero />
      <Regulations />
      <LatestNewsSection />
    </div>
  );
};

export default Home;
