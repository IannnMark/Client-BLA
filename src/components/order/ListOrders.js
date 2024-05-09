import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";

import { myOrders, clearErrors } from "../../actions/orderActions";
import "./order.css";

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  const setOrders = () => {
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const data = {
      columns: [
        {
          label: "Product Name",
          field: "orderedMerch",
          sort: "asc",
        },

        {
          label: "Num of Items",

          field: "numOfItems",

          sort: "asc",
        },
        {
          label: "Amount",

          field: "amount",

          sort: "asc",
        },
        {
          label: "Date of Order",

          field: "dateofOrder",

          sort: "asc",
        },
        {
          label: "Release Date",
          field: "releaseDate",
          sort: "asc",
        },

        {
          label: "Status",

          field: "status",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",

          sort: "asc",
        },
      ],

      rows: [],
    };

    sortedOrders.forEach((order) => {
      const formattedCreatedDate = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString()
        : "N/A";
      const formattedReleaseDate = order.dateRelease
        ? new Date(order.dateRelease).toLocaleDateString()
        : "N/A";

      const orderedMerch =
        order.orderItems &&
        order.orderItems.length > 0 &&
        order.orderItems.map((item) => item.productName).join(", ");

      data.rows.push({
        orderedMerch: orderedMerch,
        numOfItems: order.orderItems.length,
        amount: `₱ ${order.totalPrice}`,
        dateofOrder: formattedCreatedDate,
        releaseDate: formattedReleaseDate,
        status:
          order.orderStatus &&
            String(order.orderStatus).includes("Received") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),

        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };
  return (
    <Fragment>
      <MetaData title={"My Orders"} />

      <h1 className="my-55">My Orders</h1>

      <div className="d-flex justify-content-center">
        <Link
          to="/products"
          className="btn btn-warning"
          style={{ marginTop: "20px" }}
        >
          <i className="fa-regular fa-file" style={{ marginRight: "5px" }}></i>{" "}
          View Merch
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-4"
          bordered
          striped
          classNamee="px-3 custom-mdb-datatable"
          hover
          noBottomColumns
          responsive
          searching={true}
          searchLabel="Search..."
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
            fontSize: "18px",
            fontFamily:
              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
          }}
          tbodyTextBlack
          tbodyBorderY
          tbodyBorderX
          tbodyBorderBottom
          tbodyBorderTop
        />
      )}
      <br></br>
      <br></br>
    </Fragment>
  );
};

export default ListOrders;