import Modal from "react-modal";

Modal.setAppElement("#__next"); // This is important for accessibility

import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format, parse } from "date-fns";
import { UpdateMemberData,DeleteMemberData,UndoMemberData } from "@/pages/api";
import Swal from 'sweetalert2'; //add alert 21-04-2025

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  relationShipToAdmin: yup.string().required("Relationship is required"),
  memberType: yup.string().required("Member Type is required"),
  siblingType: yup.string().required("Sibling Type is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("last Name is required"),
  //image: yup.string().required("Image is required"),
});

const nameSuffixOptions = [
  { value: "", label: "Select" },
  { value: "sr", label: "Sr." },
  { value: "jr", label: "Jr." },
  { value: "i", label: "I" },
  { value: "ii", label: "II" },
  { value: "iii", label: "III" },
  { value: "iv", label: "IV" },
  { value: "v", label: "V" },
  { value: "vi", label: "VI" },
  { value: "vii", label: "VII" },
  { value: "viii", label: "VIII" },
  { value: "ix", label: "IX" },
  { value: "x", label: "X" },
  { value: "esq", label: "Esq." },
  { value: "phd", label: "Ph.D." },
  { value: "md", label: "M.D." },
  { value: "dds", label: "D.D.S." },
  { value: "jd", label: "J.D." },
  { value: "dvm", label: "D.V.M." },
  { value: "mba", label: "MBA" },
  { value: "ms", label: "M.S." },
  { value: "ma", label: "M.A." },
  { value: "mdiv", label: "M.Div." },
  { value: "rn", label: "R.N." },
  { value: "cpa", label: "CPA" },
  { value: "pe", label: "P.E." },
  { value: "reverend", label: "Reverend" },
  { value: "bishop", label: "Bishop" },
  { value: "pastor", label: "Pastor" },
  { value: "rabbi", label: "Rabbi" },
  { value: "imam", label: "Imam" },
  { value: "capt", label: "Capt." },
  { value: "lt", label: "Lt." },
  { value: "major", label: "Major" },
  { value: "col", label: "Col." },
  { value: "general", label: "General" },
  { value: "admiral", label: "Admiral" },
  { value: "hon", label: "Hon." },
  { value: "amb", label: "Amb." },
  { value: "prof", label: "Prof." },
  { value: "dr", label: "Dr." },
];

