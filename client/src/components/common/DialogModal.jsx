import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";

function DialogModal({ scale, isOpen, onClose, children }) {
	return (
		<Dialog open={isOpen} handler={onClose} size={"md"}>
			<DialogBody>{children}</DialogBody>
		</Dialog>
	);
}

export default DialogModal;
