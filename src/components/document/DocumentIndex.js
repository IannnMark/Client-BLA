import React, { Fragment, useEffect, useState, useRef } from "react";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "rc-slider";
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
        filteredDocumentsCount,
    } = useSelector((state) => state.documents);

    const [currentPage] = useState(1);
    const [price] = useState([1, 1000]);
    const [category] = useState("");
    const [isRowDocumentActive, setIsRowDocumentActive] = useState(false);
    let { keyword } = useParams();

    const notify = (error = "") =>
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);

    const documentAboutRef = useRef(null);
    const selectDocumentsRef = useRef(null); // Add this line


    const scrollToSelectDocuments = () => {
        if (selectDocumentsRef.current) {
            selectDocumentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        if (error) {
            notify(error);
        }
        dispatch(getDocuments(keyword, currentPage, price, category));
    }, [dispatch, error, currentPage, keyword, price, category]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 200;

            if (scrollPosition > threshold) {
                setIsRowDocumentActive(true);
            } else {
                setIsRowDocumentActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    let count = documentsCount;

    if (keyword) {
        count = filteredDocumentsCount;
    }

    return (
        <Fragment>
            <section className="firstrow">
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <button type="button" className="your-button-class" onClick={scrollToSelectDocuments}>
                    Click to View Documents
                </button>
            </section>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Select Documents"} />
                    <section ref={selectDocumentsRef} className="avail">
                        <h1 className="h1">Available Documents</h1>
                        <section id="documents" className="container mt-5">
                            <div className="row">
                                {keyword ? (
                                    <Fragment>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {documents.map((document) => (
                                                    <Document
                                                        key={document._id}
                                                        document={document}
                                                        col={4}
                                                    />
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
                        <br />
                        <br />
                    </section>

                    <div
                        ref={documentAboutRef}
                        className={`row-document ${isRowDocumentActive ? "active" : ""}`}
                    >
                        <DocumentAbout />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Index;
