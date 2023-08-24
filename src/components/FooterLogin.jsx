import React, { useState, forwardRef, useImperativeHandle } from "react"
import { NavLink } from "react-router-dom"
import { Stack } from "react-bootstrap"

// Start:: Component
// props parameters
// onClickPage

// useImperativeHandle
// changePage

const FooterLogin = forwardRef((props, ref) => {
    const [selectedPage, setSelectedPage] = useState(null)
	const currentYear = new Date().getFullYear()

	// Start:: click page menu
    const handelClickMenuItem = (page) => {
        changePage(page)
		props.onClickPage(page)
    }
    // End:: click page menu

	// Start:: forward reff change page
	const changePage = (page) => {
		setSelectedPage(page)
	}
	
	useImperativeHandle(ref, () => {
		return {changePage}
	})
	// End:: forward reff change page
	
	// Start:: Html
    return ( 
		<div>
			<footer className="main-footer mt-3">
				<Stack direction="horizontal" gap={3}>
					
					<NavLink to="/support" 
						onClick={() => {handelClickMenuItem("support")}}>Support</NavLink>
					<div className="vr" />
					
					<NavLink to="/help"
						onClick={() => {handelClickMenuItem("help")}}>Help</NavLink>
					<div className="vr" />

					<NavLink to="/privacy" className="me-auto"
						onClick={() => {handelClickMenuItem("privacy")}}>Privacy</NavLink>

					<div className="float-right d-none d-sm-inline-block">
						&copy; {currentYear} - <a href="index.html">Pixel Informatics</a>
					</div>

				</Stack>
			</footer>
		</div>
    )
	// End:: Html
})
 
export default FooterLogin