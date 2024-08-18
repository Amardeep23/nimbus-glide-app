import { React, useState } from "react";
import "./Homepage.css";

const Homepage = () => {
  const [payload, setPayload] = useState({
    githubLink: "",
    subDomain: "",
  });
  const [response, setResponse] = useState(null);
  const [buttonText, setButtonText] = useState("Host and get link");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onClickHandler = async () => {
    setButtonText("Project Queued to be Deployed... ✅ ");
    setIsButtonDisabled(true); 
    try {
      const data = await fetch("http://localhost:9000/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gitURL: payload.githubLink,
          slug: payload.subDomain,
        }),
      });

      const response = await data.json();
      setResponse(response.data);
    } catch (error) {
      console.error("Failed to fetch", error);
      setIsButtonDisabled(false); // Re-enable the button if there was an error
    }
  };

  const resetForm = () => {
    setPayload({ githubLink: "", subDomain: "" });
    setResponse(null);
    setButtonText("Host and get link");
    setIsButtonDisabled(false); // Re-enable the button if disabled
  };

  return (
    <div className="homepage">
      <div className="inner">
        <div className="homepage-1"> ☁ Enter Github link and Subdomain ☁ </div>
        <div className="homepage-2">
          <input
            type="text"
            name="githubLink"
            value={payload.githubLink}
            onChange={handleChange}
            placeholder="https://github.com/abc/project1.com"
          />
        </div>
        <div className="homepage-2a">
          <input
            type="text"
            name="subDomain"
            value={payload.subDomain}
            onChange={handleChange}
            placeholder="Enter desired project name / Sub-Domain Name"
          />
        </div>
        <div className="homepage-3">
          <button onClick={onClickHandler} disabled={isButtonDisabled}>
            {buttonText}
          </button>
          <button onClick={resetForm}>Reset</button> 
        </div>
        {response && (
          <div className="homepage-4"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <p>URL: <a href={response.url} target="_blank" rel="noopener noreferrer">{response.url}</a></p>
            <p
              style={{
                color: response.status === "success" ? "green" : "red",
              }}
            >Have patience while the project is being in deployment phase🧘‍♀️ </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
