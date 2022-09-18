import React, { useState } from "react";
import Header from "../components/Header/Header";
import Greeting from "./Greeting/Greeting";
import Skills from "./Skills/Skills";
import SkillProgress from "./SkillProgress/SkillProgress";
import Education from "./Education/Education";
import WorkExperience from "./WorkExperience/WorkExperience";
import { StyleProvider } from "../contexts/StyleContext";
import "./Main.css";
import Footer from "../components/Footer/Footer";
import Projects from "./Projects/Projects";
import TopButton from "./TopButton/TopButton";
import Contact from "./Conatct/Contact";
import Twitter from "./twitter-embed/Twitter";

const Main = () => {
  const [isDark, setIsDark] = useState(true);

  //Change theme
  const changeTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem("isDark", isDark);
  };
  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{ isDark, changeTheme: changeTheme }}>
        <Header />
        <Greeting />
        <Skills />
        <SkillProgress />
        <Education />
        <WorkExperience />
        <Projects />
        {/* <Twitter /> */}
        <Contact />
        <Footer />
        <TopButton />
      </StyleProvider>
    </div>
  );
};

export default Main;
