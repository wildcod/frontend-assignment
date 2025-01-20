import React from 'react';
import './Button.css';

interface Props {
  testId?: string;
  children: string | JSX.Element;
  size?: 'small' | 'medium';
  disabled?: boolean;
  color?: string;
  onClick?(): void;
  variant?: 'contained' | 'outlined';
  className?: string;
}

const Button: React.FC<Props> = ({
  children,
  disabled,
  color,
  onClick,
  size = 'medium',
  testId = 'button',
  variant = 'contained'
}) => {
  return (
    <button
      data-testId={testId}
      className={`app-button ${size} ${variant}`}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
