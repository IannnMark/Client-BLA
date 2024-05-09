import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  clearErrors,
  deleteOrder,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./admin.css";

const OrdersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showProductFilter, setShowProductFilter] = useState(false);
  const [showGradeFilter, setShowGradeFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const generatePDF = () => {
    const dataTableContent = document.querySelector(
      ".custom-mdb-datatable .dataTable"
    );

    const loggedInUser = "Jonara De Jesus";

    if (dataTableContent) {
      // Get logo image data
      const logoImg = new Image();
      logoImg.src = "/images/school_logo.png"; // Replace 'path_to_your_logo_image.png' with the actual path to your logo image

      // Fetch current date
      const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Assume you have the name of the logged-in user in a variable named loggedInUser
      const printedBy = "Printed by: " + loggedInUser;

      html2canvas(dataTableContent, { scale: 0.9 }).then((canvas) => {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pdf.internal.pageSize.getWidth() * 0.9; // Adjust the scale factor as needed
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const marginTop = 70; // Adjust the top margin as needed
        const title = "Blessed Land Academy of Taguig";
        const additionalText = "Reports for Order List";
        const datePrintedText = "Date Printed: " + currentDate; // Format the date printed

        // Calculate the x-coordinate to center the title horizontally
        const textWidth =
          pdf.getStringUnitWidth(title) * pdf.internal.getFontSize();
        const centerX = (pdf.internal.pageSize.getWidth() - textWidth) / 2 + 80; // Adjust the left margin as needed
        const texttWidth =
          pdf.getStringUnitWidth(additionalText) * pdf.internal.getFontSize();
        const centterX =
          (pdf.internal.pageSize.getWidth() - texttWidth) / 5 + 68; // Adjust the left margin as needed
        const datePrintedWidth =
          pdf.getStringUnitWidth(datePrintedText) * pdf.internal.getFontSize();
        const datePrintedX =
          (pdf.internal.pageSize.getWidth() - datePrintedWidth) / 5 + 145; // Center the date printed horizontally
        const printedByWidth =
          pdf.getStringUnitWidth(printedBy) * pdf.internal.getFontSize();
        const printedByX =
          (pdf.internal.pageSize.getWidth() - printedByWidth) / 1 + 2; // Center the printed by horizontally

        // Set font style
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12); // Set font size

        // Add logo to the PDF
        pdf.addImage(logoImg, "PNG", 85, 5, 25, 25); // Adjust position and size as needed

        // Add title to the PDF
        pdf.text(title, centerX, 35); // Adjust Y coordinate to move the title down

        // Add additional text to the PDF
        pdf.text(additionalText, centterX, 45); // Adjust Y coordinate to move the additional text down

        // Set font size for date printed text
        pdf.setFontSize(10);

        // Add date printed to the PDF
        pdf.text(datePrintedText, datePrintedX, 60); // Adjust Y coordinate to move the date printed down

        // Add printed by to the PDF
        pdf.text(printedBy, printedByX, 60); // Adjust Y coordinate to move the printed by text down

        // Move the image down by adding a margin
        pdf.addImage(imgData, "PNG", 10, marginTop, imgWidth, imgHeight);
        pdf.save("Order_List.pdf");
      });
    } else {
      console.error("Data table content element not found.");
    }
  };

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("Order deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const getUniqueProducts = () => {
    const uniqueProducts = new Set();

    orders.forEach((order) => {
      if (order.orderItems) {
        order.orderItems.forEach((item) => {
          uniqueProducts.add(item.productName);
        });
      }
    });

    return Array.from(uniqueProducts);
  };

  const toggleDateFilter = () => {
    setShowDateFilter(!showDateFilter);
  };

  const toggleProductFilter = () => {
    setShowProductFilter(!showProductFilter);
  };

  const toggleGradeFilter = () => {
    setShowGradeFilter(!showGradeFilter);
  };

  const toggleStatusFilter = () => {
    setShowStatusFilter(!showStatusFilter);
  };

  const setOrders = () => {
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate)
      );
    });

    const statusFilteredOrders = selectedStatus
      ? filteredOrders.filter(
        (order) =>
          order.orderStatus &&
          String(order.orderStatus).includes(selectedStatus)
      )
      : filteredOrders;

    const productFilteredOrders = selectedProduct
      ? statusFilteredOrders.filter((order) =>
        order.orderItems.some((item) => item.name === selectedProduct)
      )
      : statusFilteredOrders;

    const gradeFilteredOrders = selectedGrade
      ? productFilteredOrders.filter((order) => {
        // Adjust the logic based on your data structure
        // Replace order.grade with the correct path to the grade in your data
        const userGrade = parseInt(order.grade, 10);
        const selectedGradeNum = parseInt(selectedGrade, 10) || 0;

        return userGrade >= selectedGradeNum;
      })
      : productFilteredOrders;

    const sortedFilteredOrders = [...gradeFilteredOrders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    sortedFilteredOrders.reverse();

    const data = {
      columns: [
        // {
        //   label: "Order ID",
        //   field: "id",
        //   sort: "asc",
        // },
        {
          label: "No.", // Add a label for the counter column
          field: "index", // Use a field name for the counter column
          sort: "asc", // Sort the counter column in ascending order
        },
        {
          label: "User Last Name",
          field: "userLastName",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Ordered Merchandise",
          field: "orderedMerch",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Created Date",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Release Date",
          field: "dateRelease",
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
        },
      ],
      rows: [],
    };

    sortedFilteredOrders.forEach((order, index) => {
      const formattedCreatedDate = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString()
        : "N/A";

      const orderedMerch =
        order.orderItems &&
        order.orderItems.length > 0 &&
        order.orderItems.map((item) => item.productName).join(", ");

      const formattedReleaseDate = order.dateRelease
        ? new Date(order.dateRelease).toLocaleDateString()
        : "N/A";

      data.rows.push({
        // id: order._id,
        userLastName: order.user?.lastname,
        numofItems: order.orderItems.length,
        orderedMerch: orderedMerch || "N/A",
        amount: `₱${order.totalPrice}`,
        createdAt: formattedCreatedDate,
        dateRelease: formattedReleaseDate,
        status:
          order.orderStatus &&
            String(order.orderStatus).includes("Received") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          // <Fragment>
          //   <Link
          //     to={`/admin/order/${order._id}`}
          //     className="btn btn-primary py-1 px-2"
          //   >
          //     <i className="fa fa-eye"></i>
          //   </Link>
          //   <button
          //     className="btn btn-danger py-1 px-2 ml-2"
          //     onClick={() => deleteOrderHandler(order._id)}
          //   >
          //     <i className="fa fa-trash"></i>
          //   </button>
          // </Fragment>
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
              style={{ marginLeft: "7.5px", marginBottom: "5px" }}
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2"
              onClick={() => deleteOrderHandler(order._id)}
              style={{ marginLeft: "9.5px" }}
            >
              <i className="fa fa-trash-o"></i>
            </button>
          </Fragment>
        ),
        index: index + 1, // New field to hold the sequential number
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />

      <div className="row">
        <div className="col-12 col-md-1">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>

            <div className="row my-4">
              <div className="col-md-3">
                <button className="toggle-button" onClick={toggleDateFilter}>
                  Filtered by Date
                </button>
                <br />
                <br />
                {showDateFilter && (
                  <div
                    className="date-input-section"
                    style={{ marginLeft: "30px", fontWeight: "bold" }}
                  >
                    <div>
                      <label style={{ marginRight: "5px" }}>Start Date: </label>
                      <input
                        style={{ fontWeight: "bold" }}
                        type="date"
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                      />
                    </div>
                    <div className="mt-3">
                      <label style={{ marginRight: "10px" }}>End Date: </label>
                      <input
                        style={{ fontWeight: "bold" }}
                        type="date"
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-3">
                <button className="toggle-button" onClick={toggleProductFilter}>
                  Filtered by Products
                </button>
                <br />
                <br />
                {showProductFilter && (
                  <div
                    className="product-input-section"
                    style={{ marginLeft: "80px", fontWeight: "bold" }}
                  >
                    <label style={{ marginRight: "10px" }}>Product: </label>
                    <select
                      style={{ fontWeight: "bold" }}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      value={selectedProduct}
                    >
                      <option value="">All</option>
                      {getUniqueProducts().map((product, index) => (
                        <option key={index} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="col-md-3">
                <button className="toggle-button" onClick={toggleGradeFilter}>
                  Filtered by Grade
                </button>
                <br />
                <br />
                {showGradeFilter && (
                  <div
                    className="grade-input-section"
                    style={{ marginLeft: "70px", fontWeight: "bold" }}
                  >
                    <label style={{ marginRight: "10px" }}>Grade: </label>
                    <select
                      style={{ fontWeight: "bold" }}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      value={selectedGrade}
                    >
                      <option value="">All</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="col-md-3">
                <button className="toggle-button" onClick={toggleStatusFilter}>
                  Filtered by Status
                </button>
                <br />
                <br />
                {showStatusFilter && (
                  <div
                    className="status-input-section"
                    style={{ marginLeft: "70px", fontWeight: "bold" }}
                  >
                    <label style={{ marginRight: "5px" }}>Status: </label>
                    <select
                      style={{ fontWeight: "bold" }}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      value={selectedStatus}
                    >
                      <option value="">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Received">Received</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div class="row ml-4">
              <div class="col-6 col-sm-3">
                <button onClick={generatePDF} class="button-28">
                  Generate PDF
                </button>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3 custom-mdb-datatable"
                bordered
                striped
                hover
                noBottomColumns
                responsive
                searching={true} // Enable searching
                searchLabel="Search..." // Customize search input placeholder
                entriesLabel="Show entries"
                entriesOptions={[10, 20, 30, 40, 50, 100, 200, 300]}
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

export default OrdersList;

