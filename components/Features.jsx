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
            <span className="text-4xl">🎤</span>
            <h3 className="text-lg font-semibold mt-4">Voice Interviews</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Practice real interviews with AI in a natural voice conversation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
            <span className="text-4xl">🙂</span>
            <h3 className="text-lg font-semibold mt-4">Emotion Detection</h3>
            <p className="text-gray-600 mt-2 text-sm">
              AI detects nervousness, confidence & other emotions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
            <span className="text-4xl">📊</span>
            <h3 className="text-lg font-semibold mt-4">Personalized Feedback</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Get instant feedback on your answers & body language.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
            <span className="text-4xl">🏆</span>
            <h3 className="text-lg font-semibold mt-4">Gamified Learning</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Track progress & earn badges as you improve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
