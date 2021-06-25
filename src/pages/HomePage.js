import React from "react";
import { Hero, Services, Contact, FeaturedProducts } from "../components";
const HomePage = () => {
  return (
    <main>
      <Hero></Hero>
      <FeaturedProducts></FeaturedProducts>
      <Services></Services>
      <Contact></Contact>
    </main>
  );
};

export default HomePage;
