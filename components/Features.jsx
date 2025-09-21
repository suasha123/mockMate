import { MdOutlineScheduleSend } from "react-icons/md";
import { SiGooglegemini } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineInsights } from "react-icons/md";
export const Feature = () => {
  return (
    <section className="w-full flex justify-center mt-10 md:mt-20  relative">
      <div className=" lg:h-[300px] h-[450px]  sm:h-[350px] bg-blue-100 absolute bottom-0 w-full z-0"></div>
      <div className="w-[90%] md:w-[85%] lg:w-[70%] pb-3">
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Key Features
          </h1>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
            <span className="text-5xl"><SiGooglegemini style={{color : "#4d9bf6"}}/></span>
            <h3 className="text-lg font-semibold mt-4">
              AI Content Generation
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Instantly create captions, hashtags, and creative ideas tailored
              to your brand.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
            <span className="text-5xl"><MdOutlineScheduleSend color="green"/></span>
            <h3 className="text-lg font-semibold mt-4">Smart Scheduling</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Plan posts ahead with a drag-and-drop calendar that fits your
              workflow.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
            <span className="text-5xl"><FaInstagram className="text-pink-500" /></span>
            <h3 className="text-lg font-semibold mt-4">
              Multi-Platform Posting
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Publish automatically to Twitter, LinkedIn, and Instagram with one
              click.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
            <span className="text-5xl"><MdOutlineInsights className="text-red-500"/></span>
            <h3 className="text-lg font-semibold mt-4">Performance Insights</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Track engagement and discover what content works best for your
              audience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
