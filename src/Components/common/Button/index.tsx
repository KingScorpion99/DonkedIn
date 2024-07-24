import "./index.scss";

const Button = ({ title, onClick }: any) => {
  return (
    <button className="common-btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
