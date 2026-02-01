const CareerCTA = () => {
  return (
    <section id="features-8" className="pt-60 pb-60 features-section division cta-footer">
      <div className="container">
        {/* SECTION TITLE */}
        <div className="row align-items-center">
          <div className="col-6">
            <div className="txt-block wow fadeInLeft">
              {/* Section ID */}
              <span className="section-id txt-upcase mb-10">Careers</span>
              {/* Title */}
              <h2 className="h2-lg white-color">We want to work with you!</h2>
            </div>
          </div>{" "}

          <div className="col-6">
            <div className="txt-block wow fadeInLeft">
                <p className="p-l mb-0">
                  Our team is growing! We're on the lookout for passionate, creative, humble people looking to make a difference in sales, product development, engineer and more.
                </p>
                <a href="mailto:careers@todustry.com" className="btn btn-white tra-white-hover">
                  Send Us Your Resume
                </a>
            </div>
          </div>{" "}
        </div>
      </div>
      {/* End container */}
    </section>
  );
};

export default CareerCTA;
