import React, { useContext } from "react";
import ExperienceCard from "../../components/ExperienceCard/ExperienceCard";
import { workExperiences } from "../../portfolio";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import "./WorkExperience.css";

const WorkExperience = () => {
  const { isDark } = useContext(StyleContext);
  if (workExperiences.display) {
    return (
      <div id="experience">
        <Fade bottom duration={1000} distance="20px">
          <div className="experience-container" id="workExperience">
            <div>
              <h1 className="experience-heading">Experiences</h1>
              <div className="experience-cards-div">
                {workExperiences.experience.map((card, i) => {
                  return (
                    <ExperienceCard
                      key={i}
                      isDark={isDark}
                      cardInfo={{
                        company: card.company,
                        desc: card.desc,
                        date: card.date,
                        companyLogo: card.companylogo,
                        role: card.role,
                        descBullets: card.descBullets,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  } else {
    return null;
  }
};

export default WorkExperience;
