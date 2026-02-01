import BlogCard from "./BlogCard";

const BlogList = ({ data }) => {
  return (
    <section
      id="features-8"
      className="pt-60 pb-60 features-section division bg-gray"
    >
      <div className="container">
        {/* SECTION TITLE */}
        <div className="row justify-content-center mt-40">
          <div className="col-lg-10 col-xl-8">
            <div className="section-title title-01 mb-40">
              {/* Title */}
              <h2 className="orange-red-color">{data?.title}</h2>
              {/* Text */}
            </div>
          </div>
        </div>
        {/* FEATURES-8 WRAPPER */}
        <div className="fbox-8-wrapper">
          {/* Start News Card */}
          {data?.news &&
            data?.news.map((single, key) => {
              return (
                <div key={key}>
                  <BlogCard single={single} />
                </div>
              );
            })}
          {/* End News Card */}
        </div>
        {/* END FEATURES-8 WRAPPER */}
      </div>
      {/* End container */}
    </section>
  );
};

export default BlogList;
