import { Controller, Mode, SubmitHandler, useForm } from "react-hook-form";
import { SimpleUserType, schema } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Checkbox,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { Option } from "../../types/option";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const initialMode: Mode = "all";
const stateOptions: Option[] = [
  { id: "1", label: "California" },
  { id: "2", label: "Washington" },
  { id: "3", label: "Oregon" },
  { id: "4", label: "Texas" },
  { id: "5", label: "Florida" },
  { id: "6", label: "New York" },
  { id: "7", label: "Illinois" },
  { id: "8", label: "Pennsylvania" },
  { id: "9", label: "Ohio" },
  { id: "10", label: "Georgia" },
  { id: "11", label: "North Carolina" },
  { id: "12", label: "Michigan" },
  { id: "13", label: "New Jersey" },
  { id: "14", label: "Virginia" },
  { id: "15", label: "Arizona" },
  { id: "16", label: "Massachusetts" },
  { id: "17", label: "Tennessee" },
  { id: "18", label: "Indiana" },
  { id: "19", label: "Missouri" },
  { id: "20", label: "Maryland" },
];

const SimpleUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<SimpleUserType>({
    mode: initialMode,
    // defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<SimpleUserType> = (data) => {};

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2 }}>
        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Controller
          name="states"
          control={control}
          render={({
            field: { value, onChange, ref },
            fieldState: { error },
          }) => (
            <Autocomplete
              options={stateOptions}
              value={(value || []).map((id: string) =>
                stateOptions?.find((item) => item.id === id)
              )}
              getOptionLabel={(option) =>
                stateOptions?.find((item) => item.id === option?.id)?.label ??
                ""
              }
              isOptionEqualToValue={(option, newValue) =>
                option?.id === newValue?.id
              }
              onChange={(_, newValue) => {
                onChange(newValue.map((item) => item?.id));
              }}
              disableCloseOnSelect
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  inputRef={ref}
                  error={!!error}
                  helperText={error?.message}
                  label="States"
                />
              )}
              renderOption={({ key, ...otherProps }, option, { selected }) => (
                <Box key={key} component="li" {...otherProps}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckBoxIcon />}
                    checked={selected}
                  />
                  {option?.label}
                </Box>
              )}
            />
          )}
        />
      </Stack>
    </Container>
  );
};

export default SimpleUser;
