import "./Button.css";

const Button = ({ varient, onClick, children }) => {
    return (
        <button type="button" className={"btn " + varient} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
