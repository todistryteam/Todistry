import Link from "next/link";
import { getShortDescription, getImageUrl } from "../../utils/helper";

const BlogCard = ({ single }) => {
  let shortDescription = getShortDescription(
    single?.description,
    330,
    "isReadMore"
  );

  return (
    <>
      <div className="row grid mt-10">
        {/* Image */}
        <div className="fbox-8 mb-10 wow fadeInUp col-lg-3 col-md-3 col-sm-3 col-xs-12 mr-10 p-2">
          <div className="fbox-img bg-whitesmoke-gradient">
            <Link href={`blog${single?.link}`} title={single?.title}>
              <img
                className="img-fluid rounded"
                src={getImageUrl(single?.image)}
                alt={single?.title}
              />
            </Link>
          </div>
        </div>
        {/* Title */}
        <div className="col-lg-6 col-md-6 col-sm-5 col-xs-12 mr-10 mt-1">
          <div className="orange-red-color text-left">
            TODISTRY - FAMILY TREE CASE STUDY
          </div>
          <h5 className="h5-md text-left">
            <Link href={`blog${single?.link}`} title={single?.title}>
              {getShortDescription(single?.title, 35)}
            </Link>
          </h5>
          
          <div dangerouslySetInnerHTML={{ __html: shortDescription }}></div>

          <div className="orange-red-color">
            <Link href={`blog${single?.link}`} title={single?.title}>Read More</Link>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default BlogCard;
