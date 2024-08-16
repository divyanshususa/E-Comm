import HeroSection from "./component/HeroSection";
import { useProductContext } from "./context/Productcontext";
const About = () => {
  const { myName } = useProductContext();
  const data = {
    name: " Our Ecommerce",
  };

  return (
    <>
      {myName}
      <HeroSection myData={data} />{" "}
    </>
  );
};

export default About;
