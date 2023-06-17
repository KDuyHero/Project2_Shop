import { useEffect, useState } from "react";
import Card from "../components/Atoms/Card";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "../axios";
import ListBanner from "../components/Layout/ListBanner";
import { Link } from "react-router-dom";
import { useSearch } from "../context/search";

function HomePage() {
  const [auth, setAuth] = useAuth();
  const [search, setSearch] = useSearch();
  const [hotProducts, setHotProducts] = useState([]);
  const [iphoneProducts, setIphoneProducts] = useState([]);
  const [samsungProducts, setSamsungProducts] = useState([]);
  const getHotProducts = async () => {
    // get 4 products has the best discount
    const response = await axios.get("/products?sort=-discount&limit=4");
    if (response?.data?.products) {
      setHotProducts(response.data.products);
    }
  };

  const getIphoneProducts = async () => {
    // Get 8 products of iphone
    const response = await axios.get("/products?brand=iphone&limit=8");
    if (response?.data?.success) {
      setIphoneProducts(response.data.products);
    }
  };

  const getSamsungProducts = async () => {
    // Get 8 products of samsung
    const response = await axios.get("/products?brand=samsung&limit=8");
    if (response?.data?.success) {
      setSamsungProducts(response.data.products);
    }
  };

  useEffect(() => {
    getHotProducts();
    getIphoneProducts();
    getSamsungProducts();
  }, []);
  return (
    <Layout title="Homepage">
      <div className="container g-0 homepage-wrapper">
        <ListBanner />
        <div className="row mt-3 container-fluid block-content">
          <div className="block-content-title">
            <h2>Khuyến mãi hot</h2>
            <Link to="/products/hot-sale">Xem tất cả</Link>
          </div>
          {hotProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 col-12 no-gutter"
              >
                <Card product={product} />
              </div>
            );
          })}
        </div>

        {iphoneProducts.length > 0 && (
          <div className="row mt-3 container-fluid block-content">
            <div className="block-content-title">
              <h2>Điện thoại Iphone</h2>
              <Link to="/products/brands/iphone">Xem tất cả</Link>
            </div>
            {iphoneProducts.map((product, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-sm-6 col-12 no-gutter"
                >
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        )}

        {samsungProducts.length > 0 && (
          <div className="row mt-3 container-fluid block-content">
            <div className="block-content-title">
              <h2>Điện thoại Samsung</h2>
              <Link to="/products/brands/samsung">Xem tất cả</Link>
            </div>
            {samsungProducts.map((product, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-sm-6 col-12 no-gutter"
                >
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default HomePage;
