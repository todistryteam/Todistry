import Link from "next/dist/client/link";
import Layout from "../src/layout/Layout";
const Page404 = () => {
    return (
        <Layout btnCustomHover="btn-skyblue tra-grey-hover">
            <section id="hero-24" className="bg-tra-blue hero-section division">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        {/* 404 PAGE TEXT */}
                        <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                            <div className="hero-24-txt text-center">
                                {/* Image */}
                                <div className="rel hero-24-img">
                                    {/* Image */}
                                    <img
                                        className="img-fluid"
                                        src="/images/error-404.png"
                                        alt="error-404-img"
                                    />
                                    {/* Transparent Header */}
                                    <h2 className="tra-header">404</h2>
                                </div>
                                {/* Text */}
                                <h2 className="h2-md">Page Not Found</h2>
                                <h5 className="h5-md">
                                    The page you are looking for might have been moved , renamed
                                    or might never existed{" "}
                                </h5>
                                {/* Button */}
                                <Link href="/demo-1" className="btn btn-skyblue tra-grey-hover">Back To Home
                                </Link>
                            </div>
                        </div>{" "}
                        {/* END 404 PAGE TEXT */}
                    </div>{" "}
                    {/* End row */}
                </div>{" "}
                {/* End container */}
            </section>
        </Layout>
    );
};

export default Page404;
