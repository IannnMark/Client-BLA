import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";

import { myOrders, clearErrors } from "../../actions/orderActions";

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
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const data = {
      columns: [
        {
          label: "Ordered Merchandise",
          field: "orderedMerch", // Add a new field for requested documents
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
          label: "Date of Request",

          field: "dateofRequest",

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
      const formattedCreatedDate = order.dateofRequest
        ? new Date(order.dateofRequest).toLocaleDateString()
        : "N/A";
      const formattedReleaseDate = order.dateRelease ? new Date(order.dateRelease).toLocaleDateString() : "N/A";

      const orderedMerch =
        order.orderItems &&
        order.orderItems.length > 0 &&
        order.orderItems.map((item) => item.name).join(", ");

      data.rows.push({
        orderedMerch: orderedMerch,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        dateofRequest: formattedCreatedDate,
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

      <h1 className="my-5">My Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default ListOrders;
