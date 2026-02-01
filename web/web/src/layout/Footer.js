import Link from "next/link";

const Footer = () => {
  return (
    <footer id="footer-1" className="footer division">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3 col-lg-4">
            <div className="footer-info mb-20">
              <img
                className="footer-logo mb-25"
                src="/images/todustry-logo.png"
                alt="footer-logo"
              />
              <p className="p-md">
                ToDistry - Welcome to our family tree project! We are a diverse and tightly-knit family, united by a shared history that spans generations and continents. Our family roots run deep, with ancestors who have journeyed from distant lands, bringing with them rich traditions, values, and stories that have shaped who we are today.
              </p>
            </div>
          </div>
          
          <div className="col-sm-6 col-md-3 col-lg-4">
            <div className="footer-links mb-20">
              <h6 className="h6-xl">ToDistry</h6>
              <p className="mb-3">
                  Lorem ipsum address,<br/>
                  Lorem ipsum address line 2<br/>
                  Phone: <a href="tel:(999) 999-9999">(999) 999-9999</a><br/>
                  Email: <a href="mailto:support@todustry.com">support@todustry.com</a>
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-2">
            <div className="footer-links mb-20">
              <h6 className="h6-xl">Info</h6>
              <ul className="foo-links text-secondary clearfix">
                <li>
                  <p className="p-md">
                    <Link href="/about">About Us</Link>
                  </p>
                </li>
                <li>
                  <p className="p-md">
                    <Link href="/contact">Contact Us</Link>
                  </p>
                </li>
                <li>
                  <p className="p-md">
                    <Link target="_blank" href="https://todustry.com/assets/docs/SRX-Brochure-340B.pdf">Legal</Link>
                  </p>
                </li>
                <li>
                  <p className="p-md">
                    <Link target="_blank" href="https://todustry.com/assets/docs/SRX-Brochure-340B.pdf">Privacy Policies</Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-2">
            <div className="footer-links mb-20">
              <h6 className="h6-xl">Follow Us</h6>
              <ul className="list-inline mb-0 social-list-header">
                <li className="list-inline-item">
                    <a href="https://www.facebook.com/" target="_blank" className="primary-link"><span className="flaticon-facebook flaticon-font-size" /></a>
                </li>
                <li className="list-inline-item">
                    <a href="https://twitter.com/" target="_blank" className="primary-link"><span className="flaticon-twitter flaticon-font-size" /></a>
                </li>
                <li className="list-inline-item">
                    <a href="https://www.linkedin.com/" target="_blank" className="primary-link"><span className="flaticon-linkedin flaticon-font-size" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom-footer">
          <div className="row align-items-center">
            <div className="col">
              <div className="footer-copyright">
                <p>
                  Copyright © {new Date().getFullYear()} - ToDistry LLC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
