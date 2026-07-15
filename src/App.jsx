import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);

  const getJoke = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      const data = await response.json();

      setAnimate(false);

      setTimeout(() => {
        setJoke(data);
        setAnimate(true);
      }, 200);

      setCount((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    getJoke();
  }, []);

  const copyJoke = async () => {
    await navigator.clipboard.writeText(
      `${joke.setup}\n\n${joke.punchline}`
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareJoke = async () => {
    const text = `${joke.setup}\n\n${joke.punchline}`;

    if (navigator.share) {
      navigator.share({
        title: "Funny Joke 😂",
        text,
      });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Your browser doesn't support sharing.\nThe joke has been copied instead.");
    }
  };

  return (
    <div className="container">

      <div className="counter">
        😂 Jokes Viewed : {count}
      </div>

      <div className="card">

        <div className="card-content">

          <div className="emoji">
            🤡
          </div>

          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className={animate ? "fade active" : "fade"}>

              <h2>{joke.setup}</h2>

              <div className="line"></div>

              <p>{joke.punchline}</p>

            </div>
          )}

        </div>

      </div>

      <div className="buttons">

        <button onClick={getJoke}>
          🎲 New Joke
        </button>

        <button onClick={copyJoke}>
          📋 Copy
        </button>

        <button onClick={shareJoke}>
          📤 Share
        </button>

      </div>

      {copied && (
        <div className="toast">
          ✅ Joke Copied!
        </div>
      )}

    </div>
  );
}

export default App;