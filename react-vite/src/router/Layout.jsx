import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	// const user = useSelector((state) => state.session.user);
	// console.log("User:", user);
	// console.log("isLoaded:", isLoaded);
	useEffect(() => {
		dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	// if (isLoaded && user) {
	// 	return <Navigate to="/home" />;
	// }

	return (
		<>
			<ModalProvider>
				<Navigation />
				{isLoaded && <Outlet />}
				<Modal />
			</ModalProvider>
		</>
	);
}
