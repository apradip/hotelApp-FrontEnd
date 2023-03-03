import React, { useState, forwardRef, useImperativeHandle } from "react";
import { NavLink } from "react-router-dom";


// Start:: Component
// props parameters
// onClickPage

// useImperativeHandle
// changePage

const FooterLogin = forwardRef(( props, ref ) => {
    const [selectedPage, setSelectedPage] = useState(null);

	// Start:: click page menu
    const handelClickMenuItem = (page) => {
        changePage(page);
		props.onClickPage(page);
    };
    // End:: click page menu

	// Start:: forward reff change page
	const changePage = (page) => {
		setSelectedPage(page);
	};
	
	useImperativeHandle(ref, () => {
		return {
			changePage
		}
	});
	// End:: forward reff change page
	
	// Start:: Html
    return ( 
		<footer className="footer">
			<div className="container-fluid">
				<div className="row text-muted">
					<div className="col-8 text-left">
						<ul className="list-inline">
							<li className="list-inline-item mx-3">
								<NavLink to="/support" className="text-muted"
									onClick={() => {handelClickMenuItem("support")}}>Support
								</NavLink>
							</li>
							<li className="list-inline-item mx-3">
								<NavLink to="/help" className="text-muted"
									onClick={() => {handelClickMenuItem("help")}}>Help Center
								</NavLink>
							</li>
							<li className="list-inline-item mx-3">
								<NavLink to="/privacy" className="text-muted"
									onClick={() => {handelClickMenuItem("privacy")}}>Privacy
								</NavLink>
							</li>
							<li className="list-inline-item mx-3">
								<NavLink to="/terms" className="text-muted" 
									onClick={() => {handelClickMenuItem("terms")}}>Terms of Service
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="col-4 text-right">
						<p className="mb-0">
							&copy; 2023 - <a href="index.html" className="text-muted">Pixel Informatics</a>
						</p>
					</div>
				</div>
			</div>
		</footer>      
    );
	// End:: Html
});
 
export default FooterLogin;