//kishan sir
const relationshipOptions = [
  { value: "", label: "Select" },

  // Direct family
  { value: "Self", label: "Self" },
  { value: "Parent", label: "Parent" },
  { value: "Child", label: "Child" },
  { value: "Sibling", label: "Sibling" },
  { value: "Spouse", label: "Spouse" },

  // Step-family
  { value: "Stepfather", label: "Stepfather" },
  { value: "Stepmother", label: "Stepmother" },
  { value: "Stepbrother", label: "Stepbrother" },
  { value: "Stepsister", label: "Stepsister" },
  { value: "Stepson", label: "Stepson" },
  { value: "Stepdaughter", label: "Stepdaughter" },

  // In-laws
  { value: "Father-in-law", label: "Father-in-law" },
  { value: "Mother-in-law", label: "Mother-in-law" },
  { value: "Brother-in-law", label: "Brother-in-law" },
  { value: "Sister-in-law", label: "Sister-in-law" },
  { value: "Son-in-law", label: "Son-in-law" },
  { value: "Daughter-in-law", label: "Daughter-in-law" },

  // Grand level
  { value: "Grandfather", label: "Grandfather" },
  { value: "Grandmother", label: "Grandmother" },
  { value: "Grandson", label: "Grandson" },
  { value: "Granddaughter", label: "Granddaughter" },

  // Great-grand level
  { value: "Great-grandfather", label: "Great-grandfather" },
  { value: "Great-grandmother", label: "Great-grandmother" },
  { value: "Great-grandson", label: "Great-grandson" },
  { value: "Great-granddaughter", label: "Great-granddaughter" },

  // Uncle/Aunt and Niece/Nephew lines
  { value: "Uncle", label: "Uncle" },
  { value: "Aunt", label: "Aunt" },
  { value: "Great-uncle", label: "Great-uncle" },
  { value: "Great-aunt", label: "Great-aunt" },
  { value: "Nephew", label: "Nephew" },
  { value: "Niece", label: "Niece" },
  { value: "Grandnephew", label: "Grandnephew" },
  { value: "Grandniece", label: "Grandniece" },

  // Cousins
  { value: "First Cousin", label: "First Cousin" },
  { value: "Second Cousin", label: "Second Cousin" },
  { value: "Third Cousin", label: "Third Cousin" },
  { value: "Cousin Once Removed", label: "Cousin Once Removed" },
  { value: "Cousin Twice Removed", label: "Cousin Twice Removed" },
  
  // Miscellaneous
  { value: "Friend", label: "Friend" },
  { value: "Guardian", label: "Guardian" },
  { value: "Godparent", label: "Godparent" },
  { value: "Godchild", label: "Godchild" },
  { value: "Adopted Child", label: "Adopted Child" },
  { value: "Foster Parent", label: "Foster Parent" },
  { value: "Foster Child", label: "Foster Child" },
  { value: "Roommate", label: "Roommate" },
  { value: "Partner", label: "Partner" },
  { value: "Fiancé", label: "Fiancé" },
  { value: "Ex-Spouse", label: "Ex-Spouse" },
  { value: "Other", label: "Other" },
  
  // Ancestral tree
  { value: "2nd Great-Grandfather", label: "2nd Great-Grandfather" },
  { value: "2nd Great-Grandmother", label: "2nd Great-Grandmother" },
  { value: "3rd Great-Grandfather", label: "3rd Great-Grandfather" },
  { value: "3rd Great-Grandmother", label: "3rd Great-Grandmother" },
  { value: "4th Great-Grandfather", label: "4th Great-Grandfather" },
  { value: "4th Great-Grandmother", label: "4th Great-Grandmother" },
  { value: "5th Great-Grandfather", label: "5th Great-Grandfather" },
  { value: "5th Great-Grandmother", label: "5th Great-Grandmother" },
  { value: "6th Great-Grandfather", label: "6th Great-Grandfather" },
  { value: "6th Great-Grandmother", label: "6th Great-Grandmother" },
  { value: "7th Great-Grandfather", label: "7th Great-Grandfather" },
  { value: "7th Great-Grandmother", label: "7th Great-Grandmother" },
  { value: "8th Great-Grandfather", label: "8th Great-Grandfather" },
  { value: "8th Great-Grandmother", label: "8th Great-Grandmother" },
  { value: "9th Great-Grandfather", label: "9th Great-Grandfather" },
  { value: "9th Great-Grandmother", label: "9th Great-Grandmother" },
  { value: "10th Great-Grandfather", label: "10th Great-Grandfather" },
  { value: "10th Great-Grandmother", label: "10th Great-Grandmother" },
 
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-125%, -45%)",
    width: "40%", // Responsive width
    maxWidth: "500px", // Max width
    padding: "10px",
    borderRadius: "8px",
    overflow: "hidden", // Enable vertical scrolling
    maxHeight: "90vh", // Limit the height
    zIndex: 1000, // Ensure the modal is on top
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark overlay background
  },
};

