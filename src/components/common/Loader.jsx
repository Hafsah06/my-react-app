import "./loader.css";

function Loader({text = "Loading..."}) {
    return (
        <div className="loaderWrap">
            <div className="spinner" aria-label="Loading" />
            <p className="muted">{text}</p>
        </div>
    );
}

export default Loader;