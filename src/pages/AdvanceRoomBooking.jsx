import React, { useState, forwardRef } from "react";
import { useFormik } from "formik";
import { useStateContext } from "../contexts/ContextProvider";
import { advanceRoomBookingSchema } from "../schemas";
import useFetch from "../components/common/useFetch";
import { ToastContainer, toast } from "react-toastify";

// Start:: form
const Form = ({pHotelId, pCategory, pCategoryId, pRoomCount, pArrivalDate, pDayCount, onSubmited, onCancled}) => {
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetch({
        url: `${contextValues.guestAdvanceRoomBookingAPI}/${pHotelId}`
    })

    // Start:: Form validate and save data
    const {values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
			keyInputName: "",
			keyInputPhone: ""
        },
        validationSchema: advanceRoomBookingSchema,
        validateOnChange,
        onSubmit: async (values) => {
            const payload = {name: values.keyInputName,
				phone: values.keyInputPhone,
				categoryId: pCategoryId, 
				roomCount: pRoomCount,
				arrivalDate: pArrivalDate,
				dayCount: pDayCount};

			await doInsert(payload);

            if (error === null) {
                resetForm();
                onSubmited();
            } else {
                toast.error(error);
            }
        }
    });
    // End:: Form validate and save data

    // Strat:: reset form    
    const handleReset = () => {
        setValidateOnChange(false);
        resetForm();
    };
    // End:: reset form    

    // Start:: Html
    return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="row col-md-12 px-0 py-2 m-0 form-group">
					<div className="col-md-6 input-field">
						<span className="pb-2">Name</span>
						
						<input 
							type="text" 
							name="keyInputName"
							placeholder="name"
							className="form-control"
							autoComplete="off"
							autoFocus
							maxLength={100}
							disabled={loading} 
							value={values.keyInputName} 
							onChange={handleChange}
							onBlur={handleBlur} 
							required />

							{errors.keyInputName && 
								touched.keyInputName ? 
									(<small className="text-danger">{errors.keyInputName}</small>) : 
										null}
					</div>

					<div className="col-md-6 input-field">
						<span className="pb-2">Phone No.</span>
						
						<input 
							type="text" 
							name="keyInputPhone"
							placeholder="phone no."
							className="form-control"
							autoComplete="off"
							maxLength={10}
							disabled={loading} 
							value={values.keyInputPhone} 
							onChange={handleChange}
							onBlur={handleBlur} 
							required/>

							{errors.keyInputPhone && 
								touched.keyInputPhone ? 
									(<small className="text-danger">{errors.keyInputPhone}</small>) : 
										null}
					</div>
				</div>

				<div className="row col-md-12 px-0 py-2 m-0 form-group">
					<div className="col-md-6 input-field">
						<span className="pb-2">Room category</span>

						<input 
							type="text" 
							name="keyInputRoomCategory"
							className="form-control"
							defaultValue={pCategory}
							readOnly />
					</div>

					<div className="col-md-6 input-field">
						<span className="pb-2">Room count</span>

						<input 
							type="text" 
							name="keyInputRoomCount"
							className="form-control"
							defaultValue={pRoomCount}
							readOnly />
					</div>
				</div>

				<div className="row col-md-12 px-0 py-2 m-0 form-group">
					<div className="col-md-6 input-field">
						<span className="pb-2">Arrival date</span>
						
						<input 
							type="text" 
							name="keyInputArrivalDate"
							className="form-control"
							defaultValue={pArrivalDate}
							readOnly />
					</div>

					<div className="col-md-6 input-field">
						<span className="pb-2">No of day</span>
						
						<input 
							type="text" 
							name="keyInputDayCount"
							className="form-control"
							defaultValue={pDayCount}
							readOnly />
					</div>
				</div>

				<div className="row col-md-6 px-1 py-4 m-0 form-group float-right">
					<div className="col-md-6 p-0 m-0">
						{/* Start:: Close button */}
						<button 
							type="button"
							className="btn btn-danger col-md-11"
							disabled={loading}
							onClick={handleReset} >
							Reset
						</button>
						{/* End:: Close button */}
					</div>

					<div className="col-md-6 p-0 m-0">							
						{/* Start:: Submit button */}
						<button 
							name={"keyButtonConfirm"}
							type="submit"
							className="btn btn-primary col-md-11"
							disabled={loading} >

							{!loading && "Submit"}
							{loading && 
								<>
									<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									Working
								</> }
						</button>
						{/* End:: Submit button */}
					</div>	
				</div>
			</form>

			<ToastContainer
				position="bottom-right"
				theme="colored"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				rtl={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover />
		</>
	);
    // End:: Html

};
// End:: form


const AdvanceRoomBooking = forwardRef((props, ref) => {    
	const queryParameters = new URLSearchParams(window.location.search)
  	const hotelId = queryParameters.get("hotelId");
  	const location = queryParameters.get("location");
	const categoryId = queryParameters.get("categoryId");
	const category = queryParameters.get("category");
	const roomCount = queryParameters.get("roomCount");
	const arrivalDate = queryParameters.get("arrivalDate");
	const dayCount = queryParameters.get("dayCount");

    const handleSave = () => {
        // localStorage.setItem("token", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);

        // navigate("/dashboard");
        // navigate(0);
    };

    const handleClose = () => {
        // if (source === "FORGET_PASSWORD") {
        //     setShowOtp(false);
        //     setShowPassword(false);
        //     setShowForgetPassword(true);

        // } else if (source === "LOGIN_PASSWORD") {
        //     setShowOtp(false);
        //     setShowForgetPassword(false);
        //     setShowPassword(true);
        // }
    }

    return ( 
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src="assets/img/photos/login.svg" alt="advance booking" className="img-fluid"/>                  
                </div>
                <div className="col-md-5 contents">
                    <h1 className="my-4">Advance booking</h1>
					{/* Start:: Form component */}
					<Form 
						pHotelId={hotelId}    
						pLocation={location}
						pCategoryId={categoryId}
						pCategory={category}
						pRoomCount={roomCount}
						pArrivalDate={arrivalDate}
						pDayCount={dayCount}
						onSubmited={handleSave} 
						onClosed={handleClose}/>
					{/* End:: Form component */}
                </div>
            </div>
        </div>
    );
});
 
export default AdvanceRoomBooking;