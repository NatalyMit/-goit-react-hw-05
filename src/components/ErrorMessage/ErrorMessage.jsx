import { HiOutlineFaceFrown } from 'react-icons/hi2';
import css from './ErrorMessage.module.css';
const ErrorMessage = () => {
  return (
    <div>
      <p className={css.errorMessage}>
        Somethings wont wrong... <HiOutlineFaceFrown width={20} />
      </p>
    </div>
  );
};

export default ErrorMessage;
