import { Dialog, DialogBody } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

function DialogModal({ scale, isOpen, onClose, children }) {
	const [size, setSize] = useState();

	const handleResize = () => {
		if (window.innerWidth < 640) {
			setSize(scale.m);
		} else if (window.innerWidth < 1024) {
			setSize(scale.s);
		} else {
			setSize(scale.s);
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Dialog open={isOpen} handler={onClose} size={size}>
			<DialogBody>{children}</DialogBody>
		</Dialog>
	);
}

export default DialogModal;
