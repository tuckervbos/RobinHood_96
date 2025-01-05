// import Navigation from "../Navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import StockTickerAnimation from "../StockTickerAnimation/StockTickerAnimation";
import LandingSignupGlow from "../LandingSignupGlow/LandingSignupGlow";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAllStocksThunk } from "../../redux/stock";
import "./LandingPage.css";

const LandingPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const stocks = useSelector((state) => state.stock.stocks);
	// const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(showAllStocksThunk());
	}, [dispatch]);

	// const handleExploreLegendClick = () => {
	// 	navigate("/");
	// };

	// const handleStockClick = (stockId) => {
	// 	navigate(`/stocks/${stockId}`);
	// };

	return (
		<div className="landing-page">
			<section className="search-bar-section">
				<SearchBar />
			</section>

			<section className="stock-ticker-animation-section">
				<StockTickerAnimation />
			</section>
			<br />
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

			<img
				src="/assets/hero-background.jpg"
				alt="Hero Section Graphic"
				className="below-hero-image"
			/>

			<section className="investing">
				<h1>Investing</h1>
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

			<img
				src="/assets/landing-page-investing-section.jpg"
				alt="Investing Section Graphic"
				className="below-investing-image"
			/>

			<section className="crypto-section">
				<div className="crypto-div">
					<h1>Robinhood Crypto</h1>
					<p>Get started with Robinhood Crypto. Trade crypto 24/7.</p>
					<button
						className="crypto-learn-more-button"
						onClick={() => alert("New feature coming soon!")}
					>
						Learn More
					</button>
				</div>
			</section>

			<img
				src="/assets/landing-page-crypto.jpg"
				alt="Crypto Section Graphic"
				className="below-crypto-image"
			/>

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
				<p>We&apos;ve got your back. We&apos;re available to you 24/7.</p>
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

			<LandingSignupGlow />

			<Footer />
		</div>
	);
};

export default LandingPage;
