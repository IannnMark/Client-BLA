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
import BouncingText from './layout/BouncingText';
import './Home.css';

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
    { name: "All", id: "" }, // Add an "All" option with an empty ID
    { name: "Uniform", id: "60f4ad422a6c9b0015ebf1a6" },
    { name: "PE", id: "60f4ad422a6c9b0015ebf1a7" },
    { name: "Grade 7 Books", id: "60f4ad422a6c9b0015ebf1a8" },
    { name: "Grade 8 Books", id: "60f4ad422a6c9b0015ebf1a9" },
    { name: "Grade 9 Books", id: "60f4ad422a6c9b0015ebf1a1" },
    { name: "Grade 10 Books", id: "60f4ad422a6c9b0015ebf1a2" },
    { name: "SHS", id: "60f4ad422a6c9b0015ebf1a3" },
    { name: "Lanyard", id: "60f4ad422a6c9b0015ebf1a4" },
  ];

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  useEffect(() => {
    console.log("Keyword:", keyword);
    console.log("Current Page:", currentPage);
    console.log("Price:", price);
    console.log("Category:", category);

    if (error) {
      notify(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, currentPage, keyword, price, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategoryFilter = (selectedCategory) => {
    if (selectedCategory === "All") {
      setCategory(""); // Set category to empty string for "All" option
    } else {
      const selectedCategoryObj = categories.find(
        (cat) => cat.name === selectedCategory
      );
      if (selectedCategoryObj) {
        setCategory(selectedCategoryObj.id);
      } else {
        setCategory(""); // If category is not found, reset the filter
      }
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Grab your Documents now!"} />
          <br />
          <div className="background-containers">
            <BouncingText />
            <section id="products" className="container mt-5">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="categories-filter-container">
                    <h4 className="filter-heading">Categories</h4>
                    <ul className="category-list">
                      {categories.map((category) => (
                        <li
                          className="category-item toggle-button" // Add toggle-button class
                          key={category.name}
                          onClick={() => handleCategoryFilter(category.name)}
                        >
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="row">
                    {products.map((product) => (
                      <Product key={product._id} product={product} col={4} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
