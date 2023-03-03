import React, { useContext } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { forgetPasswordSchema } from "../../schemas";
import useFetch from "../common/useFetch";

import "react-toastify/dist/ReactToastify.css";

// Start:: Component
const ForgetPassword = ({ onSuccess, onBack }) => {
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const { loading, error, doForgetPassword } = useFetch({
        method: "PUT",
        url: `${contextValues.forgetAPI}/${hotelId}`
    });

    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputUser: "9830152752",
        },
        validationSchema: forgetPasswordSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                            	"userName": values.keyInputUser
                        	};
						
            await doForgetPassword(payload);

			if (error === null) {
                onSuccess();
            } else {
                toast.error(error);
            }
        }
    });
   
	const handleBack = () => {
		onBack("LOGIN_PASSWORD");
    };

	return ( 
		<>
			<h1 className='mt-4'>Forget password</h1>
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
								autoFocus
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

					<div className="form-inline clearfix">
						<NavLink className="font-weight-bold float-end" href="#" onClick = {() => {handleBack()}}>
							Go to login
						</NavLink>
					</div>

					<button 
						name={"keyButtonConfirm"}
						type="submit"
						className="btn btn-primary btn-block mt-3"
						disabled={loading} >

						{!loading && "Send OTP"}
						{loading && 
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

export default ForgetPassword;