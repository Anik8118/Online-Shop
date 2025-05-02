import { Link } from "react-router";
//import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
//import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../contexts/Auth";
import { auth } from "../firebase";

const Nav = () => {
	const { userLoggedIn, role } = useAuth();

	return (
		<header className="header">
			<div className="container">
				<nav className="header__navbar">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>

						<li>
							<Link to="/sign-up">Sign Up</Link>
						</li>

						<li>
							<Link to="/admin/users">Users</Link>
						</li>

						<li>
							<Link to="/cart">Cart</Link>
						</li>


						{userLoggedIn &&
						 (role === "admin" || role === "super-admin") && (
							<li>
								<Link to="/add-product">Add Product</Link>
							</li>
						 )}

						{userLoggedIn &&
						 (role === "admin" || role === "super-admin") && (
							<li>
								<Link to="/all-products">Products</Link>
							</li>
						 )}


						<li>
							<Link to="/my-orders">My Orders</Link>
						</li>

						
						{!userLoggedIn && (
							<li>
								<Link to="/login">Login</Link>
							</li>
						)};
						

						<li>
							<Link to="/admin/order-list">Order List</Link>
						</li>

						{userLoggedIn && (
							<li>
								<button
									onClick={() => {
										signOut(auth);
									}}
									>
									Logout
								</button>
							</li>
						)}
					
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Nav;