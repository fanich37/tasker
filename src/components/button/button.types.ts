import React, { ButtonHTMLAttributes } from 'react';

interface ButtonOnClick {
  (event: React.SyntheticEvent<HTMLButtonElement>): void;
}

export interface ButtonProps {
  children: React.ReactChild;
  disabled?: ButtonHTMLAttributes<void>['disabled'];
  size?: 'large' | 'medium' | 'small';
  fullWidth?: boolean;
  type?: ButtonHTMLAttributes<void>['type'];
  onClick?: ButtonOnClick;
}

export interface ButtonWithLoaderProps extends ButtonProps {
  isLoading: boolean;
}
