import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isError, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({
      articleUrl: article.url,
    });

    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };

      const updatedAllArticles = [newArticle.url, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search bar */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            className="absolute left-0 my-2 ml-3 w-5"
            src={linkIcon}
            alt="link-icon"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url-input peer"
          />
          <button className="submit-btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            {">"}
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col max-h-60 gap-1 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key={index} className="link-card">
              <div className="copy-btn" onClick={() => handleCopy(item)}>
                <img
                  src={copied === item ? tick : copy}
                  alt="copy-icon"
                  className="w-[50%] h-[50%] object-contain"
                />
              </div>
              <p
                className="flex-1 font-satoshi text-blue-700 font-medium truncate"
                onClick={() => setArticle(item)}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loader-icon"
            className="w-10 h-10 object-contain"
          />
        ) : isError ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that was not supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article:
                <span className="bg-gradient-to-r from-blue-500 via-gray-700-500 to-pink-500 bg-clip-text text-transparent">
                  Summary
                </span>
              </h2>

              <div className="summary-box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
