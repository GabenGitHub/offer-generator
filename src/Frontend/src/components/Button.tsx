const Button = ({value}: any) => {
    return (
        <div className="button-container">
            <button className="request-offer">
                <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
                </span>
                <span className="button-text">{value}</span>
            </button>
        </div>
    )
}

export default Button
