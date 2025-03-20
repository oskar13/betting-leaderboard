import leaderbordLogo from "/leaderboard.png";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchLeaderboard } from "./requests";
import type { BettingLeaderboardEntry, CustomerCountry } from "./types";

function App() {
  const [leaderboard, setLeaderboard] = useState<BettingLeaderboardEntry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CustomerCountry>("ALL");

  async function loadLeaderboard(country: CustomerCountry) {
    const data = await fetchLeaderboard(country);
    setLeaderboard(data);
  }



  useEffect(() => {
    loadLeaderboard(selectedCountry);
  }, [selectedCountry]);

  return (
    <>
      <div>
        <img src={leaderbordLogo} className="logo" alt="Leaderboard logo" />
      </div>
      <h1>Betting Leaderboard</h1>
      <p>Filter leaderboard by country:</p>
      <select 
        id="country-select" 
        value={selectedCountry} 
        onChange={(e) => setSelectedCountry(e.target.value as CustomerCountry)}
      >
        <option value="ALL">All</option>
        <option value="Estonia">Estonia</option>
        <option value="Finland">Finland</option>
        <option value="Norway">Norway</option>
        <option value="Chile">Chile</option>
        <option value="Canada">Canada</option>
      </select>

      <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Total Bets</th>
            <th>Win %</th>
            <th>Profit (€)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.first_name} {entry.last_name}</td>
              <td>{entry.country}</td>
              <td>{entry.total_bets}</td>
              <td>{entry.win_percentage}%</td>
              <td>€ {entry.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default App;
