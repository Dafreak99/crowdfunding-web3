type CustomButtonProps = {
  btnType: 'button' | 'submit' | 'reset';
  title: string;
  isLoading?: boolean;
  styles: string;
  handleClick?: () => void;
};

const CustomButton = ({
  btnType,
  title,
  isLoading,
  handleClick,
  styles,
}: CustomButtonProps) => {
  return (
    <button
      type={btnType}
      className={`cursor-pointer font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles} ${
        isLoading ? 'opacity-50 disabled:cursor-not-allowed' : ''
      }`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
