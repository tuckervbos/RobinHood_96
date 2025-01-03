import Navigation from "../Navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAllStocksThunk } from "../../redux/stock";
import "./LandingPage.css";

const LandingPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const stocks = useSelector((state) => state.stock.stocks);

	useEffect(() => {
		dispatch(showAllStocksThunk());
	}, [dispatch]);

	// const handleExploreLegendClick = () => {
	// 	navigate("/");
	// };

	const handleStockClick = (stockId) => {
		navigate(`/stocks/${stockId}`);
	};

	return (
		<div className="landing-page">
			<section className="search-bar-section">
				<h2>Find Your Next Stock</h2>
				<SearchBar />
			</section>

			<section className="hero">
				<h1 className="hero-title">A New Legend for a New Era</h1>
				<p className="hero-subtitle">
					A trading platform in your browser for free. Now available to all
					Robinhood customers.
				</p>
				<button
					className="hero-explore-button"
					onClick={() => alert("New feature coming soon!")}
				>
					Explore Legend
				</button>
			</section>

			<section className="investing">
				<h2>Investing</h2>
				<p>Build your portfolio starting with just $1</p>
				<p>
					Invest in stocks, ETFs, and their options, at your pace and
					comission-free
				</p>
				<button
					className="investing-learn-more-button"
					onClick={() => navigate("/searchres")}
				>
					Learn More
				</button>
			</section>

			<section className="crypto-section">
				<div className="crypto-div">
					<h2>Robinhood Crypto</h2>
					<p>Get started with Robinhood Crypto. Trade crypto 24/7.</p>
					<button
						className="crypto-learn-more-button"
						onClick={() => alert("New feature coming soon!")}
					>
						Learn More
					</button>
				</div>
			</section>

			<section className="protection-guarantee-section">
				<h2>Robinhood Protection Guarantee</h2>
				<button
					className="protection-guarantee-button"
					onClick={() => alert("New feature coming soon!")}
				>
					Learn more about our committments
				</button>
				<p>We work hard to keep your data safe and secure.</p>
				<p>We protect your account from unauthorized activity.</p>
				<p>We provide multi-factor authentication on all accounts.</p>
				<p>We`&apos;`ve got your back. We`&apos;`re available to you 24/7.</p>
			</section>

			<section className="better-investor-section">
				<h2>Become a Better Investor on the Go</h2>
				<p>Take charge of your financial future with our easy-to-use app.</p>
				<button
					className="better-investor-button"
					onClick={() => navigate("/signup")}
				>
					Sign up to access Robinhood Learn
				</button>
			</section>

			<section className="new-generation-section">
				<h2>Join a new generation of investors</h2>
				<p>Start investing today and be part of the future of finance.</p>
				<button
					className="new-generation-button"
					onClick={() => navigate("/signup")}
				>
					Sign up
				</button>
			</section>

			<footer className="footer">
				<div className="footer-top">
					<div className="footer-links-column">
						<h4>Product</h4>
						<ul>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Invest
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Credit Card
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Gold
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Crypto
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Retirement
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Options
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Futures
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Robinhood Legend
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Learn
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Snacks
								</a>
							</li>
						</ul>
					</div>

					<div className="footer-links-column">
						<h4>Company</h4>
						<ul>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									About Us
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Blog
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Partner With Us
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Affiliates
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Press
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Careers
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Commitments
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Our Customers
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Support
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									ESG
								</a>
							</li>
						</ul>
					</div>

					<div className="footer-links-column">
						<h4>Legal & Regulatory</h4>
						<ul>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Terms & Conditions
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Disclosures
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Privacy
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Law Enforcement Requests
								</a>
							</li>
							<li>
								<a href="#" onClick={() => alert("New feature coming soon!")}>
									Your Privacy Choices
								</a>
							</li>
						</ul>
					</div>

					<div className="footer-legal">
						<h4>All investing involves risk</h4>
						<p>
							Brokerage services are offered through Robinhood Financial LLC
							(`&quot;`RHF`&quot;`), a registered broker dealer (member SIPC),
							and clearing services through Robinhood Securities, LLC
							(`&quot;`RHS`&quot;`), a registered broker dealer (member SIPC).
						</p>
						<p>
							Cryptocurrency services are offered through Robinhood Crypto, LLC
							(`&quot;`RHC`&quot;`) (NMLS ID: 1702840). Cryptocurrency held
							through Robinhood Crypto is not FDIC insured or SIPC protected.
						</p>
						<p>
							The Robinhood spending account is offered through Robinhood Money,
							LLC (`&quot;`RHY`&quot;`) (NMLS ID: 1990968), a licensed money
							transmitter.
						</p>
					</div>
				</div>

				<div className="footer-bottom">
					<p>Robinhood, 85 Willow Road, Menlo Park, CA 94025.</p>
					<p>© 2025 Robinhood. All rights reserved.</p>
					<div className="footer-branding">
						<h1>Robinhood</h1>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
