import CTA from "@/src/components/CTA";
import Layout from "../src/layout/Layout";
import { getContactPage } from "./api";
import { useEffect, useState, React } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { saveContact,getSettings } from "./api/api";
import { useForm } from 'react-hook-form';

const Contactus = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [captchaValue, setCaptchaValue] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [contactData, setContactData] = useState();
  const [settingData, setSettingData] = useState();
 
  const onSubmit = async (formData) => {
    
    if (settingData?.IS_GOOGLE_RECAPTCHA.content == 1 && !captchaValue) {
       alert('Please complete the CAPTCHA');
       return;
    }

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.comments,
      };

      const res = await saveContact(data);
      
      if (res.status === 200) {     
        setSuccessMessage('Thank you for getting in touch! We appreciate you contacting us ToDistry.');
        setErrorMessage('');
        reset();  // Reset the form fields
      } else if (res.status === 400) {
        setErrorMessage(res.data.error);
        setSuccessMessage('');
      } else{
        setErrorMessage('Sorry, there was an error trying to send your message. Please try again later.');
        setSuccessMessage('');
      }      
    } catch (error) {
      setErrorMessage('Sorry, there was an error trying to send your message. Please try again later.');
      setSuccessMessage('');
    }
  };


  
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const getPageData = async () => {
    try {
   
      const res1 = await getSettings();
      if (res1?.data?.data) {
        setSettingData(res1?.data?.data);
      }
      const res = await getContactPage();
      if (res?.data) {
        setContactData(res?.data);
      }
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
          <div className="row d-flex pt-50">
            <div className="col-lg-6 col-xl-6">
              <div className="txt-block left-column">
                <span className="section-id txt-upcase mb-10 orange-color">
                  {contactData?.section_title}
                </span>
                {/* Title */}
                <h2 className="h2-sm mb-0">{contactData?.title}</h2>

                <img
                  src="/images/contact_page.png"
                  width={400}
                  alt="Lets Talk"
                  className="img-fluid"
                />

                <p className="p-l">
                  {contactData?.description}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="form-holder">
                <form name="contactform" className="row contact-form" onSubmit={handleSubmit(onSubmit)}>
                  {/* Contact Form Input */}
                  <div className="col-md-12">                   
                    <input className="form-control name" name="name" type="text" placeholder="Enter your name*" id="name" {...register('name', { required: true })} />
                    {errors.name && <span className="text-danger">Name is required</span>}
                  </div>
                  <div className="col-md-12">                  
                    <input type="email" name="email" id="email" className="form-control email"
                      placeholder="Enter your email*" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.email && errors.email.type === 'required' && <span className="text-danger">Email Address is required</span>}
                    {errors.email && errors.email.type === 'pattern' && <span className="text-danger">Invalid email format</span>}
                  </div>
                  <div className="col-md-12">                  
                     <input className="form-control phone" name="phone" type="text" placeholder="Enter your phone number*" id="phone" {...register('phone', { required: true })} />
                     {errors.phone && <span className="text-danger">Phone number is required</span>}
                  </div>
                  <div className="col-md-12">                  
                    <textarea className="form-control message" rows={2} placeholder="Enter your message" defaultValue={""} name="comments" id="comments" {...register('comments', { required: true })} />
                     {errors.comments && <span className="text-danger">Message is required</span>}
                  </div>

                  {/* reCAPTCHA */}
                  <div className="col-md-12 mt-3">
                   {settingData?.IS_GOOGLE_RECAPTCHA.content == 1 && <ReCAPTCHA
                      sitekey="6LcKs6cpAAAAAJx_NssCVdvI7K708Mh3fDV3tSKK" // Replace with your actual site key
                      onChange={handleCaptchaChange }
                    />  }
                  </div>

                  {/* Contact Form Button */}
                  <div className="col-md-12 mt-15 form-btn text-right">
                    <button
                      type="submit"
                      className="btn btn-orange-red tra-red-hover submit"
                    >
                      Send Message
                    </button>
                  </div>
                  
                  {/* Contact Form Messages */}
                  {successMessage && (
                    <div className="col-lg-12 contact-form-msg">
                      <div className="alert alert-success">{successMessage}</div>
                    </div>
                  )}
                  {errorMessage && (
                    <div className="col-lg-12 contact-form-msg">
                      <div className="alert alert-danger">{errorMessage}</div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          {/* End row */}
        </div>{" "}
        {/* End container */}
        
        <div className="container">
          <div className="row d-flex pt-50">
            <div className="col-12">
                {/* <iframe className="mt-3" frameborder="0" height="500" marginheight="0" marginwidth="0" scrolling="no"
                  src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=991+US+Highway+22,+Suite+200+Bridgewater,+NJ+08807&amp;aq=&amp;sll=31.168934,-100.076842&amp;sspn=13.309797,23.269043&amp;ie=UTF8&amp;hq=&amp;hnear=991+U.S.+22+%23200,+Bridgewater,+Somerset,+New+Jersey+08807&amp;t=m&amp;ll=40.58254,-74.606438&amp;spn=0.022815,0.024033&amp;z=14&amp;iwloc=near&amp;output=embed" width="100%"></iframe> */}
            </div>
          </div>
        </div>

      </section>

      <CTA />
    </Layout>
  );
};

export default Contactus;
