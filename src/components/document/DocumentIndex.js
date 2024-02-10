import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "../../actions/documentActions";
import Document from "../document/Document";
import DocumentAbout from "../document/DocumentAbout";
import Loader from "../layout/Loader";
import "./DocumentIndex.css";

const Index = () => {
    const dispatch = useDispatch();
    const {
        loading,
        documents,
        error,
        documentsCount,
        resPerPage,
        filteredDocumentsCount,
    } = useSelector((state) => state.documents);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState("");
    let { keyword } = useParams();

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
        dispatch(getDocuments(keyword, currentPage, price, category));
    }, [dispatch, error, currentPage, keyword, price, category]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = documentsCount;

    if (keyword) {
        count = filteredDocumentsCount;
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Select Documents"} />
                    <h1 id="documents_heading">Available Documents</h1>
                    <section id="documents" className="container mt-5">
                        <div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {documents.map((document) => (
                                                <Document key={document._id} document={document} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                documents.map((document) => (
                                    <Document key={document._id} document={document} col={3} />
                                ))
                            )}
                        </div>
                    </section>
                    <section id="documents" className="container mt-5">
                        <div className="row-document">
                            <DocumentAbout/>
                        </div>
                    </section>
                    
                </Fragment>
            )}
        </Fragment>
    );
};

export default Index;
