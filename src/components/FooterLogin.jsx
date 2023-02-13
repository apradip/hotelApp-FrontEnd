import React from "react"
import { NavLink } from "react-router-dom"

const FooterLogin = () => {
    // Start:: click page menu
    const handelClickMenuItem = (page) => {
        //changePage(page);
    };
    // End:: click page menu

    return ( 
		<footer className="footer">
			<div className="container-fluid">
				<div className="row text-muted">
					<div className="col-6 text-left">
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
					<div className="col-6 text-right">
						<p className="mb-0">
							&copy; 2023 - <a href="index.html" className="text-muted">Pixel Informatics</a>
						</p>
					</div>
				</div>
			</div>
		</footer>      
    )
}
 
export default FooterLogin