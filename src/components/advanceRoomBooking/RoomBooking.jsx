import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { advanceRoomBookingSchema } from "../../schemas";
import useFetch from "../common/useFetch";

import "react-toastify/dist/ReactToastify.css";

// Start:: Component
const RoomBooking = ({ onSuccess, onBack }) => {
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const { data, loading, error, doInsert } = useFetch({
        method: 'POST',
        url: `${contextValues.loginAPI}/${hotelId}`
    });

    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputRoomCategory: "DELUX",
            keyInputGuestCount: "2",
			keyInputArrivalDate: "01/01/2023",
			keyInputDepartureDate: "03/01/2023",
			keyInputName: "",
			keyInputPhone: ""
        },
        validationSchema: advanceRoomBookingSchema,
        onSubmit: async (values) => {
            const payload = {categoryId: values.keyInputRoomCategory, 
                             guestCount: values.keyInputGuestCount,
							 arrivalDate: values.keyInputArrivalDate,
							 departureDate: values.keyInputDepartureDate,
							 name: values.keyInputName,
							 phone: values.keyInputPhone};
						
            await doInsert(payload);
        }
    });
   
	const handleClose = () => {
		// onBack("FORGET_PASSWORD");
    };

	useEffect(() => {
		data && onSuccess(data.accessToken, data.refreshToken);
		error && toast.error(error);
    }, [data, error, loading]);		// eslint-disable-line react-hooks/exhaustive-deps

	return ( 
		<>
			<h1 className='mt-4'>Advance booking</h1>
			<div className="panel-body col-md-12 px-0 m-0" style={{"border": "solid 1px blue"}}>
				<form onSubmit={handleSubmit}>
					<div className="row col-md-12 px-2 py-2 m-0 form-group">
						<div className="col-md-6 input-field">
							<span className="pb-2">Name</span>
							
							<input 
								type="text" 
								name={ "keyInputName" }
								placeholder="name"
								className="form-control"
								autoComplete="off"
								autoFocus
								maxLength={ 100 }
								disabled={ loading } 
								value={ values.keyInputName } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required />

								{ errors.keyInputName && 
									touched.keyInputName ? 
										(<small className="text-danger">{ errors.keyInputName }</small>) : 
											null }
						</div>

						<div className="col-md-6 input-field">
							<span className="pb-2">Phone No.</span>
							
							<input 
								type="text" 
								name={ "keyInputPhone" }
								placeholder="phone no."
								className="form-control"
								autoComplete="off"
								autoFocus
								maxLength={ 10 }
								disabled={ loading } 
								value={ values.keyInputPhone } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required />

								{ errors.keyInputPhone && 
									touched.keyInputPhone ? 
										(<small className="text-danger">{ errors.keyInputPhone }</small>) : 
											null }
						</div>
					</div>

					<div className="row col-md-12 px-0 py-2 m-0 form-group">
						<div className="col-md-6 input-field">
							<span className="pb-2">Room category</span>

							<input 
								type="text" 
								name={ "keyInputRoomCategory" }
								placeholder="room category"
								className="form-control"
								autoComplete="off"
								maxLength={ 50 }
								disabled={ loading } 
								value={ values.keyInputRoomCategory } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required/>

								{ errors.keyInputRoomCategory && 
									touched.keyInputRoomCategory ? 
										(<small className="text-danger">{ errors.keyInputRoomCategory }</small>) : 
											null }

						</div>

						<div className="col-md-6 input-field">
							<span className="pb-2">Guest count</span>

							<input 
								type="text" 
								name={ "keyInputGuestCount" }
								placeholder="Guest count"
								className="form-control"
								autoComplete="off"
								maxLength={ 2 }
								disabled={ loading } 
								value={ values.keyInputGuestCount } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required/>

								{ errors.keyInputGuestCount && 
									touched.keyInputGuestCount ? 
										(<small className="text-danger">{ errors.keyInputGuestCount }</small>) : 
											null }

						</div>
					</div>

					<div className="row col-md-12 px-0 py-2 m-0 form-group">
						<div className="col-md-6 input-field">
							<span className="pb-2">Arrival date</span>
							
							<input 
								type="text" 
								name={ "keyInputArrivalDate" }
								placeholder="name"
								className="form-control"
								autoComplete="off"
								autoFocus
								maxLength={ 10 }
								disabled={ loading } 
								value={ values.keyInputArrivalDate } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required />

								{ errors.keyInputArrivalDate && 
									touched.keyInputArrivalDate ? 
										(<small className="text-danger">{ errors.keyInputArrivalDate }</small>) : 
											null }
						</div>

						<div className="col-md-6 input-field">
							<span className="pb-2">Departure date</span>
							
							<input 
								type="text" 
								name={ "keyInputDepartureDate" }
								placeholder="departure date"
								className="form-control"
								autoComplete="off"
								autoFocus
								maxLength={ 10 }
								disabled={ loading } 
								value={ values.keyInputDepartureDate } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required />

								{ errors.keyInputDepartureDate && 
									touched.keyInputDepartureDate ? 
										(<small className="text-danger">{ errors.keyInputDepartureDate }</small>) : 
											null }
						</div>
					</div>

					{/* Start:: Close button */}
					<button 
						type="button"
						className="btn btn-danger"
						disabled={loading}
						onClick={handleClose} >
						Close
					</button>
					{/* End:: Close button */}

					{/* Start:: Submit button */}
					<button 
						name={"keyButtonConfirm"}
						type="submit"
						className="btn btn-primary ml-3"
						disabled={loading} >

						{!loading && "Submit"}
						{loading && 
							<>
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Working
							</> }
					</button>
					{/* End:: Submit button */}
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
			</div>
		</>
    );
}
// End:: Component

export default RoomBooking;