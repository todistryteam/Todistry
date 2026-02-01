import { getShortDescription,formatDate, getImageUrl } from "../../utils/helper";
import Link from "next/link";

const RecentBlog = ({ recentPosts }) => {
    return (
        <>
            <div className="recent_post">
                <div className=" custom-card card">
                    <div className="card-header">
                        <div className="card-title h5 ">Recent Posts</div>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                        {recentPosts.map(post => (
                            <li className="list-group-item" key={post.link} title={post.title}>
                                <div className="d-flex flex-wrap align-items-center">
                                    <span className="">
                                        <img src={getImageUrl(post?.image)} className="img-fluid" height="100" width="100" alt="..." />
                                    </span>
                                    <div className="flex-fill recent-blog-detail info-container">
                                    <a href={`/blog${post?.link}`} className="fs-14 fw-semibold mb-0 info-title">{post.title}</a>
                                    <p className=" info-description" dangerouslySetInnerHTML={{ __html: getShortDescription(post?.description,25,"isReadMore") }}></p>
                                    <span className=" info-description">{formatDate(post.date)}</span>
                                    </div>
                                </div>
                            </li>
                        ))}   
                    </ul>
                </div>
            </div>
        </div>
      </>
  );
};

export default RecentBlog;