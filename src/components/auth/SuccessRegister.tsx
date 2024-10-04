import icon from '../../assets/success-image.svg';

const SuccessRegister = () => {
  return (
    <div className="block-success">
      <h2 className="heading">User successfully registered</h2>
      <img src={icon} alt="icon" className="success-image" />
    </div>
  );
};

export default SuccessRegister;
