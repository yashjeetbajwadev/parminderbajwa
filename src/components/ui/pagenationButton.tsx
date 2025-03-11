import { useRouter } from "next/navigation";
import { Button } from "./button";

export type PagenationButtonProps = {
  currentItems: number;
  maxItems: number;
  title: string;
  currentPage: number;
  totalPages: number;
  path: string;
};

export function PagenationButton({
  currentItems,
  maxItems,
  title,
  currentPage,
  totalPages,
  path,
}: Readonly<PagenationButtonProps>) {
  let router = useRouter();
  function changePage(page: number) {
    router.push(`${path}/${page}`);
  }

  return (
    <div className="flex items-center justify-between my-8">
      <p className="mr-4 text-sm text-muted-foreground md:text-base">
        Showing {currentItems} of {maxItems} {title}
      </p>
      <div className="flex gap-2">
        <Button
          buttonevent="Listings Previous Page"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              changePage(currentPage - 1);
            }
          }}
        >
          Previous
        </Button>
        <Button
          buttonevent="Listings Next Page"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => {
            let thisCurrentPage = currentPage;
            if (thisCurrentPage < totalPages) {
              changePage(currentPage + 1);
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
