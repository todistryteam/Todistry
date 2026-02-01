import Link from "next/link";
import { useEffect, useState } from "react";
import { scroll } from "../utils/utils";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const Header = ({ navLight, whiteLogo, navHoverColor, singlePage }) => {
  const [toggle, setToggle] = useState(false);
  const [mobileMenuToggle, setMobileMenuToggle] = useState("");
  const [userData, setUserData] = useState("");
  const [userToken, setUserToken] = useState("");
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onLogoutSubmit = (formData) => {
    toast.success("Logout Successfully");
    localStorage.setItem("userObj", "");
    localStorage.setItem("accessTokenUser", "");
    setTimeout(function () {
      router.push("/");
      location.reload(true);
    }, 500);
  };

  const toggleFun = () => {
    setToggle(!toggle);
    document.querySelector("body").classList.toggle("wsactive");
  };
  const toggleMenu = (value) => {
    setMobileMenuToggle(mobileMenuToggle !== value ? value : "");
  };
  // Function to check token validity
  const isTokenValid = () => {
    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();
    return currentTime < expirationTime;
  };
  useEffect(() => {
    window.addEventListener("scroll", scroll);
    // console.log("Login User Object", localStorage.getItem("userObj"));
    // console.log(
    //   "Login accessTokenUser",
    //   localStorage.getItem("accessTokenUser")
    // );

    if (!isTokenValid() && localStorage.getItem("accessTokenUser")) {
      localStorage.removeItem("userObj");
      localStorage.removeItem("accessTokenUser");
      localStorage.removeItem("tokenExpiration");
      setTimeout(function () {
        router.push("/");
        location.reload(true);
      }, 500);
    }

    setUserData(localStorage.getItem("userObj"));
    setUserToken(localStorage.getItem("accessTokenUser"));
  }, []);

  return (
    <header
      id="header"
      className={`header tra-menu ${navLight ? "navbar-light" : "navbar-dark"}`}
    >
      <div className="header-wrapper">
        {/* MOBILE HEADER */}
        <div className="wsmobileheader clearfix">
          <span className="smllogo">
            <img src="/images/todustry-logo.png" alt="mobile-logo" />
          </span>
          <a
            id="wsnavtoggle"
            onClick={() => toggleFun()}
            className="wsanimated-arrow"
          >
            <span />
          </a>
        </div>
        {/* NAVIGATION MENU */}
        <div className="wsmainfull menu clearfix">
          <div className="wsmainwp clearfix">
            {/* HEADER LOGO */}
            <div className="desktoplogo">
              <Link href="/" className="logo-black">
                <img src="/images/todustry-logo.png" alt="header-logo" />
              </Link>
            </div>
            <div className="desktoplogo">
              <Link href="/" className="logo-white">
                <img
                  src={`${
                    whiteLogo
                      ? "/images/todustry-logo.png"
                      : "/images/todustry-logo.png"
                  }`}
                  alt="header-logo"
                />
              </Link>
            </div>
            {/* MAIN MENU */}
            <nav className="wsmenu clearfix">
              <div className="overlapblackbg" onClick={() => toggleFun()} />
              <ul
                className={`wsmenu-list ${
                  navHoverColor ? navHoverColor : "nav-skyblue-hover"
                }`}
              >
                {/* END MEGAMENU */}
                {/* DROPDOWN MENU */}
                <li>
                  <span
                    className={`wsmenu-click ${
                      mobileMenuToggle === "about" ? "ws-activearrow" : ""
                    }`}
                    onClick={() => toggleMenu("about")}
                  >
                    <i className="wsmenu-arrow" />
                  </span>
                  <Link href={`${singlePage ? "/about" : "#"}`}>
                    Family Tree {!singlePage && <span className="wsarrow" />}
                  </Link>
                  {!singlePage && (
                    <ul
                      className="sub-menu"
                      style={{
                        display: mobileMenuToggle === "about" ? "block" : "",
                      }}
                    >
                      {userToken != "" ? (
                        <li>
                          <Link href="/tree-new">Tree</Link>
                        </li>
                      ) : (
                        <li className="nl-simple">
                          <Link href="/login">Tree</Link>
                        </li>
                      )}
                      <li>
                        <Link href="/">Following</Link>
                      </li>
                      <li>
                        <Link href="/person-list">Person List</Link>
                      </li>
                    </ul>
                  )}
                </li>
                {/* DROPDOWN MENU */}

                {/* SIMPLE NAVIGATION LINK 
                                <li className="nl-simple">
                                    <Link href={`/integrations`}>
                                        Integrations
                                    </Link>
                                </li> */}
                <li className="nl-simple">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="nl-simple">
                  <Link href="/blog">Blog</Link>
                </li>
                <li className="nl-simple">
                  <Link href="/contact">Contact Us</Link>
                </li>

                {userToken ? (
                  <li className="nl-simple">
                    <Link
                      href="/#"
                      className="px-0 ms-0"
                      onClick={handleSubmit(onLogoutSubmit)}
                    >
                      <Button
                        variant="warning"
                        className="col-lg-12 btn btn-violet-red tra-red-hover submit"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Signing out..." : "Logout"}
                      </Button>
                    </Link>
                  </li>
                ) : (
                  <li className="nl-simple d-flex align-items-center">
                    <Link className="px-0" href="/login">
                      Login
                    </Link>
                    <span className="text-dark fw-bold px-0 mx-0">/</span>
                    <Link className="px-0" href="/signup">
                      Signup
                    </Link>
                  </li>
                )}

                {/* SIMPLE NAVIGATION LINK */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
