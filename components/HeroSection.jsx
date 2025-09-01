

export const Hero = () => {
  return (
    <section className="w-full flex justify-center mt-10 md:mt-20">
      <div className="w-[90%] border border-[#3278e6] md:w-[85%] lg:w-[70%] bg-[#f3f6fc] rounded-2xl shadow-md flex flex-col md:flex-row items-center px-8 py-12 gap-10">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1
            className="text-3xl  lg:text-4xl font-bold text-[#2b2c43]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your AI Buddy <br /> for Mock Interviews
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Practice. Improve. Succeed. With real-time AI coaching.
          </p>

          <div className="flex  md:flex-row flex-col justify-start  gap-4 pt-4">
            <button className="px-2 py-3 lg:px-4 md:text-[14px] rounded-xl bg-[#3278e6] text-white font-medium shadow hover:bg-[#2563eb] active:scale-95 transition-all duration-300 ease-in-out">
               Start Interview
            </button>
            <button className="px-2 py-3 lg:px-4  md:text-[14px]  rounded-xl bg-white border border-gray-200 text-[#2b2c43] font-medium shadow hover:border-[#3278e6] active:scale-95 transition-all duration-300 ease-in-out">
               View Dashboard
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/meeting.svg"
            alt="AI Interview Illustration"
            className=" w-[234px]"
          />
        </div>
      </div>
    </section>
  );
};
