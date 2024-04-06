import React, { useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import CopyLinkContainer from "./CopyLink/CopyLinkContainer";

const LinkShortener = () => {
  const [originalLink, setOriginalLink] = useState("");
  const [expiration, setExpiration] = useState(1);
  const [shortenedLink, setShortenedLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleShorten = async (e) => {
    e.preventDefault();

    try {
      // Check if the originalLink is empty
      if (!originalLink.trim()) {
        setErrorMessage("Input Field cannot be empty");
        return;
      }

      // Regular expression to match URL format
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

      // Check if the input matches the URL format
      if (!urlRegex.test(originalLink)) {
        setErrorMessage("Please enter a valid URL");
        return;
      }

      // Send POST request to backend
      const response = await axios.post("https://picolink-org.onrender.com/create", {
        url: originalLink,
        validity: expiration,
      });

      // Extract shortened link from response
      const { link } = response.data;
      // console.log(link);
      // console.log(`https://picolink.org/${link}`);

      // Update state with shortened link
      setShortenedLink(link);
      setErrorMessage("");
    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made and the server responded with a status code
        setErrorMessage(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("Server is not responding");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error(error);
        setErrorMessage("An error occurred while shortening the link.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="lg:w-1/3 md:w:2/3 sm:w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">PicoLink.org</h1>
        <h3 className="text-xl mb-4">Short Link Generator for professionals</h3>
        <hr />
        <form onSubmit={handleShorten} className="space-y-4 mt-2">
          <div>
            <label
              htmlFor="originalLink"
              className="block text-gray-800 font-bold mb-2"
            >
              Original Link
            </label>
            <div className="relative">
              <input
                type="text"
                id="originalLink"
                // value={originalLink}
                onChange={(e) => setOriginalLink(e.target.value)}
                className={`w-full border p-2 rounded-lg ${
                  errorMessage && "border-red-500"
                }`}
                placeholder="Enter the link to shorten"
                // required
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <label
                htmlFor="expiration"
                className="block text-gray-800 font-bold mb-2"
              >
                Expiration
              </label>
              <select
                id="expiration"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
              >
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="7">7 days</option>
              </select>

              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() =>
                  navigator.clipboard
                    .readText()
                    .then((text) => setOriginalLink(""))
                }
              >
                📋
              </span>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
            >
              Shorten Link
            </button>
          </div>
        </form>
        {shortenedLink && (
          <div className="mt-6">
            <p className="font-bold">Shortened Link:</p>
            {/* <a
              href={shortenedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              https://picolink.org/{shortenedLink}
            </a> */}
            <CopyLinkContainer link={shortenedLink} />
          </div>
        )}
        {errorMessage &&
          errorMessage.response &&
          errorMessage.response.status === 404 && <p>{errorMessage}</p>}
        {/* Disclaimer Label */}
        <article className="text-pretty mt-4">
          <p className="text-sm text-gray-600">
            We don't track or monitor the links you share, but don't share
            phishing, porn, spam, or tracking links. They will be blocked
            automatically.
          </p>
        </article>
      </div>
    </div>
  );
};

export default LinkShortener;
