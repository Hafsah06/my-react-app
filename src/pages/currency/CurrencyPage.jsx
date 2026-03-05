import { useMemo, useState } from "react";
import Loader from "../../components/common/Loader";
import DataCard from "../../components/common/Cards";
import { fetchLatestRates } from "../../api/currencyApi";
import "./CurrencyPage.css";

const PAGE_SIZE = 20;

export default function CurrencyPage() {
  const [base, setBase] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const onGetRates = async (e) => {
    e.preventDefault();
    setError("");
    setData(null);
    setLoading(true);

    try {
      const res = await fetchLatestRates(base);

      if (res?.result && res.result !== "success") {
        throw new Error(res["error-type"] || "API error");
      }

      setData({
        base: res.base_code,
        date: res.time_last_update_utc,
        rates: res.rates || {},
      });

      setSearch("");
      setPage(1);
    } catch (err) {
      console.log(
        "Currency error:",
        err?.response?.status,
        err?.response?.data,
        err
      );
      setError("Failed to load rates. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const allRatesArray = useMemo(() => {
    if (!data?.rates) return [];
    return Object.entries(data.rates); // [ [ "PKR", 279.2 ], ... ]
  }, [data]);

  const filteredRates = useMemo(() => {
    const q = search.trim().toUpperCase();
    if (!q) return allRatesArray;
    return allRatesArray.filter(([code]) => code.includes(q));
  }, [allRatesArray, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRates.length / PAGE_SIZE));

  const pagedRates = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRates.slice(start, start + PAGE_SIZE);
  }, [filteredRates, page]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="page">
      <h2 className="pageTitle">Currency Exchange</h2>
      

      <form className="formRow" onSubmit={onGetRates}>
        <input
          className="input small"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          placeholder="Base (USD)"
          name="base"
        />
        <button className="btn" type="submit">
          Get Rates
        </button>
      </form>

      {loading && <Loader text="Loading exchange rates..." />}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="stack">
          <DataCard
            title={`Base: ${data.base}`}
            subtitle={`Updated: ${data.date}`}
          >
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <input
                className="input"
                value={search}
                onChange={onSearchChange}
                placeholder="Search currency code e.g. PKR, EUR, GBP..."
                name="search"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="btn"
                onClick={goPrev}
                disabled={page === 1}
              >
                Prev
              </button>

              <span className="muted">
                Page <b>{page}</b> of <b>{totalPages}</b> — Showing{" "}
                <b>{pagedRates.length}</b> of <b>{filteredRates.length}</b>
              </span>

              <button
                type="button"
                className="btn"
                onClick={goNext}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>

            <div className="rates">
              {pagedRates.length === 0 ? (
                <p className="muted">No results found.</p>
              ) : (
                pagedRates.map(([code, rate]) => (
                  <div key={code} className="rateRow">
                    <b>{code}</b>
                    <span>{rate}</span>
                  </div>
                ))
              )}
            </div>
          </DataCard>
        </div>
      )}
    </div>
  );
}