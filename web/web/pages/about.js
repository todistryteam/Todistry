import CareerCTA from "@/src/components/CareerCTA";
import Layout from "../src/layout/Layout";
import Link from "next/link";
import { getAboutPage } from "./api";
import { useEffect, useState, React } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [aboutData, setAboutData] = useState();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getPageData = async () => {
      try {
          const res = await getAboutPage();
          if (res?.data) {
            setAboutData(res?.data);
          }
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
    getPageData()
  }, []);

  return (
    <Layout navLight getStartText navHoverColor="nav-orange-red-hover">
      <section className="wide-60 cta-section division">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="section-title title-01 mt-30 mb-30">
                <span className="section-id txt-upcase mb-10 orange-color">
                  {aboutData?.mission?.section_title}
                </span>
                {/* Title */}
                <h2 className="h2-sm">{aboutData?.mission?.title}</h2>
                {/* Text */}
                <p className="p-xl">
                  {aboutData?.mission?.description}
                </p>
              </div>
            </div>
          </div>
          {/* End row */}
        </div>{" "}
        {/* End container */}
      </section>

      <section className="bg-snow wide-60 cta-section division bg-gray">
        <div className="container">
          <div className="row d-flex">
            <div className="col-lg-6 col-xl-6">
              <div className="txt-block left-column">
                <span className="section-id txt-upcase mb-10 orange-color">
                  {aboutData?.who_we_are?.section_title}
                </span>
                {/* Title */}
                <h2 className="h2-sm">{aboutData?.who_we_are?.title}</h2>
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="txt-block left-column">
                {/* Text */}
                <div dangerouslySetInnerHTML={{ __html: aboutData?.who_we_are?.description }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-60 pb-60 cta-section division">
        <div className="container">
          <div className="row d-flex">
            <div className="col-lg-6 col-xl-6">
              <div className="txt-block left-column">
                <span className="section-id txt-upcase mb-10 orange-color">
                  {aboutData?.our_story?.section_title}
                </span>
                {/* Title */}
                <h2 className="h2-sm">{aboutData?.our_story?.title}</h2>
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="txt-block left-column">
                <ul className="nav nav-tabs">
                {aboutData?.our_story?.history &&
                  aboutData?.our_story?.history.map((single, key) => {
                  return (
                    <>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === key ? "active" : ""
                          }`}
                          onClick={() => handleTabClick(key)}
                          href="javascript:void(0)"
                        >
                          {single?.tab_name}
                        </a>
                      </li>
                    </>
                  );
                })}
                </ul>

                <div className="tab-content">
                {aboutData?.our_story?.history &&
                  aboutData?.our_story?.history.map((single, key) => {
                    return (
                      <>
                        <div
                          className={`tab-pane ${
                            activeTab === key ? "active" : "fade"
                          }`}
                          id={`${key}`}
                        >
                          <div className="txt-block left-column pt-20">
                            <span className="section-id txt-upcase mb-10 orange-color">
                              {single?.title}
                            </span>
                            {/* Title */}
                            <p className="p-s">
                              {single?.description}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* End row */}
        </div>{" "}
        {/* End container */}
      </section>

      <CareerCTA />
    </Layout>
  );
};

export default About;
