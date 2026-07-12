import React, { useEffect, useState } from "react";
import type { Diary } from "./type";
import { create, getAll } from "./diaryServices";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setvisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const diaryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    create({ date, weather, visibility, comment })
      .then((data) => {
        setDiaries(diaries.concat(data));
        setDate("");
        setComment("");
        setWeather("");
        setvisibility("");
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      });
  };

  useEffect(() => {
    getAll().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <h2>Add new entry</h2>
      <small style={{ color: "red" }}>{errorMessage}</small>
      <form onSubmit={diaryCreation}>
        <label htmlFor="date">date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <div>
          <span>visibility</span>
          {["great", "good", "ok", "poor"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={(e) => setvisibility(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
        <br />
        <div>
          <span>weather</span>
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={(e) => setWeather(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
        <br />
        <label htmlFor="comment">comment</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
      <h3>Diary entries</h3>
      {diaries.map((d) => (
        <div key={d.id}>
          <h4>{d.date}</h4>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
