import React from "react";

const Pagination = ({ pagination, setCurrentPage }) => {
	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
		window.scrollTo(0, 0);
	};

	if (!pagination) return null;

	const { currentPage, totalPages, hasNext, hasPrev } = pagination;

	return (
		<div className="flex justify-center items-center gap-2 mt-4 mb-8">
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={!hasPrev}
				className={`px-3 py-1 rounded ${
					!hasPrev
						? "bg-gray-200 cursor-not-allowed"
						: "bg-blue-500 text-white hover:bg-blue-600"
				}`}>
				<span>&laquo;</span>
			</button>

			{[...Array(totalPages)].map((_, index) => {
				const pageNumber = index + 1;
				// Show current page, first page, last page, and one page before and after current
				if (
					pageNumber === 1 ||
					pageNumber === totalPages ||
					(pageNumber >= currentPage - 1 &&
						pageNumber <= currentPage + 1)
				) {
					return (
						<button
							key={pageNumber}
							onClick={() => handlePageChange(pageNumber)}
							className={`px-3 py-1 rounded ${
								currentPage === pageNumber
									? "bg-blue-500 text-white"
									: "bg-gray-200 hover:bg-gray-300"
							}`}>
							{pageNumber}
						</button>
					);
				}
				// Show dots for skipped pages
				if (
					pageNumber === currentPage - 2 ||
					pageNumber === currentPage + 2
				) {
					return <span key={pageNumber}>...</span>;
				}
				return null;
			})}

			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={!hasNext}
				className={`px-3 py-1 rounded ${
					!hasNext
						? "bg-gray-200 cursor-not-allowed"
						: "bg-blue-500 text-white hover:bg-blue-600"
				}`}>
				<span>&raquo;</span>
			</button>
		</div>
	);
};

export default Pagination;
