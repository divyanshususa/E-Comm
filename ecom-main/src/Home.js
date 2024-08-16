import React, { useEffect, useState } from "react";
//import styled from 'styled-components';
import styled from "styled-components";
import Header from "./component/Header";
import HeroSection from "./component/HeroSection";
import Services from "./component/Services";
import Trusted from "./component/Trusted";
import FeatureProduct from "./component/FeatureProduct";

import OfferAds from "./component/Advertisment/OfferAds";

import CategoryNav from "./CategoryNav";
import Coro from "./component/Coro";
import UserService from "./Services/UserService";

const service = UserService();
const Home = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const cat = await service.getAllCategories();
      console.log(cat);
      setAllCategories(cat);
    };
    fetchdata();
  }, []);

  return (
    <>
      {/* <Header/> */}
      {/* <Coro/> */}
      <HeroSection />
      <CategoryNav categories={allCategories} />
      <OfferAds />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
