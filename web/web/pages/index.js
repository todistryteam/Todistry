import Layout from "../src/layout/Layout";

import HomeHeader from "../src/components/home/HomeHeader";
import Features from "../src/components/home/Features";
import SoftwareImg from "../src/components/home/SoftwareImg";
import HowITWorks from "../src/components/home/HowITWorks";
import News from "../src/components/News";
import CustomersReviews from "../src/components/CustomersReviews";
import NumbersFeature from "@/src/components/home/NumbersFeature";
import CTA from "@/src/components/CTA";

import { getHomeHeaderBannerPage, getHomePageFeatures, getHomePageNews, getClientsReview, getHomePageNumbers } from "./api";
import { useEffect, useState, React } from "react";

const Index = () => {
  const [headerData, setHeaderData] = useState();
  const [featuresData, setFeaturesData] = useState();
  const [newsData, setNewsData] = useState();
  const [reviewsData, setReviewsData] = useState();
  const [numbersData, setNumbersData] = useState();

  const getHomePageData = async () => {
      try {
          const res = await getHomeHeaderBannerPage();
          if (res?.data) {
            setHeaderData(res?.data);
          }

          const resFeatures = await getHomePageFeatures();
          if (resFeatures?.data) {
            setFeaturesData(resFeatures?.data);
          }

          let resNews = await getHomePageNews();
          if (resNews?.data) {
            resNews.data.news = resNews?.data?.news?.slice(0, 3)
            setNewsData(resNews?.data);
          }

          const resReview = await getClientsReview();
          if (resReview?.data) {
            setReviewsData(resReview?.data);
          }

          const resNumber = await getHomePageNumbers();
          if (resNumber?.data) {
            setNumbersData(resNumber?.data);
          }
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
    getHomePageData()
  }, []);

  return (
    <Layout navLight getStartText navHoverColor="nav-orange-red-hover">
      <HomeHeader data={headerData} />
      <SoftwareImg />
      <News data={newsData}/>
      <CustomersReviews data={reviewsData} />
      <NumbersFeature data={numbersData} />
      <CTA />
    </Layout>
  );
};

export default Index;
