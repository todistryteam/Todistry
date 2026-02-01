import Layout from "../src/layout/Layout";
import BlogList from "../src/components/blog/BlogList";
import CTA from "@/src/components/CTA";
import { getHomePageNews } from "./api";
import { useEffect, useState, React } from "react";

const Blog = () => {
  const [newsData, setNewsData] = useState();
  const getBlogListData = async () => {
    try {
      const resNews = await getHomePageNews();
      if (resNews?.data) {
        setNewsData(resNews?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getBlogListData();
  }, []);

  return (
    <Layout navLight getStartText navHoverColor="nav-orange-red-hover">
      <BlogList data={newsData} />
      <CTA />
    </Layout>
  );
};

export default Blog;
