import React from "react"
import { NavLink } from "react-router-dom"

const Footer = () => {
    return ( 
		<div style={{"width": "100%", "position": "fixed", "bottom": "0px"}}>
			<footer className="footer">
				<div className="container-fluid">
					<div className="row text-muted">
						<div className="col-5 text-left">
							<ul className="list-inline">
								<li className="list-inline-item mx-3">
									<NavLink to="/privacy" className="text-muted">Privacy</NavLink>
								</li>
								<li className="list-inline-item mx-3">
									<NavLink to="/terms" className="text-muted">Terms of Service</NavLink>
								</li>
							</ul>
						</div>
						<div className="col-7 text-right">
							<p className="mb-0">
								&copy; 2023 - <a href="index.html" className="text-muted">Pixel Informatics</a>
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>      
    )
}
 
export default Footer