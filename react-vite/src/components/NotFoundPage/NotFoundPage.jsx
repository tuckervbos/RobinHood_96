import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
	return (
		<div className="not-found-page">
			<h1>404 - Page Not Found</h1>
			<p>Oops! The page you&apos;re looking for does not exist.</p>
			<Link to="/" className="go-home-button">
				Go Back to Home
			</Link>
		</div>
	);
};

export default NotFoundPage;
