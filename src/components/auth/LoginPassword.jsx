import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { loginPasswordSchema } from "../../schemas";
import useFetch from "../common/useFetch";

import "react-toastify/dist/ReactToastify.css";

// Start:: Component
const LoginPassword = ({ onSuccess, onBack }) => {
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const { data, loading, error, doLoginPassword } = useFetch({
        method: 'POST',
        url: `${contextValues.loginAPI}/${hotelId}`
    });

    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputUser: "9830152752",
            keyInputPassword: "pixel"
        },
        validationSchema: loginPasswordSchema,
        onSubmit: async (values) => {
            const payload = {   
                            "userName": values.keyInputUser, 
                            "password": values.keyInputPassword
                        };
						
            await doLoginPassword(payload);
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

					<div className="form-group py-1 pb-2">
						<div className="input-field">
							<span className="pb-2">Password</span>

							<input 
								type="password" 
								name={ "keyInputPassword" }
								placeholder="password"
								className="form-control"
								autoComplete="off"
								maxLength={ 50 }
								disabled={ loading } 
								value={ values.keyInputPassword } 
								onChange={ handleChange }
								onBlur={ handleBlur } 
								required/>

								{/* <button className="btn bg-white text-muted">
									<span className="far fa-eye-slash"></span>
								</button> */}

								{ errors.keyInputPassword && 
									touched.keyInputPassword ? 
										(<small className="text-danger">{ errors.keyInputPassword }</small>) : 
											null }

						</div>
					</div>

					<div className="form-inline clearfix">
						<input type="checkbox" name="remember" id="remember"/>
						<label htmlFor="remember" className="text-muted px-2 float-start">Remember me</label>
						<NavLink className="font-weight-bold float-end" href="#" onClick={() => {handleBack()}}>
							Forgot password?
						</NavLink>
					</div>

					<button 
						name={"keyButtonConfirm"}
						type="submit"
						className="btn btn-primary btn-block mt-3"
						disabled={loading} >

						{!loading && "Login"}
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

export default LoginPassword;