interface PaginationProps {
  limit: number;
  total: number;
  offset: number;
  onPageChange: (offset: number) => void;
}

function Pagination({ limit, total, offset, onPageChange }: PaginationProps) {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / limit);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * limit;
    onPageChange(newOffset);
    goToTop();
  };

  const handleNext = () => {
    if (currentPage === totalPages) {
      handlePageChange(1);
    } else {
      handlePageChange(currentPage + 1);
    }
    goToTop();
  };

  return (
    <div className="flex items-center justify-center gap-[38px] py-[15px]">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`h-12 w-12 cursor-pointer rounded-[10px] font-poppins text-[20px] leading-[30px] font-normal transition sm:h-[60px] sm:w-[60px] ${
              currentPage === page
                ? "bg-[#B88E2F] text-white"
                : "bg-[#F9F1E7] text-black"
            } `}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        className="h-12 w-[80px] cursor-pointer rounded-[10px] bg-[#F9F1E7] font-poppins text-[20px] leading-[30px] font-normal text-black transition sm:h-[60px] sm:w-[98px]"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
