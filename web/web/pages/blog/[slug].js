import Layout from "../../src/layout/Layout";
import Header from "../../src/components/srx/Header";
import BlogDetail from "../../src/components/blog/BlogDetail";
import CTA from "@/src/components/CTA";
import { getBlogDetailPage,getHomePageNews } from "../api";
import { useEffect, useState, React } from "react";
import { useRouter } from "next/router";

const BlogDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query
  const [blogData, setBlogData] = useState();
  const [recentPosts, setRecentPosts] = useState([]);

  const getHomePageData = async () => {
    try {
      const resBlog = await getHomePageNews();
      if (resBlog?.data) {        
         for (let i = 0; i < resBlog?.data?.news.length; i++) {
            if(slug && resBlog.data.news[i].slug == slug){
              setBlogData(resBlog?.data?.news[i]);
            }    
        }
       
       const recent = resBlog?.data?.news
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentPosts(recent);

      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (slug) {
        getHomePageData();
    }
  }, [slug]);

  return (
    <Layout navLight getStartText navHoverColor="nav-orange-red-hover">
      {/* <Header data={blogData} titleClass="h2-md white-color" /> */ }
      <BlogDetail data={blogData} recentPosts={recentPosts}  />
      <CTA />
    </Layout>
  );
};

export default BlogDetailPage;
