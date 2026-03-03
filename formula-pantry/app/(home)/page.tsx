import Hero from "./component/Hero";
import Regulations from "./component/Regulations/Regulations";
import LatestNewsSection from "./component/LatestNews/LatestNewsSection";
import Standings from "../results/components/Standings";

export const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <Standings />
      <LatestNewsSection />
      <Regulations />
      
    </div>
  );
};

export default Home;
