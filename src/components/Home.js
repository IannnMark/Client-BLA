import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import Index from "./Index.js";

const Home = () => {
  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  let { keyword } = useParams();

  const categories = [
    "Uniform",
    "PE",
    "Grade 7 Books",
    "Grade 8 Books",
    "Grade 9 Books",
    "Grade 10 Books",
    "SHS Books",
    "Lanyard",
  ];

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  useEffect(() => {
    if (error) {
      notify(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, currentPage, keyword, price, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  // let count = productsCount;

  // if (keyword) {
  //   let count = filteredProductsCount;
  // }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Index />
          <MetaData title={"Grab your exclusive school merch now"} />
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;




