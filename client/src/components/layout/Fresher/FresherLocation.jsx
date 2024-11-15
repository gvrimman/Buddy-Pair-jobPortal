import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function FresherLocation({ onClose, setUserData, openFresherSkillModal }) {
	const [location, setLocation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [zoom, setZoom] = useState(13);
	const [watchId, setWatchId] = useState(null);
	const [placeName, setPlaceName] = useState("");
	// Google Maps container style
	const mapContainerStyle = {
		width: "100%",
		height: "400px",
	};

	// Function to get place name from coordinates using Google Geocoding
	const getPlaceName = async (latitude, longitude) => {
		try {
			const geocoder = new window.google.maps.Geocoder();
			const latlng = { lat: latitude, lng: longitude };

			const response = await new Promise((resolve, reject) => {
				geocoder.geocode({ location: latlng }, (results, status) => {
					if (status === "OK") {
						resolve(results);
					} else {
						reject(status);
					}
				});
			});

			if (response[0]) {
				const addressComponents = response[0].address_components;
				const formattedAddress = [
					addressComponents.find((c) =>
						c.types.includes("sublocality")
					)?.long_name,
					addressComponents.find((c) => c.types.includes("locality"))
						?.long_name,
					addressComponents.find((c) =>
						c.types.includes("administrative_area_level_1")
					)?.long_name,
					addressComponents.find((c) => c.types.includes("country"))
						?.long_name,
				]
					.filter(Boolean)
					.join(", ");

				setPlaceName(formattedAddress);
			}
		} catch (error) {
			console.error("Error getting place name:", error);
			setPlaceName("Location name not available");
		}
	};

	// Function to get the user's location
	const getLocation = () => {
		setLoading(true);
		if (navigator.geolocation) {
			const id = navigator.geolocation.watchPosition(
				async (position) => {
					const lat = position.coords.latitude;
					const lng = position.coords.longitude;

					if (
						!location ||
						location.lat !== lat ||
						location.lng !== lng
					) {
						setLocation({ lat, lng });
						console.log("Current location:", { lat, lng });
					}

					setLoading(false);
					setZoom(position.coords.accuracy < 100 ? 15 : 13);

					await getPlaceName(lat, lng);
				},
				(error) => {
					console.error(error);
					setLoading(false);
				},
				{ enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
			);

			setWatchId(id);
		} else {
			console.error("Geolocation is not supported by this browser.");
			setLoading(false);
		}
	};

	useEffect(() => {
		getLocation();

		return () => {
			if (watchId !== null) {
				navigator.geolocation.clearWatch(watchId);
			}
		};
	}, []);

	const handleRetry = () => {
		if (watchId !== null) {
			navigator.geolocation.clearWatch(watchId);
		}
		getLocation();
	};

	const handleSubmit = () => {
		if (location) {
			setUserData((prev) => ({
				...prev,
				location: [location.lat, location.lng],
				locationName: placeName,
			}));
			onClose();

			setTimeout(() => {
				openFresherSkillModal();
			}, 300);
		}
	};
	return (
		<div>
			<>
				{loading ? (
					<div className="relative text-center p-10">
						<div className="loader mb-10 md:mb-2"></div>
						<p>Fetching your location...</p>
					</div>
				) : location ? (
					<>
						<h1 className="text-center mb-2 mt-2 text-xl md:text-2xl font-bold">
							Your Current Location
						</h1>
						{placeName && (
							<p className="text-center mb-4 text-gray-600">
								{placeName}
							</p>
						)}
						<LoadScript
							googleMapsApiKey={
								"AIzaSyDB89qC8JKw5ITuXdNQ8hKelDKN0pL1bYE"
							}>
							<GoogleMap
								mapContainerStyle={mapContainerStyle}
								center={location}
								zoom={zoom}
								options={{
									zoomControl: true,
									streetViewControl: false,
									mapTypeControl: false,
									fullscreenControl: false,
								}}>
								<Marker
									position={location}
									// onClick={() => setShowInfoWindow(true)}
								>
									{/* {showInfoWindow && (
                      <InfoWindow
                        position={location}
                        onCloseClick={() => setShowInfoWindow(false)}
                      >
                        <div>
                          <p>{placeName || "You are here"}</p>
                          <p>Accuracy: {accuracy ? `${accuracy} meters` : "N/A"}</p>
                        </div>
                      </InfoWindow>
                    )} */}
								</Marker>
							</GoogleMap>
						</LoadScript>
						<div className="flex justify-end mt-4">
							{!location && (
								<button
									className="underline font-medium"
									onClick={handleRetry}>
									Retry
								</button>
							)}
						</div>
					</>
				) : (
					<div className="flex flex-col gap-4 items-center">
						<p>
							Unable to get your location. Make sure your{" "}
							<span className="font-bold">Location</span> is turn on.
						</p>
						<button
							className="underline font-medium"
							onClick={handleRetry}>
							Retry
						</button>
					</div>
				)}
			</>
			<div className="text-end">
				<Button className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
					Close
				</Button>
				<Button
					onClick={handleSubmit}
					className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-customViolet">
					Next
				</Button>
			</div>
		</div>
	);
}

export default FresherLocation;
