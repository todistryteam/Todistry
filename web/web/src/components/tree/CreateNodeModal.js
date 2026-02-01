import Modal from "react-modal";

Modal.setAppElement("#__next"); // This is important for accessibility

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parse, format } from "date-fns";
import { saveMemberData } from "@/pages/api";

const schema = yup.object().shape({
  nameSuffix: yup.string().required("Suffix is required"),
  //kishan sir
  relationShipToAdmin: yup.string().required("Relationship is required"),
  memberType: yup.string().required("Member Type is required"),
  parentType: yup.string().when("memberType", {
    is: "Parents",
    then: (schema) => schema.required("Parent Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  childType: yup.string().when("memberType", {
    is: "Child",
    then: (schema) => schema.required("Child Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  siblingType: yup.string().when("memberType", {
    is: "Sibling",
    then: (schema) => schema.required("Sibling Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  spouseType: yup.string().when("memberType", {
    is: "Spouse",
    then: (schema) => schema.required("Spouse Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),

  //kishan sir
  gender: yup.string().required("Gender is required"),
  birthDate: yup.string().required("BirthDate is required"),
  birthDay: yup.string().required("Person Status is required"),
  //image: yup.string().required("Image is required"),
});

const CreateNodeModal = ({
  isOpen,
  onRequestClose,
  onCreateNode,
  parentData,
  onRequestclosemodel,
}) => {
  const result = isOpen?.store?.state?.tree?.data?.find(
    (item) => item.data?.id == isOpen?.datum?.id
  );
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
var [imagePreview, setImagePreview] = useState(null);

  var parentfullData = isOpen?.datum;
  if (isOpen) onRequestclosemodel();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      parentId: null,
      nameSuffix: "",
      relationShipToAdmin: "",
      nickNameSuffix: "",
      memberType: "",
      parentType: "",
      siblingType: "",
      siblingType2: "",
      childType: "",
      spouseType: "",
      firstName: "",
      middleName: "",
      lastName: "",
      image: "",
      birthDay: "",
      email: "", // Email field as empty string
      website: "", // Website URL as empty string
      blog: "", // Blog URL as empty string
      mobile: "", // mobile number as empty string
      homePhone: "", // Home phone number as empty string
      workPhone: "", // Work phone number as empty string
      birthFirstName: "", // Birthplace as empty string
      birthLastName: "", // Birthplace as empty string
      nickName: "", // Birthplace as empty string
      birthCity: "", // Birthplace as empty string
      birthState: "", // Birthplace as empty string
      birthPlace: "", // Birthplace as empty string
      profession: "", // Profession as empty string
      company: "", // Company as empty string
      interests: "", // Interests as empty string
      activities: "", // Activities as empty string
      bioNotes: "",
    },
  });
  const [newNodeData, setNewNodeData] = useState({
    parentId: null,
    nameSuffix: "",
    relationShipToAdmin: "",
    nickNameSuffix: "",
    memberType: "",
    parentType: "",
    siblingType: "",
    siblingType2: "",
    childType: "",
    spouseType: "",
    firstName: "",
    middleName:"",
    lastName: "",
    image: "",
    birthDay: "",
    email: "", // Email field as empty string
    website: "", // Website URL as empty string
    blog: "", // Blog URL as empty string
    homePhone: "", // Home phone number as empty string
    mobile: "", // mobile number as empty string
    workPhone: "", // Work phone number as empty string
    birthFirstName: "", // Birthplace as empty string
    birthLastName: "", // Birthplace as empty string
    nickName: "", // Birthplace as empty string
    birthCity: "", // Birthplace as empty string
    birthState: "", // Birthplace as empty string
    birthPlace: "", // Birthplace as empty string
    profession: "", // Profession as empty string
    company: "", // Company as empty string
    interests: "", // Interests as empty string
    activities: "", // Activities as empty string
    bioNotes: "",
    steetNumber: "",
    aptNumber: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNodeData({
      ...newNodeData,
      [name]: value,
    });
  };
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  var response;
  // Button click handler to manually trigger submission
  const handleError = (formErrors) => {
    console.log("Validation errors:", formErrors);
  };

  const handleButtonClick = async (data) => {
    const formData = getValues(); // Get current form values
    //  console.log('Form values on button click:', formData);

    if (formData.birthDate) {
      const data = {
        nameSuffix: formData.nameSuffix,
        relationShipToAdmin: formData.relationShipToAdmin,
        nickNameSuffix: formData.nickNameSuffix,
        memberType: formData.memberType,
        parentType: formData.parentType,
        siblingType: formData.siblingType,
        siblingType2: formData.siblingType2,
        childType: formData.childType,
        spouseType: formData.spouseType,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        motherId: formData.motherId,
        gender: formData.gender,
        birthDate: format(new Date(formData.birthDate), "dd-MM-yyyy"),
        parentId: parseInt(parentfullData?.id) || "0",
        treeLevel: 0,
        image: formData.image,
        birthDay: formData.birthDay,
        email: formData.email, // Email from the form data
        website: formData.website, // Website URL from the form data
        blog: formData.blog, // Blog URL from the form data
        mobile: formData.mobile, // Home phone from the form data
        homePhone: formData.homePhone, // Home phone from the form data
        workPhone: formData.workPhone, // Work phone from the form data
        birthFirstName: formData.birthFirstName,
        birthLastName: formData.birthLastName,
        nickName: formData.nickName,
        birthCity: formData.birthCity,
        birthState: formData.birthState,
        birthPlace: formData.birthPlace,
        profession: formData.profession, // Profession from the form data
        company: formData.company, // Company from the form data
        interests: formData.interests, // Interests from the form data
        activities: formData.activities, // Activities from the form data
        bioNotes: formData.bioNotes, // Bio notes from the form data
        steetNumber: formData.steetNumber,
        aptNumber: formData.aptNumber,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      };

      response = await saveMemberData(data);
    }
    //console.log('response.data', response.data);
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

    // Alternatively, you could call the submit function directly
    //handleSubmit(onSubmit2)(); // Call submit function manually
  };

  const onSubmit2 = async (formData) => {
    console.log("form submit");
  };

  const memberTypeOptions = [
    { value: "", label: "Select" },
    ...(parentfullData?.rels?.father == null ||
    parentfullData?.rels?.mother == null ||
    isNaN(parentfullData?.rels?.father) ||
    isNaN(parentfullData?.rels?.mother)
      ? []
      : []),
    //{ value: 'Parents2', label: 'Parents2' }, { value: "Parents", label: "Parents" }
    // ...(parentfullData?.rels?.father == null ||
    // parentfullData?.rels?.mother == null
    //   ? [{ value: "Parents", label: "Parents" }]
    //   : []),
    //  ...[isNaN(parentfullData?.rels?.father) || isNaN(parentfullData?.rels?.mother) ? { value: "Parents", label: "Parents" } : {}],
    { value: "Parents", label: "Parents" },
    { value: "Siblings", label: "Siblings" },
    { value: "Child", label: "Child" },
    { value: "Spouse", label: "Spouse" },
  ];

  const siblingTypeOptions = [
    { value: "", label: "Select" },
    { value: "biologicalBothParents", label: "Biological both parents" },
    { value: "biologicalOneParent", label: "Step Sibling" },
    { value: "adoptive", label: "Adoptive" },
    { value: "foster", label: "Foster" },
    { value: "god", label: "God" },
  ];

  const spouseTypeOptions = [
    { value: "", label: "Select" },
    { value: "husband", label: "Husband" },
    { value: "wife", label: "Wife" },
    { value: "partner", label: "Partner" },
  ];

  const childTypeOptions = [
    { value: "", label: "Select" },
    { value: "childWithSpouse", label: "Child with Spouse" },
    { value: "childWithPartner", label: "Child with Partner" },
    { value: "childWithNewPartner", label: "Child with New Partner" },
    { value: "adoptive", label: "Adoptive" },
    { value: "foster", label: "Foster" },
    { value: "godChild", label: "God Child" },
  ];

  const siblingType2Options = [
    { value: "", label: "Select" },
    { value: "biologicalMother", label: "Biological Mother" },
    { value: "biologicalFather", label: "Biological Father" },
  ];

  const parentTypeOptions = [
    { value: "", label: "Select" },
    { value: "adoptiveParent", label: "Adoptive Parent" },
    { value: "biological", label: "Biological" },
    { value: "fosterParent", label: "Foster Parent" },
    { value: "godParent", label: "God Parent" },
    { value: "secondaryParent", label: "Step Parent" },
  ];

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

  const [MemberTypeChange, setMemberTypeChange] = useState(false);

  const handleMemberTypeChange = (e) => {
    setMemberTypeChange(e.target.value);
  };

  const [SiblingTypeChange, setSiblingTypeChange] = useState(false);

  const handleSiblingTypeChange = (e) => {
    setSiblingTypeChange(e.target.value);
  };

  const getParentName = () => {
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
          <h3 style={{ textAlign: "center" }}>{parentName}</h3>
        </div>
        <Tabs defaultActiveKey="personal" id="profile-tabs">
          {/* Personal Tab */}
          <Tab eventKey="personal" title="Personal">
            <Row className="align-items-center justify-content-start g-0 mt-3">
              <Col xxl={12} lg={12} md={12} xs={12} className="py-8 py-xl-0">
                {errorMessage && (
                  <div className="col-lg-12 contact-form-msg">
                    <div className="alert alert-danger">{errorMessage}</div>
                  </div>
                )}

                <Form
                  encType="multipart/form-data"
                >
                  <Row>
                      <Col md={12}>
                          <Form.Group className="mb-3" controlId="memberType">
                              <Form.Label>Member Type</Form.Label>
                              <Controller
                                  name="memberType"
                                  control={control}
                                  render={({ field }) => (
                                    <Form.Control
                                      as="select"
                                      {...field}
                                      isInvalid={!!errors.memberType}
                                      onChange={(e) => {
                                        field.onChange(e); // Call the field's onChange handler
                                        handleMemberTypeChange(e); // Update the state
                                      }}
                                      style={{ flex: 1 }} // Ensures the input takes the remaining space
                                    >
                                      {memberTypeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  )}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.memberType?.message}
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Col>
                   </Row>
                  
                  {MemberTypeChange == "Parents" && (
                    <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="parentType">
                            <Form.Label>Parents Type</Form.Label>
                            <Controller
                                name="parentType"
                                control={control}
                                render={({ field }) => (
                                  <Form.Control
                                    as="select"
                                    {...field}
                                    isInvalid={!!errors.parentType}
                                  >
                                    {parentTypeOptions.map((option) => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Control>
                                )}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.parentType?.message}
                              </Form.Control.Feedback>
                            </Form.Group>
                      </Col>
                   </Row>
                  )}

                  {MemberTypeChange == "Child" && (
                    <Row>
                      <Col md={12}>
                          <Form.Group className="mb-3" controlId="childType">
                              <Form.Label>Child Type</Form.Label>
                              <Controller
                                  name="childType"
                                  control={control}
                                  render={({ field }) => (
                                    <Form.Control
                                      as="select"
                                      {...field}
                                      isInvalid={!!errors.childType}
                                    >
                                      {childTypeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  )}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.childType?.message}
                                </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                  </Row> 
                  )}

                  {MemberTypeChange == "Spouse" && (
                    <Row>
                      <Col md={12}>
                          <Form.Group className="mb-3" controlId="spouseType">
                              <Form.Label>Spouse Type</Form.Label>
                              <Controller
                                name="spouseType"
                                control={control}
                                render={({ field }) => (
                                  <Form.Control
                                    as="select"
                                    {...field}
                                    isInvalid={!!errors.spouseType}
                                  >
                                    {spouseTypeOptions.map((option) => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Control>
                                )}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.parentType?.message}
                              </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                  </Row>
                  )}

                  {MemberTypeChange == "Siblings" && (
                    <Row>
                      <Col md={12}>
                          <Form.Group className="mb-3" controlId="siblingType">
                              <Form.Label>Sibling Type</Form.Label>
                              <Controller
                                name="siblingType"
                                control={control}
                                render={({ field }) => (
                                  <Form.Control
                                    as="select"
                                    {...field}
                                    isInvalid={!!errors.siblingType}
                                    onChange={(e) => {
                                      field.onChange(e); // Call the field's onChange handler
                                      handleSiblingTypeChange(e); // Update the state
                                    }}
                                  >
                                    {siblingTypeOptions.map((option) => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Control>
                                )}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.siblingType?.message}
                              </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                  </Row>
                  )}

                  {MemberTypeChange == "Siblings" &&
                    SiblingTypeChange == "biologicalOneParent" && (
                      <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="siblingType2">
                                <Form.Label>Biological One Parent</Form.Label>
                                <Controller
                                    name="siblingType2"
                                    control={control}
                                    render={({ field }) => (
                                      <Form.Control
                                        as="select"
                                        {...field}
                                        isInvalid={!!errors.siblingType2}
                                      >
                                        {siblingType2Options.map((option) => (
                                          <option
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.siblingType2?.message}
                                  </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                      </Row>
                    )}

                  {MemberTypeChange == "Child" &&
                  result?.spouses?.length > 1 ? ( 
                    <Row>
                      <Col md={12}>
                          <Form.Group className="mb-3" controlId="parent">
                              <Form.Label>Parent</Form.Label>
                              <Controller
                                name="motherId"
                                control={control}
                                rules={{ required: "Please select a parent" }}
                                render={({ field }) => (
                                  <Form.Control
                                    as="select"
                                    {...field}
                                    isInvalid={!!errors.motherId}
                                  >
                                    <option value="">Select a parent</option>
                                    {result?.spouses?.map((spouse) => (
                                      <option
                                        key={spouse.data.id}
                                        value={spouse.data.id}
                                      >
                                        {spouse.data.data.first_name}{" "}
                                        {spouse.data.data.last_name}
                                      </option>
                                    ))}
                                  </Form.Control>
                                )}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.parent?.message}
                              </Form.Control.Feedback> 
                          </Form.Group>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}

                  <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
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
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="middleName">
                            <Form.Label>Middle Name</Form.Label>
                            <Controller
                              name="middleName"
                              control={control}
                              render={({ field }) => (
                                <Form.Control
                                  type="text"
                                  name="middleName"
                                  placeholder="Enter First Name"
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
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
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
                        </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="nameSuffix">
                            <Form.Label>Suffix</Form.Label>
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
                        </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="gender">
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
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="relationShipToAdmin">
                            <Form.Label>RelationShip To Admin</Form.Label>
                            <Controller
                              name="relationShipToAdmin"
                              control={control}
                              render={({ field }) => (
                                <Form.Control
                                  as="select"
                                  {...field}
                                  isInvalid={!!errors.relationShipToAdmin}
                                  required
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
                        </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="birthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Controller
                              name="birthDate"
                              control={control}
                              render={({ field }) => {
                                // Set initial values to empty strings, as there is no existing date
                                useEffect(() => {
                                  setDay("");
                                  setMonth("");
                                  setYear("");
                                }, []);

                                // Update birthDate field when day, month, or year changes
                                useEffect(() => {
                                  if (day && month && year) {
                                    const formattedDate = format(
                                      new Date(year, month - 1, day),
                                      "yyyy-MM-dd"
                                    ); // changed format to ISO format
                                    field.onChange(formattedDate);
                                  }
                                }, [month,day, year]);

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
                                    {/* Year Input 26-04-2025*/}
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
                            <Form.Control.Feedback type="invalid" style={{ display: "block"}}>
                              {errors.birthDate?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="imageUpload">
                            <Form.Label>Upload Image</Form.Label>
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
                        </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="birthDay">
                            <Form.Label>Person Status</Form.Label>
                            <Controller
                                name="birthDay"
                                control={control}
                                render={({
                                  field: { onChange, onBlur, value, ref },
                                }) => (
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
                              <Form.Control.Feedback type="invalid" style={{ display: "block"}}>
                                {errors.birthDay?.message}
                              </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                  </Row>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/* Button */}
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        onClick={() => handleSubmit(handleButtonClick,handleError)()}
                        className="btn btn-orange-red tra-red-hover submit"
                        type="button"
                      >
                        {loading ? "Add Profile..." : "Add Profile"}
                      </Button>
                    </div>
                    <div className="d-flex me-2 me-md-0">
                      <button
                        type="button"
                        onClick={onRequestClose}
                        style={cancelButtonStyle}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="contact" title="Contact">
            <Row className="align-items-center justify-content-start g-0 mt-3">
              <Col xxl={12} lg={12} md={12} xs={12} className="py-8 py-xl-0">
                <Form
                  onSubmit={handleSubmit(onSubmit2)}
                  encType="multipart/form-data"
                >
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
                        {loading ? "Add Profile..." : "Add Profile"}
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
                <Form onSubmit={handleSubmit(onSubmit2)}>
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
                            placeholder="Enter Birth First Name"
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
                            placeholder="Enter Birth Last Name"
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
                        {loading ? "Add Profile..." : "Add Profile"}
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

export default CreateNodeModal;
