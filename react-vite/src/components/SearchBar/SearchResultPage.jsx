import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar"; //for test
import AIAssistant from "../AiAssistant/AiAssistant"; //for test
import Footer from "../Footer/Footer";

// change this to a page
const SearchResults = () => {
	// need check the data
	const searchResults = useSelector((state) => state.stock.searchResults || []);

	return (
		<div>
			<SearchBar />
			<h2>Search Results</h2>
			<ul>
				{searchResults.map((stock) => (
					<li key={stock.id}>
						<div>
							<h3>
								{stock.company_name} ({stock.ticker}) Price: ${stock.price}
							</h3>
							<img src={stock.graph_image} alt="stock graph" />
							<NavLink to={`/stocks/${stock.id}`}>View Details</NavLink>
						</div>
					</li>
				))}
			</ul>
			<AIAssistant />
			<Footer />
		</div>
	);
};
export default SearchResults;
