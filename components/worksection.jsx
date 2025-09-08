import { CgProfile } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

export const Work = () => {
  const steps = [
    {
      title: "Sign Up",
      desc: "Create your account and set up your profile in minutes.",
      icon: <CgProfile />,
      color: "#50337c",
    },
    {
      title: "Practice",
      desc: "Start mock interviews with real-time AI coaching.",
      icon: <FaMicrophone />,
      color: "#aca3b1",
    },
    {
      title: "Get Feedback",
      desc: "Receive instant, actionable feedback to improve.",
      icon: <FaCheckCircle />,
      color: "#57d28c",
    },
  ];

  return (
    <section className="w-full flex justify-center mt-10 md:mt-20 bg-[#f5f7f9] py-12">
      <div className="w-[90%] md:w-[85%] lg:w-[70%]">
       
        <div className="flex justify-center mb-12">
          <h1 className="font-semibold text-4xl bg-white px-6 py-3 rounded-2xl text-black border border-green-300 shadow-md">
            How it works?
          </h1>
        </div>

       
        <div className="grid gap-6  md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all ease-in border border-gray-100"
            >
              <div
                className="flex items-center  bg-blue-100 justify-center w-14 h-14 rounded-xl mb-4 text-3xl"
                style={{ color: step.color }}
              >
                {step.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h2>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {step.desccc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
