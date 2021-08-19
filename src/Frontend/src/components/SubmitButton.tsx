const SubmitButton = ({value, onClick, margin}: any) => {
    return (
        <div className={`button-container ${margin}`}>
            <button onClick={onClick} className="submit">
                <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
                </span>
                <span className="button-text">{value}</span>
            </button>
        </div>
    )
}

export default SubmitButton;
