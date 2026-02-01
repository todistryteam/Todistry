import CTA from "@/src/components/CTA";
import Layout from "../src/layout/Layout";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { useEffect, useState, React } from "react";
import { userLogin } from "./api/api";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password are required")
    .min(6, "Password should be at least 6 characters long"),
});

const LoginPage = () => {
  //const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [captchaValue, setCaptchaValue] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loginData, setLoginData] = useState();
  const [settingData, setSettingData] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to set token with expiration time
const setTokenWithExpiration = (userObj,token, expirationMinutes) => {
  const expirationTime = new Date().getTime() + expirationMinutes * 60 * 1000;
  localStorage.setItem("userObj", userObj);
  localStorage.setItem("accessTokenUser", token);
  localStorage.setItem("tokenExpiration", expirationTime);
}; 


  const onSubmit = async (formData) => {
    console.log("login formData", formData);
    setLoading(true);
    if (settingData?.IS_GOOGLE_RECAPTCHA.content == 1 && !captchaValue) {
      alert("Please complete the CAPTCHA");
      return;
    }

    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };

      const response = await userLogin(data);
      console.log("response.data", response.data);
      if (response.status === 200) {
        if (response.data.success == 1) {
          setErrorMessage("");
          // Handle successful login
          toast.success("Login Successfully");
          setTokenWithExpiration(JSON.stringify(response.data),response?.data?.data?.accesstoken, 30);
           
          const myTimeout = setTimeout(function () {
            router.push("/");
          }, 2500);
          // Redirect to dashboard or any other page
        } else if (response.data.success === 0) {
          toast.error(response.data.message);
          setErrorMessage(response.data.message);
        } else {
          toast.error(
            "Sorry, there was an error trying to send your message. Please try again later."
          );
          setErrorMessage(
            "Sorry, there was an error trying to send your message. Please try again later."
          );
        }
      } else {
        toast.error(
          "Sorry, there was an error trying to send your message. Please try again later."
        );
        setErrorMessage(
          "Sorry, there was an error trying to send your message. Please try again later."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your inputs.");
      setErrorMessage(
        "Sorry, there was an error trying to send your message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    router.push("/signup"); // Redirect to the Sign Up page
  };

  const getPageData = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  return (
    <Layout navLight getStartText navHoverColor="nav-orange-red-hover">
      <section className="wide-60 cta-section division">
        <div className="container">
          {/* Title */}
          <h2 className="h2-sm mb-0 text-center">{loginData?.title}</h2>

          <div className="row d-flex pt-50">
            <div className="col-lg-6 col-xl-6">
              <div className="txt-block left-column">
                <span className="section-id txt-upcase mb-10 orange-color">
                  {loginData?.section_title}
                </span>

                <img
                  src="/images/login-page.jpg"
                  width={800}
                  alt="Login User"
                  className="img-fluid"
                />

                <p className="p-l">{loginData?.description}</p>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <Row className="align-items-center justify-content-center g-0">
                <Col xxl={12} lg={12} md={12} xs={12} className="py-8 py-xl-0">
                  {/* Card */}
                  <Card className="smooth-shadow-md">
                    {/* Card body */}
                    <Card.Body className="p-6">
                      {/* Form */}
                      {errorMessage && (
                        <div className="col-lg-12 contact-form-msg">
                          <div className="alert alert-danger">
                            {errorMessage}
                          </div>
                        </div>
                      )}
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* <div> */}
                        {/* Button */}
                        {/* <div className="row ml-30">
                            <Button variant="warning" className="ml-5 mt-5 col-lg-5 btn btn-violet-red tra-red-hover submit" type="submit" disabled={loading}>
                              {loading ? "Signing in..." : "Login With Google"}
                            </Button>
                            <Button variant="primary" className="ml-5 mt-5 col-lg-5 btn btn-purple tra-red-hover submit" type="submit" disabled={loading}>
                              {loading ? "Signing in..." : "Login With Facebook"}
                            </Button>
                          </div>
                        </div>

                        <hr/> */}

                        <Form.Group className="mb-3" controlId="username">
                          <Form.Label>Email</Form.Label>

                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                {...field}
                                isInvalid={errors.email}
                              />
                            )}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                          {/* Password */}
                          <Form.Label>Password</Form.Label>

                          <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                              <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                {...field}
                                isInvalid={errors.password}
                              />
                            )}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <div>
                          {/* Button */}
                          <div className="d-grid">
                            <Button
                              variant="primary"
                              className="btn btn-orange-red tra-red-hover submit"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Signing in..." : "Sign In"}
                            </Button>
                          </div>
                        </div>
                      </Form>
                      <div className="text-center mt-3">
                        <p>
                          Don't have an account?{" "}
                          <a variant="link" onClick={handleSignUpRedirect}>
                            Sign Up
                          </a>
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          {/* End row */}
        </div>{" "}
        {/* End container */}
        <ToastContainer />
      </section>

      <CTA />
    </Layout>
  );
};

export default LoginPage;
