import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CustomPagination = () => {
  return (
    <Pagination className="mt-5">
      <PaginationContent className="gap-6">
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem className="w-25">
          <PaginationLink href="#" className="w-25" isActive>
            Thur April 3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="w-25">
          <PaginationLink href="#" className="w-25">
            Fri April 4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="w-25">
          <PaginationLink href="#" className="w-25">
            Sat April 5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="w-25">
          <PaginationLink href="#" className="w-25">
            Sun April 6
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="w-25">
          <PaginationLink href="#" className="w-25">
            Mon April 7
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="w-25">
          <PaginationLink href="#" className="w-25">
            Tue April 8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="w-25">
          <PaginationLink href="#" className="w-25">
            Wed April 9
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
