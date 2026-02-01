import Link from "next/link";
import { getImageUrl } from "../utils/helper";

const News = ({ data }) => {
  return (
    <section
      id="features-8"
      className="pt-60 pb-60 features-section division bg-gray"
    >
      <div className="container">
        {/* SECTION TITLE */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="section-title title-01 mb-40">
              {/* Title */}
              <h2 className="orange-red-color">{data?.title}</h2>
              {/* Text */}
            </div>
          </div>
        </div>
        {/* FEATURES-8 WRAPPER */}
        <div className="fbox-8-wrapper text-center">
          <div className="row row-cols-1 row-cols-md-3">
            {data?.news &&
              data?.news.map((single, key) => {
                return (
                  <div key={key}>
                    <div className="col">
                      <div className="fbox-8 mb-40 wow fadeInUp">
                        {/* Image */}
                        <div className="fbox-img bg-whitesmoke-gradient">
                          <img
                            className="img-fluid"
                            src={getImageUrl(single?.image)}
                            alt={single?.title}
                          />
                        </div>
                        {/* Title */}
                        <Link href={`blog${single?.link}`}>
                          <h5 className="h5-md text-left">{single?.title}</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* End row */}
        </div>
        {/* END FEATURES-8 WRAPPER */}
      </div>
      {/* End container */}
    </section>
  );
};

export default News;
