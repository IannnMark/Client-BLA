import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { newClearance, clearErrors } from '../../actions/clearanceActions';
import { NEW_CLEARANCE_RESET } from '../../constants/clearanceConstants';

const NewClearance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success, loading } = useSelector((state) => state.newClearance);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success('Clearance request created successfully');
            dispatch({ type: NEW_CLEARANCE_RESET });
            navigate('/clearance');
        }
    }, [dispatch, error, success, navigate]);

    const [clearanceImages, setClearanceImages] = useState([]);
    const [clearanceImagesPreview, setClearanceImagesPreview] = useState([]);

    const handleClearanceImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setClearanceImagesPreview([]);
        setClearanceImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setClearanceImagesPreview((oldArray) => [...oldArray, reader.result]);
                    setClearanceImages((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const validateImages = () => {
        if (clearanceImages.length === 0) {
            toast.error('Please upload at least one image');
            return false;
        }
        return true;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validateImages()) {
            return;
        }

        try {
            const cleanClearanceImages = clearanceImages.filter(Boolean); // Remove empty elements
            const clearanceData = {
                clearanceImages: cleanClearanceImages,
            };

            console.log('Clearance Data:', clearanceData);
            dispatch(newClearance(clearanceData));

        } catch (error) {
            console.error('Error submitting clearance:', error);
        }
    };

    return (
        <Fragment>
            <MetaData title={'New Clearance Request'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">New Clearance</h1>

                        <div className="form-group">
                            <label htmlFor="clearanceImages">Upload Clearance Images:</label>
                            <input
                                type="file"
                                id="clearanceImages"
                                onChange={handleClearanceImagesChange}
                                accept="image/*"
                                multiple
                                className="form-control"
                                required
                            />
                        </div>

                        {clearanceImagesPreview.map((img) => (
                            <img
                                src={img}
                                key={img}
                                alt="Clearance Image Preview"
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
                            />
                        ))}
                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewClearance;
