import Layout from "../src/layout/Layout";
import Link from "next/link";

import CTA from "@/src/components/CTA";
import { getIntegrations } from "./api/api";
import { useEffect, useState, React } from "react";

const Integrations = () => {
  const [integrationsData, setIntegrationsData] = useState();

  const getPageData = async () => {
      try {
          const res = await getIntegrations();
          if (res?.data?.data) {
            setIntegrationsData(res?.data?.data);
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
      <section id="cta-8" className="bg-snow wide-100 cta-section division">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="section-title title-01 mt-30 mb-50">
                {/* Title */}
                <h2 className="h2-sm">Our Integrations</h2>
                {/* Text */}
                <p className="p-xl">
                  We are constantly adding more integrations, if you do not see the one you are looking for, please reach out to us.
                </p>
              </div>
            </div>
          </div>
          <div className="cta-8-wrapper pc-25">
            <div className="row row-cols-1 row-cols-md-3">
            {integrationsData &&
              integrationsData?.map((single, key) => {
                return (
                  <>
              <div className="col-sm-1 col-md-4 mt-20">
                <Link target="_blank" href={single?.link}>
                  <div className="cta-box cta-top-box bg-white wow fadeInUp">
                    <div className="text-center">
                      <img
                        className="img"
                        src={single?.image}
                        alt={single?.name}
                      />
                    </div>
                  </div>
                </Link>
              </div>
              </>
                );
              })}
            </div>
          </div>{" "}
          {/* End row */}
        </div>{" "}
        {/* End container */}
      </section>

      <CTA />
    </Layout>
  );
};

export default Integrations;
