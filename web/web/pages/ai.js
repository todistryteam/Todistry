import Layout from "../src/layout/Layout";

import Header from "../src/components/ai/Header";
import HowITWorks from "../src/components/ai/HowITWorks";
import CustomersReviews from "../src/components/CustomersReviews";
import CTA from "@/src/components/CTA";

import { getAIPageHeader, getClientsReview } from "./api";
import { useEffect, useState, React } from "react";

const AI = () => {
  const [headerData, setHeaderData] = useState();
  const [reviewsData, setReviewsData] = useState();

  const getPageData = async () => {
      try {
          const res = await getAIPageHeader();
          if (res?.data) {
            setHeaderData(res?.data);
          }

          const resReview = await getClientsReview();
          if (resReview?.data) {
            setReviewsData(resReview?.data);
          }
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
    getPageData()
  }, []);

  return (
    <Layout navLight getStartText navHoverColor="nav-orange-red-hover">
      <Header data={headerData} />
      <HowITWorks />
      <CustomersReviews data={reviewsData} />
      <CTA />
    </Layout>
  );
};

export default AI;
