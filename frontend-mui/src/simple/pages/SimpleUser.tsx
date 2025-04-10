import { Controller, Mode, SubmitHandler, useForm } from "react-hook-form";
import {
  ZSimpleUserType,
  defaultValues,
  simpleUserSchema,
} from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Option } from "../../types/option";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import useZustandForm from "../../stores/formStore";
import { DevTool } from "@hookform/devtools";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

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

const languagesOptions: Option[] = [
  { id: "1", label: "English" },
  { id: "2", label: "Spanish" },
  { id: "3", label: "Mandarin" },
  { id: "4", label: "Hindi" },
  { id: "5", label: "Arabic" },
];

const genderOptions: Option[] = [
  { id: "1", label: "Male" },
  { id: "2", label: "Female" },
  { id: "3", label: "Unknown" },
];

const skillsOptions: Option[] = [
  { id: "1", label: "CS2" },
  { id: "2", label: "Doom" },
  { id: "3", label: "LOL" },
  { id: "4", label: "Fifa" },
  { id: "5", label: "Mario" },
  { id: "6", label: "Sonic" },
  { id: "7", label: "Megaman" },
];

const SimpleUser = () => {
  const { mode } = useZustandForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<ZSimpleUserType>({
    mode: mode ?? initialMode,
    defaultValues,
    resolver: zodResolver(simpleUserSchema),
  });

  const handleReset = () => {
    reset(defaultValues);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<ZSimpleUserType> = (data) => {};

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
        {/* CONVERT STRING FROM INPUT TO NUMBER TYPE */}
        <Controller
          name="age"
          control={control}
          render={({
            field: { value, onChange, ref },
            fieldState: { error },
          }) => (
            <TextField
              label="Age"
              type="number"
              value={value ?? ""}
              onChange={(e) => onChange(Number(e.target.value))}
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        {/* States Autocomplete with mutliple badges */}
        <Controller
          name="states"
          control={control}
          render={({
            field: { value, onChange, ref },
            fieldState: { error },
          }) => (
            <Autocomplete
              options={stateOptions}
              // convert form value to component value
              // (value is an array of ids, we need to find the corresponding objects)
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
              // component value to form value
              // (newValue is an array of objects, we need to extract the ids)
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
              renderTags={() => []} // Hide the selected options tags in input
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
        {/* Toggle Button Group of Language Spoken */}
        <Controller
          control={control}
          name="languagesSpoken"
          render={({
            field: { onChange, value, ...restField },
            fieldState: { error },
          }) => (
            <FormControl error={!!error}>
              <FormLabel>Languages Spoken</FormLabel>
              <ToggleButtonGroup
                onChange={(_, newValue) => {
                  if (newValue.length) {
                    onChange(newValue);
                  }
                }}
                value={value.length ? value : [languagesOptions?.[0].id]}
                {...restField}
              >
                {languagesOptions?.map((option) => (
                  <ToggleButton value={option.id} key={option.id}>
                    {option.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />

        {/* GENDER SECTION */}
        <Controller
          control={control}
          name="gender"
          render={({ field, fieldState: { error } }) => (
            <FormControl {...field} error={!!error}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup>
                {genderOptions?.map((option) => (
                  <FormControlLabel
                    value={option.id}
                    control={<Radio checked={field.value === option.id} />}
                    label={option.label}
                    key={option.id}
                  />
                ))}
              </RadioGroup>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />

        {/* Multiple checkbox for SKILLS */}

        {/* Datetime validation */}
        <Typography variant="body2" color="text.secondary">
          Based on declared Age, users must select a corresponding number of
          skills
        </Typography>
        <Controller
          control={control}
          name="skills"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <FormLabel>Skills</FormLabel>
              <FormGroup>
                {skillsOptions?.map((option) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        // form to component
                        checked={value.includes(option.id)}
                        // component to form
                        onChange={() => {
                          if (value.includes(option.id)) {
                            onChange(
                              (value as string[]).filter(
                                (item) => item !== option.id
                              )
                            );
                          } else {
                            onChange([...value, option.id]);
                          }
                        }}
                        key={option.id}
                      />
                    }
                    label={option.label}
                    key={option.id}
                  />
                ))}
              </FormGroup>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Typography variant="body2" color="text.secondary">
          Based on declared Age, registration date cannot be before user
          reaching 18 years old
        </Typography>
        <Controller
          control={control}
          name="registrationDateAndTime"
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker label="Registration Date" {...field} />
              </LocalizationProvider>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />

        {/* SUBMIT BUTTON */}
        <Stack
          sx={{
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Stack>
      </Stack>
      <DevTool control={control} />
    </Container>
  );
};

export default SimpleUser;
