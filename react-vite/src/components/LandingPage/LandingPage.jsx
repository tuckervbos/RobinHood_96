import Navigation from "../Navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";
import "./LandingPage.css";

const LandingPage = () => {
	return (
		<div className="landing-page">
			<Navigation />

			<section className="hero">
				<h1 className="hero-title">A New Legend for a New Era</h1>
				<p className="hero-subtitle">
					A trading platform in your browser for free. Now available to all
					Robinhood customers.
				</p>
				<button className="hero-explore-button">Explore Legend</button>
			</section>

			<section className="search-bar-section">
				<h2>Find Your Next Stock</h2>
				<SearchBar />
			</section>

			<section className="investing">
				<h2>Investing</h2>
				<p>Build your portfolio starting with just $1</p>
				<p>
					Invest in stocks, ETFs, and their options, at your pace and
					comission-free
				</p>
				<button className="investing-learn-more-button">Learn More</button>
			</section>

			<section className="crypto-section">
				<div className="crypto-div">
					<h2>Robinhood Crypto</h2>
					<p>Get started with Robinhood Crypto. Trade crypto 24/7.</p>
					<button className="crypto-learn-more-button">Learn More</button>
				</div>
			</section>

			<footer className="footer">
				<p>© 2024 RobinHood. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default LandingPage;
