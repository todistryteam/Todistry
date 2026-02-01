import RecentBlog from "./RecentBlog";
import { formatDate } from "../../utils/helper";
const BlogDetail = ({ data, recentPosts }) => {
  return (
    <section id="cta-8" className="bg-snow wide-100 cta-section division">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* <div className="fbox-8-wrapper p-8 m-4">
              <div className="">{data?.description}</div>
            </div> */ }
            <div className="col-xl-12" title={data?.title}>
              <div className=" custom-card card">
                <div className="card-body">
                  <p className="fs-18 fw-semibold mb-1">
                    {data?.title}
                  </p>
                  <div className="d-sm-flex align-items-cneter">
                    <div className="d-flex align-items-center flex-fill">
                      <span className="avatar avatar-sm avatar-rounded me-3">
                      {data?.author?.image ? <img src={data?.author?.image} alt="" /> : null}
                      </span>
                      <div>
                        <p className="mb-0 fw-semibold">
                          {data?.author?.name} - {" "}
                          <span className="fs-11 text-muted fw-normal">
                              {formatDate(data?.date)}
                          </span>
                        </p>
                        <p className="mb-0 text-muted"></p>
                      </div>
                    </div>
                    <div className="mt-sm-0 mt-2">
                    {data?.tags.map(tagObj => (
                      <span className="badge bg- bg-primary me-1">{tagObj.name}</span>
                    ))}
                    </div>
                  </div>
                </div>
                <a href="#!">
                  <img
                    src={data?.image}
                    className="card-img rounded-0 blog-details-img"
                    alt="..."
                  />
                </a>
                <div className=" border-bottom border-block-end-dashed card-body">
                  
                </div>
                <div className="card-body">
                  <h6 className="fw-semibold">
                    Seeing with “fresh eyes” – A deeper nature experience
                  </h6>
                  <p className="mb-4 text-muted">
                    Around the time I first learned how to meditate, something
                    amazing happened to me. It happened one day, quite
                    spontaneously. I was working as a lawyer at the time and I
                    used to walk down a little lane way to the train station on
                    my commute to work. It’s not an especially beautiful lane
                    way
                  </p>
                  <p className="mb-5 text-muted">
                    The world is animated by the wind. This invisible,
                    mysterious force can bring a landscape alive. Its absence
                    can cast a calm stillness over the earth. On barren mountain
                    tops its power is barely perceptible; in forests and seas
                    its presence becomes manifest. Winds are wild, and sometimes
                    destructive. When we look deeply into the surely gravity’s
                    law, strong as an ocean current, takes hold of even the
                    strongest thing and pulls it toward the heart of the world.
                    Each thing- each stone, blossom, child – is held in place.
                    Only we, in our arrogance, push out beyond what we belong to
                    for some empty freedom. If we surrendered
                  </p>
                  <div className=" custom-card bg-light mb-5 shadow-none card">
                    <a href="#!" className="card-anchor"></a>
                    <div className="card-body">
                      <blockquote className="blockquote mb-0 text-center">
                        <p className="fs-16 fw-semibold mb-2 text-dark">
                          In nature, nothing is perfect and everything is
                          perfect. Trees can be contorted, bent in weird ways,
                          and they're still beautiful..
                        </p>
                        <footer className="blockquote-footer mt-2 fs-14 op-7">
                          Someone famous as{" "}
                          <cite title="Source Title">-Alice Walker</cite>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                  <p className="mb-5 text-muted">
                    From enchanting nature's beauty quotes that evoke visions of
                    lush meadows full of brilliantly-colored flowers or dense
                    forests with sky-high trees to famous quotes about nature's
                    ever-present—and absolutely fundamental—role in our lives,
                    these 101 quotes about nature will have you itching to get
                    off your couch and get outside. For famous{" "}
                    <b>quotes about nature</b>, we have them here!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <RecentBlog recentPosts={recentPosts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
