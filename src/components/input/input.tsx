import React, {
  AllHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

interface InputOnchange {
  (event: React.SyntheticEvent<InputOnchange>): void;
}

export interface InputProps {
  name: InputHTMLAttributes<InputOnchange>['name'];
  control: any;
  id: AllHTMLAttributes<InputOnchange>['id'];
  label: AllHTMLAttributes<InputOnchange>['label'];
  type?: InputHTMLAttributes<InputOnchange>['type'];
  placeholder?: InputHTMLAttributes<InputOnchange>['placeholder'];
  disabled?: InputHTMLAttributes<InputOnchange>['disabled'];
  required?: InputHTMLAttributes<InputOnchange>['required'];
  defaultValue?: HTMLAttributes<InputOnchange>['defaultValue'];
  error?: string;
  fullWidth?: boolean;
  dataTestId?: string;
}

const InputLabelProps = {
  shrink: true,
};

export const Input = ({
  name = '',
  control,
  type = 'text',
  id,
  label,
  placeholder = label,
  error = '',
  fullWidth = true,
  disabled = false,
  required = false,
  defaultValue = '',
  dataTestId,
}: InputProps) => {
  const isError = Boolean(error);

  return (
    <FormControl
      data-testid={dataTestId}
      component="fieldset"
      fullWidth={fullWidth}
      error={isError}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            id={id}
            placeholder={required ? `${placeholder} (required)` : placeholder}
            fullWidth={fullWidth}
            disabled={disabled}
            required={required}
            variant="outlined"
            helperText={error}
            label={label}
            InputLabelProps={InputLabelProps}
            error={isError}
          />
        )}
      />
    </FormControl>
  );
};
