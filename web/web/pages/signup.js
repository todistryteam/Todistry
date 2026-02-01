import CTA from "@/src/components/CTA";
import Layout from "../src/layout/Layout";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { userRegister, checkEmail } from "./api/api"; // Replace with actual API import
import { parse, format, parseISO } from "date-fns";

// Define schema without email validation in the schema itself
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: yup.string().required("Mobile number is required"),
  gender: yup.string().required("Gender is required"),
  birthDate: yup.date().required("Date of birth is required"),
  password: yup
    .string()
    //.min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .test(
      "len",
      "Password must be at least 8 characters",
      (val) => val && val.length >= 8
    )
    .test("uppercase", "At least one uppercase letter", (val) =>
      /[A-Z]/.test(val)
    )
    .test("number", "At least one number", (val) => /\d/.test(val))
    .test("special", "At least one special character ($, %, @, etc.)", (val) =>
      /[!@#$%^&*(),.?":{}|<>]/.test(val)
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  image: yup.mixed().required("Profile image is required"),
});

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formDataTemp, setFormDataTemp] = useState(null); // Save form data temporarily
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState(""); // To hold email validation error message

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema, { abortEarly: false }),
    mode: "onChange", // This makes validation run on each change
    reValidateMode: "onChange",
  });

  // Function to handle email validation on blur
  const validateEmailOnBlur = async (email) => {
    if (email) {
      const exists = await checkEmail({ email }); // Your API call
      setEmailError(exists.data?.isExist ? "Email already exists" : "");
    }
  };

  const onSubmit = async (formData) => {
    const birthDate = new Date(formData.birthDate);

    if (!isNaN(birthDate.getTime())) {
      formData.birthDate = format(birthDate, "dd-MM-yyyy");
    } else {
      console.error("Invalid date:", formData.birthDate);
      // Handle invalid date case
    }
    console.log("sign up formData", formData);
    setLoading(true);

    try {
      formData.acceptance_at = new Date().toISOString(); // Add acceptance_at field
      const response = await userRegister(formData);
      console.log("response.data", response.data);
      if (response.status === 200) {
        if (response.data.success === 1) {
          toast.success("Registration successful!");
          router.push("/login"); // Redirect to login page after successful registration
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Sorry, there was an error. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const passwordTooltip = (
    <Tooltip id="password-tooltip">
      <div style={{ fontSize: "0.85rem" }}>
        <strong>Password must include:</strong>
        <ul className="mb-0 mt-1 ps-3">
          <li>Minimum 8 characters</li>
          <li>At least one number</li>
          <li>At least one special character ($, %, @, etc.)</li>
          <li>One uppercase letter</li>
        </ul>
      </div>
    </Tooltip>
  );

  const handlePreSubmit = (data) => {
    setFormDataTemp(data); // Save form data temporarily
    setShowTermsModal(true); // Open the Terms modal
  };

  return (
    <Layout navLight getStartText navHoverColor="nav-orange-red-hover">
      <section className="wide-60 cta-section division">
        <div className="container">
          <h2 className="h2-sm mb-0 text-center">Sign Up</h2>
          <div className="row d-flex pt-50">
            <div className="col-lg-6 col-xl-6">
              <div className="txt-block left-column">
                <img
                  src="/images/login-page.jpg"
                  width={800}
                  alt="Login User"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <Row className="align-items-center justify-content-center g-0">
                <Col xxl={12} lg={12} md={12} xs={12} className="py-8 py-xl-0">
                  <Card className="smooth-shadow-md">
                    <Card.Body className="p-6">
                      <Form
                        onSubmit={handleSubmit(handlePreSubmit)}
                        encType="multipart/form-data"
                      >
                        <Row>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>First Name</Form.Label>
                              <Controller
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                  <Form.Control
                                    {...field}
                                    placeholder="Enter First Name"
                                    isInvalid={!!errors.firstName}
                                  />
                                )}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.firstName?.message}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Middle Name</Form.Label>
                              <Controller
                                name="middleName"
                                control={control}
                                render={({ field }) => (
                                  <Form.Control
                                    {...field}
                                    placeholder="Enter Middle Name"
                                    isInvalid={!!errors.middleName}
                                  />
                                )}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.firstName?.message}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Last Name</Form.Label>
                              <Controller
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                  <Form.Control
                                    {...field}
                                    placeholder="Enter Last Name"
                                    isInvalid={!!errors.lastName}
                                  />
                                )}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.lastName?.message}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                onBlur={(e) =>
                                  validateEmailOnBlur(e.target.value)
                                }
                                isInvalid={!!errors.email || emailError}
                                type="email"
                                placeholder="Enter email"
                              />
                            )}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email?.message || emailError}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Mobile Number</Form.Label>
                          <Controller
                            name="mobile"
                            control={control}
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                placeholder="Enter Mobile Number"
                                isInvalid={!!errors.mobile}
                              />
                            )}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.mobileNumber?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Gender</Form.Label>
                          <div>
                            <Controller
                              name="gender"
                              control={control}
                              render={({ field }) => (
                                <div>
                                  <Form.Check
                                    type="radio"
                                    id="male"
                                    label="Male"
                                    value="M"
                                    checked={field.value === "M"}
                                    onChange={() => field.onChange("M")}
                                    inline
                                  />
                                  <Form.Check
                                    type="radio"
                                    id="female"
                                    label="Female"
                                    value="F"
                                    checked={field.value === "F"}
                                    onChange={() => field.onChange("F")}
                                    inline
                                  />
                                  <Form.Check
                                    type="radio"
                                    id="other"
                                    label="Other"
                                    value="O"
                                    checked={field.value === "O"}
                                    onChange={() => field.onChange("O")}
                                    inline
                                  />
                                </div>
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.gender?.message}
                            </Form.Control.Feedback>
                          </div>
                        </Form.Group>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Date of Birth</Form.Label>
                              <Controller
                                name="birthDate"
                                control={control}
                                render={({ field }) => (
                                  <Form.Control
                                    type="date"
                                    {...field}
                                    isInvalid={!!errors.birthDate}
                                  />
                                )}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.birthDate?.message}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group
                              className="mb-3"
                              controlId="imageUpload"
                            >
                              <Form.Label>Upload Image</Form.Label>
                              <div>
                                <Controller
                                  name="image"
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) =>
                                        field.onChange(e.target.files[0])
                                      }
                                      className={`form-control ${
                                        errors.image ? "is-invalid" : ""
                                      }`}
                                    />
                                  )}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.image?.message}
                                </Form.Control.Feedback>
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group className="mb-4">
                          <Form.Label>Password</Form.Label>
                          <OverlayTrigger
                            placement="right"
                            overlay={passwordTooltip}
                            trigger="click"
                          >
                            <span
                              style={{
                                cursor: "pointer",
                                color: "#0d6efd",
                                padding: "0 5px",
                              }}
                            >
                              <InfoCircle />
                            </span>
                          </OverlayTrigger>
                          <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                              <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                {...field}
                                value={passwordInput}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setPasswordInput(e.target.value);
                                }}
                                onFocus={() => setShowPasswordValidation(true)}
                                onBlur={() => setShowPasswordValidation(false)} // Optional: hide on blur
                                isInvalid={!!errors.password}
                              />
                            )}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                          </Form.Control.Feedback>
                          {showPasswordValidation && (
                            <ul className="text-danger mt-2">
                              {passwordValidations.map((item, idx) => (
                                <li
                                  key={idx}
                                  style={{
                                    color: item.isValid ? "green" : "red",
                                    listStyle: "none",
                                  }}
                                >
                                  {item.isValid ? "✅" : "❌"} {item.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Label>Confirm Password</Form.Label>
                          <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                              <Form.Control
                                type="password"
                                placeholder="Enter Confirm Password"
                                {...field}
                                isInvalid={!!errors.confirmPassword}
                              />
                            )}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-grid">
                          <Button
                            variant="primary"
                            className="btn btn-orange-red tra-red-hover submit"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Signing up..." : "Sign Up"}
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
      {showTermsModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              maxWidth: "800px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2>Terms & Conditions</h2>

            <div
              style={{
                textAlign: "left",
                marginBottom: "20px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <p>
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
              </p>
              <p>
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>

            {/* Checkbox */}
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  style={{ marginRight: "8px" }}
                />
                I agree to the Terms & Conditions
              </label>
            </div>

            {/* Accept Button */}
            <button
              className="btn btn-orange-red"
              disabled={!isChecked} // Disabled if not checked
              onClick={() => {
                setShowTermsModal(false);
                onSubmit(formDataTemp);
              }}
              style={{
                border: "solid 1px green",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: isChecked ? "pointer" : "not-allowed",
                fontSize: "16px",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              I Accept
            </button>
          </div>
        </div>
      )}

      <CTA />
    </Layout>
  );
};

export default SignUpPage;
