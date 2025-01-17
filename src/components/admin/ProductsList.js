import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

// import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";

import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductsList = () => {

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      //   alert.error(error);

      dispatch(clearErrors());
    }

    if (deleteError) {
      // alert.error(deleteError);

      dispatch(clearErrors());
    }

    if (isDeleted) {
      // alert.success("Product deleted successfully");

      navigate("/admin/products");

      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);
  // [dispatch, error, isDeleted, deleteError, navigate]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Codename",
          field: "codename",
          sort: "asc",
        },

        {
          label: "Name",

          field: "productName",

          sort: "asc",
        },

        {
          label: "Price",

          field: "price",

          sort: "asc",
        },

        {
          label: "Stock",

          field: "stock",

          sort: "asc",
        },

        {
          label: "Images",

          field: "images",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        codename: product.codename,

        productName: product.productName,

        price: `₱${product.price}`,

        stock: product.stock,

        images: (
          <a href={product.images[0].url} target="_blank" rel="noopener noreferrer">
            <img
              src={product.images[0].url}
              alt={product.name}
              className="product-image"
              style={{ width: "80px", height: "80px" }}
            />
          </a>
        ),

        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment style={{ backgroundColor: "lightgray" }}>
      <MetaData title={"All Products"} />

      <div className="row">
        <div className="col-12 col-md-1">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-555" style={{ marginTop: "30px" }}>All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                striped
                hover
                noBottomColumns
                responsive
                searching={false}
                entriesLabel="Show entries"
                entriesOptions={[10, 20, 30]}
                infoLabel={["Showing", "to", "of", "entries"]}
                paginationLabel={["Previous", "Next"]}
                responsiveSm
                responsiveMd
                responsiveLg
                responsiveXl
                noRecordsFoundLabel="No records found"
                paginationRowsPerPageOptions={[10, 20, 30]}
                pagingTop
                pagingBottom
                paginationLabels={["Previous", "Next"]}
                style={{
                  fontSize: "16px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
                // Add custom styling for cells based on request status
                tbodyTextBlack
                tbodyBorderY
                tbodyBorderX
                tbodyBorderBottom
                tbodyBorderTop
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
