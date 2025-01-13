import React, { useState } from "react";
import "./App.css";

const StatisticLine = ({ text, value, classn }) => {
  return (
    <>
      <tr className={classn}>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ puntos }) => {
  let flag = puntos.Good + puntos.Bad + puntos.Neutral > 0 ? true : false;

  if (flag) {
    let all = puntos.Good + puntos.Bad + puntos.Neutral;
    let positive = all === 0 ? 0 : (puntos.Good / all) * 100;
    let average = all === 0 ? 0 : (puntos.Good - puntos.Bad) / all;

    return (
      <div className="tablestat">
        <table>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine
              classn={"bg-success fw-bold"}
              text={"Good"}
              value={puntos.Good}
            />
            <StatisticLine
              classn={"bg-warning fw-bold"}
              text={"Neutral"}
              value={puntos.Neutral}
            />
            <StatisticLine
              classn={"bg-danger fw-bold"}
              text={"Bad"}
              value={puntos.Bad}
            />
            <StatisticLine
              classn={"bg-primary fw-bold"}
              text={"All"}
              value={all}
            />
            <StatisticLine
              classn={"bg-primary fw-bold"}
              text={"Average"}
              value={average}
            />
            <StatisticLine
              classn={"bg-primary fw-bold"}
              text={"Positive"}
              value={positive + "%"}
            />
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <p>No data...</p>
    </>
  );
};

function App() {
  const tiposC = ["Good", "Bad", "Neutral"];
  const [puntos, setPuntos] = useState({ Good: 0, Bad: 0, Neutral: 0 });

  const clicGood = () => setPuntos({ ...puntos, Good: puntos.Good + 1 });
  const clicNeutral = () => setPuntos({ ...puntos, Neutral: puntos.Neutral + 1 });
  const clicBad = () => setPuntos({ ...puntos, Bad: puntos.Bad + 1 });

  return (
    <>
      <h1>Unicafe comentarios FeedBack</h1>
      <button
        className="btn btn-success border-white border-2"
        onClick={clicGood}
      >
        {tiposC[0]}
      </button>
      <button
        className="btn btn-danger border-white border-2"
        onClick={clicBad}
      >
        {tiposC[1]}
      </button>
      <button
        className="btn btn-warning border-white border-2"
        onClick={clicNeutral}
      >
        {tiposC[2]}
      </button>

      <h2>Statistics</h2>
      <Statistics puntos={puntos} />
    </>
  );
}

export default App;
