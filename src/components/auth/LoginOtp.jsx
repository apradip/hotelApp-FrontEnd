import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { loginOtpSchema } from "../../schemas";
import useFetch from "../common/useFetch";

import "react-toastify/dist/ReactToastify.css";

// Start:: Component
const LoginOtp = ({ onSuccess, onBack }) => {
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const { data, loading, error, doLoginOtp } = useFetch({
        method: "PUT",
        url: `${contextValues.loginAPI}/${hotelId}`
    });

    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputUser: "9830152752",
            keyInputOtp: ""
        },
        validationSchema: loginOtpSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                            "userName": values.keyInputUser, 
                            "otp": values.keyInputOtp
                        };
						
            await doLoginOtp(payload);
        }
    });
   
	const handleBack = () => {
		onBack("FORGET_PASSWORD");
    };

	useEffect(() => {
		data && onSuccess(data.accessToken, data.refreshToken);
		error && toast.error(error);
    }, [data, error, loading]);		// eslint-disable-line react-hooks/exhaustive-deps

	return ( 
		<>
			<h1 className='mt-4'>Login</h1>
			<div className="panel-body col-12 p-3">
				<form onSubmit={handleSubmit}>
					<div className="form-group py-2">
						<div className="input-field">
							<span className="pb-2">User name</span>
							
							<input 
								type="text" 
								name={ "keyInputUser" }
								placeholder="mobile no. / email"
								className="form-control"
								autoComplete="off"
								maxLength={ 100 }
								disabled={ loading } 
								value={ values.keyInputUser } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required />

								{ errors.keyInputUser && 
									touched.keyInputUser ? 
										(<small className="text-danger">{ errors.keyInputUser }</small>) : 
											null }
						</div>
					</div>

					<div className="form-group py-1 pb-2">
						<div className="input-field">
							<span className="pb-2">OTP</span>

							<input 
								type="password" 
								name={ "keyInputOtp" }
								placeholder="otp"
								className="form-control"
								autoComplete="off"
								autoFocus
								maxLength={ 6 }
								disabled={ loading } 
								value={ values.keyInputOtp } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required/>
	
								{/* <button className="btn bg-white text-muted">
									<span className="far fa-eye-slash"></span>
								</button> */}

								{ errors.keyInputOtp && 
									touched.keyInputOtp ? 
										(<small className="text-danger">{ errors.keyInputOtp }</small>) : 
											null }

						</div>
					</div>

					<div className="form-inline clearfix">
						<NavLink className="font-weight-bold" href="#" onClick = {() => {handleBack()}}>
							Back to login
						</NavLink>
					</div>

					<button 
						name={"keyButtonConfirm"}
						type="submit"
						className="btn btn-primary btn-block mt-3"
						disabled={ loading } >

						{ !loading && "Login"}
						{ loading && 
							<>
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Working
							</> }
					</button>
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

export default LoginOtp;