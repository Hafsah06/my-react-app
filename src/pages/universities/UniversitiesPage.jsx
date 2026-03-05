import { useState } from "react";
import Loader from "../../components/common/Loader";
import DataCard from "../../components/common/Cards";
import { fetchUniversities } from "../../api/universitiesApi";
import "./UniversitiesPage.css";


export default function UniversitiesPage() {
  const [country, setCountry] = useState("Pakistan");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unis, setUnis] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    setError("");
    setUnis([]);
    setLoading(true);

    try {
      const data = await fetchUniversities({ country, name });
      setUnis(data.slice(0, 12));
    } catch (error) {
      console.error("Error fetching universities:", error);
      setError(`Failed to load universities: ${error.message || "Try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 className="pageTitle">Universities</h2>
      <p className="muted">Search universities by country and optional name.</p>

      <form className="formRow" onSubmit={onSearch}>
        <input
          className="input"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country (e.g., Pakistan)"
        />
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="University name (optional)"
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>

      {loading && <Loader text="Loading universities..." />}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {unis.map((u, idx) => (
          <DataCard key={`${u.name}-${idx}`} title={u.name} subtitle={u.country}>
            <div className="cardText">
              <div>
                <b>Domain:</b> {u.domains?.[0] || "—"}
              </div>
              <div>
                <b>Website:</b>{" "}
                {u.web_pages?.[0] ? (
                  <a className="link" href={u.web_pages[0]} target="_blank" rel="noreferrer">
                    Open
                  </a>
                ) : (
                  "—"
                )}
              </div>
            </div>
          </DataCard>
        ))}
      </div>
    </div>
  );
}