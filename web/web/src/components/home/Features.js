const Features = ({data}) => {
  return (
    <section id="features-2" className="wide-60 features-section division bg-gray">
      <div className="container">
        {/* FEATURES-2 WRAPPER */}
        {/* TEXT BLOCK */}
        <div className="row align-items-center">
          <div className="col">
            <div className="txt-block text-center wow fadeInLeft">
              {/* Section ID */}
              <span className="section-id orange-red-color txt-upcase mb-10">{data?.title}</span>
              {/* Title */}
              <h2 className="h2-xs">{data?.short_description}</h2>
            </div>
          </div>{" "}
        </div>
        {/* END TEXT BLOCK */}
        <div className="fbox-2-wrapper text-center pt-20">
          <div className="row row-cols-1 row-cols-md-3">
            {data?.features &&
              data?.features.map((single, key) => {
                return (
                  <div key={key}>
                    <div className="col">
                      <div className="fbox-2 mb-40 wow fadeInUp">
                        {/* Icon */}
                        <div className="fbox-ico-center ico-65 shape-ico orange-red-color">
                          <img
                            className="ico-bkg"
                            src="/images/ico-bkg.png"
                            alt="ico-bkg"
                          />
                          <span className={single?.icon} />
                        </div>
                        {/* Text */}
                        <div className="fbox-txt-center">
                          {/* Title */}
                          <h5 className="h5-md">{single?.title}</h5>
                          {/* Text */}
                          <p className="p-lg">
                            {single?.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
        </div>
        {/* END FEATURES-2 WRAPPER */}
      </div>
      {/* End container */}
    </section>
  );
};

export default Features;
