import React from "react";
import { LuLoader2 } from "react-icons/lu";

function PageLoader() {
	return (
		<div className="fixed inset-0 z-[99999] flex justify-center items-center">
			<LuLoader2 className="animate-spin" />
		</div>
	);
}

export default PageLoader;
