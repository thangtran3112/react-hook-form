import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Option } from "../../types/option";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ...restField },
        fieldState: { error },
      }) => (
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <ToggleButtonGroup
            onChange={(_, newValue) => {
              if (newValue.length) {
                onChange(newValue);
              }
            }}
            value={value.length ? value : [options?.[0].id]}
            {...restField}
          >
            {options?.map((option) => (
              <ToggleButton value={option.id} key={option.id}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {error && <Typography color="red">{error.message}</Typography>}
        </FormControl>
      )}
    ></Controller>
  );
}
