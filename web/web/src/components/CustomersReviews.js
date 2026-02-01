import Slider from "react-slick";

const CustomersReviews = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoPlay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section
      id="reviews-1"
      className="bg-whitesmoke-gradient pt-60 pb-100 reviews-section division slickmargin"
    >
      <div className="container">
        {/* SECTION TITLE */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="section-title title-01 mb-50">
              {/* Title */}
              <h2 className="orange-red-color">{data?.title}</h2>
            </div>
          </div>
        </div>
        {/* TESTIMONIALS CONTENT */}
        <div className="row">
          <div className="col">
            <div className="owl-carousel owl-theme reviews-1-wrapper">
              <Slider {...settings}>
                {data?.clients &&
                  data?.clients.map((single, key) => {
                    return (
                      <div key={key}>
                        <div className="review-1">
                          {/* Quote Icon */}
                          <div className="review-1-ico ico-25">
                            <span className="flaticon-left-quote" />
                          </div>
                          {/* Text */}
                          <div className="review-1-txt">
                            {/* Text */}
                            <p className="p-lg">{single?.content}</p>
                          </div>
                          {/* End Text */}
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
        {/* END TESTIMONIALS CONTENT */}
      </div>
      {/* End container */}
    </section>
  );
};

export default CustomersReviews;
