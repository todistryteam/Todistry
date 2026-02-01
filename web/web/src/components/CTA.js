const CTA = () => {
  return (
    <section id="features-8" className="pt-60 pb-60 features-section division cta-footer">
      <div className="container">
        {/* SECTION TITLE */}
        <div className="row align-items-center">
          <div className="col-6">
            <div className="txt-block wow fadeInLeft">
              {/* Section ID */}
              <span className="section-id txt-upcase mb-10">CONTACT US</span>
              {/* Title */}
              <h2 className="h2-lg white-color">Interested in learning more?</h2>
            </div>
          </div>{" "}

          <div className="col-6">
            <div className="txt-block text-center wow fadeInLeft">
                <a href="/contact-us" className="btn btn-tra-white white-hover">
                    Request Information
                </a>
            </div>
          </div>{" "}
        </div>
      </div>
      {/* End container */}
    </section>
  );
};

export default CTA;
