"use client";
function Incentive() {
  return (
    <div className="flex w-full items-center justify-center gap-[12px] rounded-[200px] border-2 border-blue-50 bg-white px-[24px] py-[12px] text-blue-500 dark:border-blue-500 dark:bg-inherit dark:text-white">
      <p className="text-center text-base font-medium">
        <span>Contact Parminder Bajwa for a free consultation! </span>
        <span className="hidden md:inline">
          {" "}
          Discover the true value of your property today!
        </span>
      </p>
    </div>
  );
}

export default Incentive;
