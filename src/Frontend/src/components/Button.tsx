const Button = ({value, onClick, margin}: any) => {
    return (
        <div className={`button-container ${margin}`}>
            <button onClick={onClick} className="request-offer">
                <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
                </span>
                <span className="button-text">{value}</span>
            </button>
        </div>
    )
}

export default Button
