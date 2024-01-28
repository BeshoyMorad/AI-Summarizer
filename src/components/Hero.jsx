import Navbar from "./Navbar";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <Navbar />

      <h1 className="head-text">
        Summarize Articles with <br />
        <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          OpenAI GPT-4
        </span>
      </h1>

      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
