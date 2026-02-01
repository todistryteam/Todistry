import Link from "next/link";

const HomeHeader = ({data}) => {
  return (
    <section id="hero-1" className=" bg-scroll hero-section division" style={{backgroundImage: `url(${data?.image})`}}>
      <div className="container">
        <div className="row d-flex align-items-center">
          {/* HERO TEXT */}
          <div className="col-md-7 col-lg-7">
            <div className="hero-1-txt wow fadeInRight">
              {/* Title */}
              <h2 className="h2-md">
                {data?.title}
              </h2>
              {/* Text */}
              <p className="p-xl">
                {data?.content}
              </p>
              {/* Buttons Group */}
              <div className="btns-group mb-20">
                <Link
                  className="btn btn-orange-red tra-red-hover mr-15"
                  href={data?.link || ''}
                >
                  {data?.button_label || 'Read More'}
                </Link>
              </div>
            </div>
          </div>
          {/* END HERO TEXT */}
          {/* HERO IMAGE */}
          <div className="col-md-5 col-lg-6">
          </div>
        </div>
        {/* End row */}
      </div>
      {/* End container */}
    </section>
  );
};

export default HomeHeader;