const EditNodeModal = ({
  isOpen,
  onRequestClose,
  onCreateNode,
  parentData,
  onRequestclosemodel,
  handleAddRelative,
}) => {
  if (isOpen) onRequestclosemodel();
  var parentfullData = isOpen?.datum;
  var [imagePreview, setImagePreview] = useState(null);
  //var imagePreview = "";
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nameSuffix: "",
      relationShipToAdmin: "",
      nickNameSuffix: "",
      parentId: null,
      memberType: "",
      siblingType: "",
      firstName: "",
      middleName: "",
      lastName: "",
      image: "",
      birthDay: "", // birthDay field as empty string
      email: "", // Email field as empty string
      website: "", // Website URL as empty string
      blog: "", // Blog URL as empty string
      homePhone: "", // Home phone number as empty string
      workPhone: "", // Work phone number as empty string
      mobile: "",
      steetNumber: "",
      aptNumber: "",
      city: "",
      state: "",
      zipCode: "",
      birthCity: "",
      birthState: "",
      birthPlace: "",
      profession: "", // Profession as empty string
      company: "", // Company as empty string
      interests: "", // Interests as empty string
      activities: "", // Activities as empty string
      bioNotes: "",
    },
  });
  const [newNodeData, setNewNodeData] = useState({
    nameSuffix: "",
    relationShipToAdmin: "",
    nickNameSuffix: "",
    firstName: "",
    lastName: "",
    image: "",
    gender: "",
    birthDate: "",
    birthDay: "",
    email: "", // Email field as empty string
    website: "", // Website URL as empty string
    blog: "", // Blog URL as empty string
    homePhone: "", // Home phone number as empty string
    workPhone: "", // Work phone number as empty string
    mobile: "",
    steetNumber: "",
    aptNumber: "",
    city: "",
    state: "",
    zipCode: "",
    birthFirstName: "",
    birthLastName: "",
    nickName: "",
    birthCity: "",
    birthState: "",
    birthPlace: "",
    profession: "", // Profession as empty string
    company: "", // Company as empty string
    interests: "", // Interests as empty string
    activities: "", // Activities as empty string
    bioNotes: "",
  });

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("-").map(Number);
    // month is zero-based in JavaScript Date object
    return new Date(year, month - 1, day);
  }

  if (parentfullData?.data?.birthDate) {
    const birthDate = parseDate(parentfullData?.data?.birthDate); 
    if (!isNaN(birthDate.getTime())) {
      setValue("nameSuffix", parentfullData?.data?.nameSuffix);
      setValue("relationShipToAdmin", parentfullData?.data?.relationShipToAdmin);
      setValue("nickNameSuffix", parentfullData?.data?.nickNameSuffix);
      setValue("firstName", parentfullData?.data?.first_name);
      setValue("middleName", parentfullData?.data?.middle_name);
      setValue("lastName", parentfullData?.data?.last_name);
      setValue("gender", parentfullData?.data?.gender);
      setValue("birthDate", birthDate);
      setValue("birthDay", parentfullData?.data?.birthDay || ""); // Setting birthDay value
      setValue("email", parentfullData?.data?.email || ""); // Setting email value
      setValue("website", parentfullData?.data?.website || ""); // Setting website URL value
      setValue("blog", parentfullData?.data?.blog || ""); // Setting blog URL value
      setValue("homePhone", parentfullData?.data?.homePhone || ""); // Setting home phone value
      setValue("mobile", parentfullData?.data?.mobile || ""); // Setting home phone value
      setValue("steetNumber", parentfullData?.data?.steetNumber || "");
      setValue("aptNumber", parentfullData?.data?.aptNumber || "");
      setValue("city", parentfullData?.data?.city || "");
      setValue("state", parentfullData?.data?.state || "");
      setValue("zipCode", parentfullData?.data?.zipCode || "");
      setValue("workPhone", parentfullData?.data?.workPhone || ""); // Setting work phone value
      setValue("birthFirstName", parentfullData?.data?.birthFirstName || ""); // Setting birthFirstName value
      setValue("birthLastName", parentfullData?.data?.birthLastName || ""); // Setting birthLastName value
      setValue("nickName", parentfullData?.data?.nickName || ""); // Setting nickName value
      setValue("birthCity", parentfullData?.data?.birthCity || ""); // Setting birthCity value
      setValue("birthState", parentfullData?.data?.birthState || ""); // Setting birthState value
      setValue("birthPlace", parentfullData?.data?.birthplace || ""); // Setting birthplace value
      setValue("profession", parentfullData?.data?.profession || ""); // Setting profession value
      setValue("company", parentfullData?.data?.company || ""); // Setting company value
      setValue("interests", parentfullData?.data?.interests || ""); // Setting interests value
      setValue("activities", parentfullData?.data?.activities || ""); // Setting activities value
      setValue("bioNotes", parentfullData?.data?.bioNotes || "");
      imagePreview = parentfullData?.data?.image;
    } else {
      console.error("Invalid date format");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNodeData({
      ...newNodeData,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage] = useState("");

  var response;
  // Button click handler to manually trigger submission
  const handleButtonClick = async () => {
    const formData = getValues(); // Get current form values

    if (formData.birthDate) {
      const data = {
        nameSuffix: formData.nameSuffix,
        relationShipToAdmin: formData.relationShipToAdmin,
        nickNameSuffix: formData.nickNameSuffix,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        gender: formData.gender,
        birthDate: format(new Date(formData.birthDate), "dd-MM-yyyy"),
        image: formData.image,
        id: parentfullData.id,
        birthDay: formData.birthDay,
        email: formData.email, // Email from the form data
        website: formData.website, // Website URL from the form data
        blog: formData.blog, // Blog URL from the form data
        homePhone: formData.homePhone, // Home phone from the form data
        workPhone: formData.workPhone, // Work phone from the form data
        mobile: formData.mobile, // Home phone from the form data
        steetNumber: formData.steetNumber,
        aptNumber: formData.aptNumber,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        birthFirstName: formData.birthFirstName,
        birthLastName: formData.birthLastName,
        nickName: formData.nickName,
        birthCity: formData.birthCity, // Birthplace from the form data
        birthState: formData.birthState, // Birthplace from the form data
        birthplace: formData.birthPlace, // Birthplace from the form data
        profession: formData.profession, // Profession from the form data
        company: formData.company, // Company from the form data
        interests: formData.interests, // Interests from the form data
        activities: formData.activities, // Activities from the form data
        bioNotes: formData.bioNotes, // Bio notes from the form data
      };

      response = await UpdateMemberData(data);
      console.log("response.data", response);
    }

    try {
      if (response.status === 200) {
        if (response.data.success == 1) {
          toast.success("Family Member Added Successfully");
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else if (response.data.success === 0) {
          toast.error(response.data.message);
        } else {
          toast.error(
            "Sorry, there was an error trying to send your message. Please try again later."
          );
        }
      } else {
        toast.error(
          "Sorry, there was an error trying to send your message. Please try again later."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("FamilyTree failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };
// handleUndo
  const handleUndo = async (memberId) => {
    try {
      const data = { 
        id: parentfullData.id
      }; 
      response = await UndoMemberData(data);

      if (response.status === 200) {
        if (response.data.success == 1) {
            toast.success("Undo action successfully.");
            setTimeout(function () {
              location.reload();
            }, 3000);
        }else if (response.data.success === 0) {
            toast.error(response.data.message);
          } else {
            toast.error(
              "Sorry, there was an error trying to send your message. Please try again later."
            );
          }
        } else {
          toast.error(
            "Sorry, there was an error trying to send your message. Please try again later."
          );
        }
      } catch (error) {
        console.log(error);
        toast.error("FamilyTree failed. Please check your inputs.");
      } finally {
        setLoading(false);
      }
    
    
  };

  // handleDelete
  const handleDelete = async () => {
       
    try {
      const data = { 
        id: parentfullData.id
      }; 
      response = await DeleteMemberData(data);

      if (response.status === 200) {
        if (response.data.success == 1) {
           // 2. Show toast with Undo button
            toast.success(
              ({ closeToast }) => (
                <div>
                  Family Member Deleted Successfully
                  <button
                    onClick={async () => {
                      await handleUndo(parentfullData.id);
                      closeToast();
                    }}
                    style={{
                      marginLeft: '10px',
                      color: '#007bff',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Undo
                  </button>
                </div>
              ),
              {
                autoClose: 15000, // 15 seconds
              }
            );
          //toast.success("Family Member Deleted Successfully");
          setTimeout(function () {
            location.reload();
          }, 15000);
        } else if (response.data.success === 0) {
          toast.error(response.data.message);
        } else {
          toast.error(
            "Sorry, there was an error trying to send your message. Please try again later."
          );
        }
      } else {
        toast.error(
          "Sorry, there was an error trying to send your message. Please try again later."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("FamilyTree failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const getParentName = () => {
   // console.log('parentfullData',parentfullData);

    const parent = parentfullData;
    return parent
      ? `${parent.data.first_name} ${parent.data.last_name}`
      : "Unknown";
  };
  const parentName = getParentName();

  return (
    isOpen && (
      <div style={{ backgroundColor: "#e8e8e8", padding: "10px" }}>
        <div>
          <h3 style={{ textAlign: "center" }}> {parentName}</h3>
        </div>
        <Tabs defaultActiveKey="personal" id="profile-tabs">
          {/* Personal Tab */}
          <Tab eventKey="personal" title="Personal">
            <Row className="align-items-center justify-content-start g-0">
              <Col xxl={12} lg={12} md={12} xs={12} className="py-8 py-xl-0">
                {/* Card */}
                {/* <Card className="smooth-shadow-md"> */}
                {/* Card body */}
                {/* <Card.Body className="p-6"> */}
                {/* Form */}
                {errorMessage && (
                  <div className="col-lg-12 contact-form-msg">
                    <div className="alert alert-danger">{errorMessage}</div>
                  </div>
                )}

                <Form encType="multipart/form-data">
                  <Form.Group className="mb-2 mt-4" controlId="firstName">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        First Name
                      </Form.Label>

                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={newNodeData.firstName}
                            onChange={handleInputChange}
                            {...field}
                            isInvalid={errors.firstName}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-2 mt-4" controlId="middleName">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Middle Name
                      </Form.Label>

                      <Controller
                        name="middleName"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            name="middleName"
                            placeholder="Enter Middle Name"
                            value={newNodeData.middleName}
                            onChange={handleInputChange}
                            {...field}
                            isInvalid={errors.middleName}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.middleName?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="lastName">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Last Name
                      </Form.Label>

                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={newNodeData.lastName}
                            onChange={handleInputChange}
                            {...field}
                            isInvalid={errors.lastName}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nameSuffix">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Suffix
                      </Form.Label>
                      <Controller
                        name="nameSuffix"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            as="select"
                            {...field}
                            isInvalid={!!errors.nameSuffix}
                          >
                            {nameSuffixOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Control>
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nameSuffix?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div>
                          <Form.Check
                            inline
                            type="radio"
                            label="Male"
                            value="M"
                            id="genderMale"
                            checked={value === "M"}
                            onChange={() => onChange("M")}
                            onBlur={onBlur}
                            ref={ref}
                            isInvalid={!!errors.gender}
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Female"
                            value="F"
                            id="genderFemale"
                            checked={value === "F"}
                            onChange={() => onChange("F")}
                            onBlur={onBlur}
                            ref={ref}
                            isInvalid={!!errors.gender}
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Rather not say"
                            value="O"
                            id="genderOther"
                            checked={value === "O"}
                            onChange={() => onChange("O")}
                            onBlur={onBlur}
                            ref={ref}
                            isInvalid={!!errors.gender}
                          />
                        </div>
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.gender?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="relationShipToAdmin">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        RelationShip To Admin
                      </Form.Label>
                      <Controller
                        name="relationShipToAdmin"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            as="select"
                            disabled={true}
                            {...field}
                            isInvalid={!!errors.relationShipToAdmin}
                          >
                            {relationshipOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Control>
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.relationShipToAdmin?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <div className="row">
                    {/* <div className="col-12">
                      <Form.Group className="mb-2" controlId="birthDate">
                        <Form.Label>Birth Date</Form.Label>
                        <div>
                          <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select birth date"
                                isInvalid={!!errors.birthDate}
                                className="form-control"
                              />
                            )}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.birthDate?.message}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </div> */}
                    <div className="col-12">
                      <Form.Group className="mb-2" controlId="birthDate">
                        <Form.Label>Birth Date</Form.Label>
                        <Controller
                          name="birthDate"
                          control={control}
                          render={({ field }) => {
                            const [day, setDay] = useState("");
                            const [month, setMonth] = useState("");
                            const [year, setYear] = useState("");
                            const isInitialLoad = useRef(true);

                            // Fetch initial value once
                            useEffect(() => {
                              if (
                                field.value instanceof Date &&
                                !isNaN(field.value)
                              ) {
                                const parsedDate = field.value;
                                setDay(
                                  String(parsedDate.getDate()).padStart(2, "0")
                                );
                                setMonth(
                                  String(parsedDate.getMonth() + 1).padStart(
                                    2,
                                    "0"
                                  )
                                );
                                setYear(String(parsedDate.getFullYear()));
                              }
                            }, [field.value]); // Run only once on mount

                            // Update field when user selects a new date
                            useEffect(() => {
                              if (isInitialLoad.current) {
                                isInitialLoad.current = false;
                                return;
                              }

                              if (day && month && year) {
                                const newDate = new Date(year, month - 1, day);
                                const formattedDate = format(
                                  newDate,
                                  "yyyy-MM-dd"
                                );

                                if (formattedDate !== field.value) {
                                  field.onChange(formattedDate);
                                }
                              }
                            }, [day, month, year]); // Only runs when user changes the values

                            return (
                              <div className="d-flex gap-2">
                                

                                {/* Month Dropdown */}
                                <select
                                  className={`form-control ${
                                    errors.birthDate ? "is-invalid" : ""
                                  }`}
                                  value={month}
                                  onChange={(e) => setMonth(e.target.value)}
                                >
                                  <option value="">Month</option>
                                  {Array.from({ length: 12 }, (_, i) => (
                                    <option
                                      key={i + 1}
                                      value={String(i + 1).padStart(2, "0")}
                                    >
                                      {new Date(0, i).toLocaleString(
                                        "default",
                                        { month: "long" }
                                      )}
                                    </option>
                                  ))}
                                </select>

                                {/* Day Dropdown */}
                                <select
                                  className={`form-control ${
                                    errors.birthDate ? "is-invalid" : ""
                                  }`}
                                  value={day}
                                  onChange={(e) => setDay(e.target.value)}
                                >
                                  <option value="">Day</option>
                                  {Array.from({ length: 31 }, (_, i) => (
                                    <option
                                      key={i + 1}
                                      value={String(i + 1).padStart(2, "0")}
                                    >
                                      {i + 1}
                                    </option>
                                  ))}
                                </select>

                                {/* Year Dropdown to input 26-04-2025 */}
                                <input
                                  type="number"
                                  className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
                                  value={year} 
                                  onChange={(e) => {
                                    let inputYear = e.target.value;
                                    // Take only the first 4 digits
                                    if (inputYear.length > 4) {
                                      inputYear = inputYear.slice(0, 4);
                                    }

                                    console.log('inputYear',inputYear);
                                    const currentYear = new Date().getFullYear();
                                    if(inputYear.length == 4){
                                          if (
                                            !isNaN(inputYear) &&
                                            inputYear <= currentYear &&
                                            inputYear >= currentYear - 100
                                          ) {
                                            setYear(inputYear);
                                          } else {
                                            setYear(''); // Still show the invalid value to user
                                          }
                                    }else {
                                      setYear(inputYear); // Still show the invalid value to user
                                    }
                                    
                                  }}
                                  placeholder="Year"
                                  min={1000}
                                  max={new Date().getFullYear()}
                                />
                              </div>
                            );
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.birthDate?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-12">
                      <Form.Group className="mb-2" controlId="imageUpload">
                        <Form.Label>Upload Image</Form.Label>
                        <div>
                          <Controller
                            name="image"
                            control={control}
                            defaultValue={null}
                            render={({ field: { onChange, value } }) => (
                              <>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className={`form-control ${
                                    errors.image ? "is-invalid" : ""
                                  }`}
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    onChange(file); // Update form state
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () =>
                                        setImagePreview(reader.result);
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                {imagePreview && (
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                      width: "100px",
                                      height: "auto",
                                      marginTop: "10px",
                                    }}
                                  />
                                )}
                              </>
                            )}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.image?.message}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <Form.Group className="mb-3 mt-4" controlId="birthDay">
                    <Form.Label>Birthday</Form.Label>
                    <Controller
                      name="birthDay"
                      control={control}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div>
                          <Form.Check
                            inline
                            type="radio"
                            label="Alive"
                            value="A"
                            id="birthDay"
                            checked={value === "A"}
                            onChange={() => onChange("A")}
                            onBlur={onBlur}
                            ref={ref}
                            isInvalid={!!errors.birthDay}
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Deceased"
                            value="D"
                            id="birthDay"
                            checked={value === "D"}
                            onChange={() => onChange("D")}
                            onBlur={onBlur}
                            ref={ref}
                            isInvalid={!!errors.birthDay}
                          />
                        </div>
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.birthDay?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/* Button */}
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        onClick={handleButtonClick}
                        className="btn btn-orange-red tra-red-hover submit"
                        type="button"
                      >
                        {loading ? "Edit Profile..." : "Edit Profile"}
                      </Button>
                    </div>
                    
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        onClick={() => handleAddRelative(parentfullData)}
                        className="btn btn-orange-red tra-red-hover submit"
                        type="button"
                      >
                        {loading ? "Add Relatives..." : "Add Relatives"}
                      </Button>
                    </div>
                    {parentfullData &&  parentfullData?.main == false && (
                    (
                      (parentfullData?.rels?.children?.length > 0 &&
                      parentfullData?.rels?.spouses?.length === 0)
                      ||
                      (parentfullData?.rels?.children?.length === 0)
                    )
                  ) && (
                    <Button
                        variant="primary"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "Deleting this person will remove all connected descendants. Proceed?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete(parentfullData);
                            }
                          });
                        }}
                        className="btn btn-red tra-red-hover submit"
                        type="button"
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </Button>
                    )}

                    <button
                      type="button"
                      onClick={onRequestClose}
                      style={cancelButtonStyle}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
                {/* </Card.Body>
          </Card> */}
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="contact" title="Contact">
            <Row className="align-items-center justify-content-start g-0 mt-3">
              <Col xxl={12} lg={12} md={12} xs={12} className="py-8 py-xl-0">
                <Form encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="email">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Email
                      </Form.Label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            {...field}
                            isInvalid={errors.email}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="website">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Website
                      </Form.Label>
                      <Controller
                        name="website"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="url"
                            placeholder="Enter Website URL"
                            {...field}
                            isInvalid={errors.website}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.website?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="blog">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Blog
                      </Form.Label>
                      <Controller
                        name="blog"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="url"
                            placeholder="Enter Blog URL"
                            {...field}
                            isInvalid={errors.blog}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.blog?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="homePhone">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Home Number
                      </Form.Label>
                      <Controller
                        name="homePhone"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="tel"
                            placeholder="Enter Home Phone"
                            {...field}
                            isInvalid={errors.homePhone}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.homePhone?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="workPhone">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Work Number
                      </Form.Label>
                      <Controller
                        name="workPhone"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="tel"
                            placeholder="Enter Work Phone"
                            {...field}
                            isInvalid={errors.workPhone}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.workPhone?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="mobile">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Mobile
                      </Form.Label>
                      <Controller
                        name="mobile"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="tel"
                            placeholder="Enter Mobile number"
                            {...field}
                            isInvalid={errors.mobile}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mobile?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="steetNumber">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Steet Number
                      </Form.Label>
                      <Controller
                        name="steetNumber"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Steet Number"
                            {...field}
                            isInvalid={errors.steetNumber}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.steetNumber?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="aptNumber">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        APT./UNIT Number
                      </Form.Label>
                      <Controller
                        name="aptNumber"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter APT./UNIT Number"
                            {...field}
                            isInvalid={errors.aptNumber}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.aptNumber?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="city">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        City
                      </Form.Label>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter city"
                            {...field}
                            isInvalid={errors.city}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="state">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        State
                      </Form.Label>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter state"
                            {...field}
                            isInvalid={errors.state}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="zipCode">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Zip Code
                      </Form.Label>
                      <Controller
                        name="zipCode"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter zip code"
                            {...field}
                            isInvalid={errors.zipCode}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zipCode?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/* Button */}
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        onClick={handleButtonClick}
                        className="btn btn-orange-red tra-red-hover submit"
                        type="button"
                      >
                        {loading ? "Edit Profile..." : "Edit Profile"}
                      </Button>
                    </div>
                    <button
                      type="button"
                      onClick={onRequestClose}
                      style={cancelButtonStyle}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="biography" title="Biography">
            <Row className="align-items-center justify-content-start g-0 mt-3">
              <Col xxl={12} lg={12} md={12} xs={12} className="py-8 py-xl-0">
                <Form>
                  <Form.Group className="mb-3 mt-4" controlId="birthFirstName">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Birth First Name
                      </Form.Label>
                      <Controller
                        name="birthFirstName"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            {...field}
                            isInvalid={errors.birthFirstName}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthFirstName?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="birthLastName">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Birth Last Name
                      </Form.Label>
                      <Controller
                        name="birthLastName"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            {...field}
                            isInvalid={errors.birthLastName}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthLastName?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nickNameSuffix">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Suffix
                      </Form.Label>
                      <Controller
                        name="nickNameSuffix"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            as="select"
                            {...field}
                            isInvalid={!!errors.nickNameSuffix}
                          >
                            {nameSuffixOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Control>
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nickNameSuffix?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nickName">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Nick Name
                      </Form.Label>
                      <Controller
                        name="nickName"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Nick Name"
                            {...field}
                            isInvalid={errors.nickName}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nickName?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  {/* <Form.Group className="mb-3" controlId="birthCity">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Birth City
                      </Form.Label>
                      <Controller
                        name="birthCity"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Birth City"
                            {...field}
                            isInvalid={errors.birthCity}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthCity?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group> */}

                  {/* <Form.Group className="mb-3" controlId="birthState">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Birth State
                      </Form.Label>
                      <Controller
                        name="birthState"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Birth State"
                            {...field}
                            isInvalid={errors.birthState}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthState?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group> */}

                  {/* <Form.Group className="mb-3" controlId="birthPlace">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Birth Place
                      </Form.Label>
                      <Controller
                        name="birthPlace"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Birth Place"
                            {...field}
                            isInvalid={errors.birthPlace}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthPlace?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group> */}

                  <Form.Group className="mb-3" controlId="profession">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Profession
                      </Form.Label>
                      <Controller
                        name="profession"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Profession"
                            {...field}
                            isInvalid={errors.profession}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.profession?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="company">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Company
                      </Form.Label>
                      <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Company"
                            {...field}
                            isInvalid={errors.company}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.company?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="interests">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Interests
                      </Form.Label>
                      <Controller
                        name="interests"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Interests"
                            {...field}
                            isInvalid={errors.interests}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.interests?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="activities">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Activities
                      </Form.Label>
                      <Controller
                        name="activities"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Activities"
                            {...field}
                            isInvalid={errors.activities}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.activities?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="bioNotes">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Label
                        style={{ marginRight: "10px", minWidth: "100px" }}
                      >
                        Bio Notes
                      </Form.Label>
                      <Controller
                        name="bioNotes"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="text"
                            placeholder="Enter Bio Notes"
                            {...field}
                            isInvalid={errors.bioNotes}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.bioNotes?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        onClick={handleButtonClick}
                        className="btn btn-orange-red tra-red-hover submit"
                        type="button"
                      >
                        {loading ? "Edit Profile..." : "Edit Profile"}
                      </Button>
                    </div>
                    <button
                      type="button"
                      onClick={onRequestClose}
                      style={cancelButtonStyle}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    )
  );
};

const buttonStyle = {
  padding: "5px 5px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#888", // Grey color for cancel
};

export default EditNodeModal;
