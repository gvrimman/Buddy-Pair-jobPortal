import { Button } from "@material-tailwind/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	GoogleMap,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

function UserLocation({
	onClose,
	setUserData,
	userData,
	openUserAdditionInfoModal,
	openEmployerInfoModal,
}) {
	const navigate = useNavigate()
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	});

	const [location, setLocation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [zoom, setZoom] = useState(13);
	const [watchId, setWatchId] = useState(null);
	const [placeName, setPlaceName] = useState("");

	// Use refs to track the last update time and position
	const lastUpdateTime = useRef(0);
	const lastPosition = useRef(null);
	// Google Maps container style
	const mapContainerStyle = {
		width: "100%",
		height: "400px",
	};

	// Function to get place name from coordinates using Google Geocoding
	const getPlaceName = useCallback(
		async (latitude, longitude) => {
			if (!isLoaded || !window.google?.maps) {
				return;
			}

			try {
				const geocoder = new window.google.maps.Geocoder();
				const latlng = { lat: latitude, lng: longitude };

				const response = await new Promise((resolve, reject) => {
					geocoder.geocode(
						{ location: latlng },
						(results, status) => {
							if (status === "OK") {
								resolve(results);
							} else {
								reject(status);
							}
						}
					);
				});

				if (response[0]) {
					const addressComponents = response[0].address_components;
					const formattedAddress = [
						addressComponents.find((c) =>
							c.types.includes("sublocality")
						)?.long_name,
						addressComponents.find((c) =>
							c.types.includes("locality")
						)?.long_name,
						addressComponents.find((c) =>
							c.types.includes("administrative_area_level_1")
						)?.long_name,
						addressComponents.find((c) =>
							c.types.includes("country")
						)?.long_name,
					]
						.filter(Boolean)
						.join(", ");

					setPlaceName(formattedAddress);
				}
			} catch (error) {
				console.error("Error getting place name:", error);
				setPlaceName("Location name not available");
			}
		},
		[isLoaded]
	);

	// Function to check if position has significantly changed
	const hasPositionChanged = useCallback((newPos, oldPos) => {
		if (!oldPos) return true;

		// Check if position has changed by more than 10 meters (roughly)
		const THRESHOLD = 0.0001; // approximately 10 meters
		return (
			Math.abs(newPos.lat - oldPos.lat) > THRESHOLD ||
			Math.abs(newPos.lng - oldPos.lng) > THRESHOLD
		);
	}, []);

	// Function to get the user's location
	const getLocation = useCallback(() => {
		setLoading(true);
		if (navigator.geolocation) {
			const id = navigator.geolocation.watchPosition(
				(position) => {
					const currentTime = Date.now();
					const newLocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};

					// Only update if:
					// 1. At least 5 seconds have passed since last update, or
					// 2. Position has changed significantly, or
					// 3. This is the first position update
					if (
						currentTime - lastUpdateTime.current > 5000 ||
						hasPositionChanged(newLocation, lastPosition.current) ||
						!lastPosition.current
					) {
						setLocation(newLocation);
						lastPosition.current = newLocation;
						lastUpdateTime.current = currentTime;

						if (isLoaded) {
							getPlaceName(newLocation.lat, newLocation.lng);
						}

						setLoading(false);
						setZoom(position.coords.accuracy < 100 ? 15 : 13);
					}
				},
				(error) => {
					console.error("Geolocation error:", error);
					setLoading(false);
				},
				{
					enableHighAccuracy: true,
					maximumAge: 5000, // Use cached position if less than 5 seconds old
					timeout: 10000,
				}
			);

			setWatchId(id);

			// Cleanup function
			return () => {
				if (id !== null) {
					navigator.geolocation.clearWatch(id);
				}
			};
		} else {
			console.error("Geolocation is not supported by this browser.");
			setLoading(false);
		}
	}, [isLoaded, getPlaceName, hasPositionChanged]);

	useEffect(() => {
		const cleanup = getLocation();

		return () => {
			if (cleanup) cleanup();
			if (watchId !== null) {
				navigator.geolocation.clearWatch(watchId);
				setWatchId(null);
			}
		};
	}, [getLocation]);

	const handleRetry = () => {
		if (watchId !== null) {
			navigator.geolocation.clearWatch(watchId);
			setWatchId(null);
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
				openUserAdditionInfoModal();
			}, 300);
		}
	};
	const renderMap = () => {
		return (
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
				{location && <Marker position={location} />}
			</GoogleMap>
		);
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
						{isLoaded ? renderMap() : <div>Loading Maps...</div>}
						<div className="flex justify-end mt-4">
							{!location && (
								<Button onClick={handleRetry}>Retry</Button>
							)}
							<div>
								{/* <CustomButton
									onClick={handleSubmit}
									value={"Next"}
								/>
								<CustomButton
									classAtbt={"bg-red-500 ml-6"}
									onClick={onClose}
									value={"Close"}
								/> */}
							</div>
						</div>
					</>
				) : (
					<div>
						<p>Unable to get your location.</p>
						<Button onClick={handleRetry}>Retry</Button>
					</div>
				)}
			</>
			<div className="text-end">
				<Button
					onClick={handleSubmit}
					className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 ">
					Next
				</Button>
				<Button
					onClick={() => navigate("/")}
					className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
					Close
				</Button>
			</div>
		</div>
	);
}

export default UserLocation;
