import React, { Fragment, useEffect, useState, useRef } from "react";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productActions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ProductsList = () => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState("");
    const { loading, error, products } = useSelector((state) => state.products);
    const dataTableRef = useRef(null);

    useEffect(() => {
        // Fetch products based on the selected status
        dispatch(getAdminProducts(selectedStatus));

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error, selectedStatus]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Sold":
                return "green";
            case "Restocked":
                return "green";
            default:
                return "black";
        }
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "Product",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Quantity",
                    field: "quantity",
                    sort: "asc",
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc",
                },
                {
                    label: "User",
                    field: "by",
                    sort: "asc",
                },
                {
                    label: "Date of Log",
                    field: "createdAt",
                    sort: "asc",
                },
            ],
            rows: [],
        };

        if (products && products.length > 0) {
            products.forEach((product) => {
                product.stockHistory.forEach((historyEntry) => {
                    // Check if the selected status is empty or matches the historyEntry.status
                    if (!selectedStatus || historyEntry.status === selectedStatus) {
                        data.rows.push({
                            name: historyEntry.productName,
                            quantity: historyEntry.quantity,
                            status: (
                                <span style={{ color: getStatusColor(historyEntry.status) }}>
                                    {historyEntry.status}
                                </span>
                            ),
                            by: historyEntry.by,
                            createdAt: new Date(historyEntry.createdAt).toLocaleString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                }
                            ),
                        });
                    }
                });
            });
        } else {
            console.log("Products data is empty or undefined.");
        }

        // Sort the rows by createdAt from latest to oldest
        data.rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return data;
    };

    // const generatePDF = () => {
    //     const input = document.querySelector(".custom-mdb-datatable");

    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF();
    //         const imgHeight = (canvas.height * 208) / canvas.width;
    //         pdf.addImage(imgData, 0, 0, 208, imgHeight);
    //         pdf.save("stock_history.pdf");
    //     });
    // };

    const generatePDF = () => {
        const dataTableContent = document.querySelector(".custom-mdb-datatable .dataTable");

        if (dataTableContent) {
            html2canvas(dataTableContent, { scale: 0.9 }).then((canvas) => {
                const pdf = new jsPDF();
                const imgData = canvas.toDataURL("image/png");
                const imgWidth = pdf.internal.pageSize.getWidth() * 0.9; // Adjust the scale factor as needed
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                const marginTop = 20; // Adjust the top margin as needed
                const title = "Your Title Here";

                // Calculate the x-coordinate to center the title horizontally
                const textWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize();
                const centerX = (pdf.internal.pageSize.getWidth() - textWidth) / 2;

                // Add title to the PDF
                pdf.text(title, centerX, 10);

                // Add text to the PDF
                pdf.text("Product Stock History", 10, 35); // Adjust the position accordingly

                // Move the image down by adding a margin
                pdf.addImage(imgData, "PNG", 10, marginTop, imgWidth, imgHeight);
                pdf.save("stock_history.pdf");
            });
        } else {
            console.error("Data table content element not found.");
        }
    };





    return (
        <Fragment>
            <MetaData title={"Product Stock History"} />
            <div className="row">
                <div className="col-12 col-md-1">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Merch Stock History</h1>
                        <div className="mb-4">
                            <label htmlFor="statusFilter" style={{ fontWeight: "bold", fontSize: "14px", marginRight: "10px", display: "block", margin: "0 auto", textAlign: "center" }}>Filter by Status</label>
                            <select
                                id="statusFilter"
                                className="form-control"
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                style={{ width: "500px", margin: "0 auto", textAlign: "center" }}
                            >
                                <option value="">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Received">Received</option>
                            </select>
                        </div>
                        <button onClick={generatePDF}>Generate PDF</button>
                        <div className="custom-mdb-datatable">
                            {loading ? (
                                <Loader />
                            ) : (
                                <MDBDataTable
                                    data={setProducts()}
                                    className="px-3 custom-mdb-datatable" // Add custom class here
                                    bordered
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
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductsList;
