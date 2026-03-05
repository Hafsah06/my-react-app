import "./Cards.css";

function DataCard({ title, subtitle, children }) {
    return (
        <div className="card">
            {title && <h3 className="cardTitle">{title}</h3>}
            {subtitle && <p className="cardSubtitle">{subtitle}</p>}
            <div className="cardBody">{children}</div>
        </div>
    );
}

export default DataCard;