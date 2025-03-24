import { Fragment, useEffect } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";

import { useCreateUser, useEditUser } from "../services/mutations";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../services/queries";
import { defaultValues, ZAdvancedUser } from "../schema/schema";
import { RHFAutocomplete } from "../components/RHFAutocomplete";
import { RHFCheckbox } from "../components/RHFCheckbox";
import { RHFDateRangePicker } from "../components/RHFDateRangePicker";
import { RHFDateTimePicker } from "../components/RHFDateTimePicker";
import { RHFRadioGroup } from "../components/RHFRadioGroup";
import { RHFSlider } from "../components/RHFSlider";
import { RHFSwitch } from "../components/RHFSwitch";
import { RHFTextField } from "../components/RHFTextField";
import { RHFToggleButtonGroup } from "../components/RHFToggleButtonGroup";

export function Users() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const { watch, control, unregister, reset, setValue, handleSubmit } =
    useFormContext<ZAdvancedUser>();

  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });

  const userQuery = useUser(id);

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  const isTeacher = useWatch({ control, name: "isTeacher" });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const onSubmit: SubmitHandler<ZAdvancedUser> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };
  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack sx={{ gap: 2 }}>
          <RHFTextField<ZAdvancedUser> name="name" label="Name" />
          <RHFTextField<ZAdvancedUser> name="email" label="Email" />
          <RHFAutocomplete<ZAdvancedUser>
            name="states"
            label="States"
            options={statesQuery.data}
          />
          <RHFToggleButtonGroup<ZAdvancedUser>
            name="languagesSpoken"
            options={languagesQuery.data}
            label="Languages Spoken"
          />
          <RHFRadioGroup<ZAdvancedUser>
            name="gender"
            options={gendersQuery.data}
            label="Gender"
          />
          <RHFCheckbox<ZAdvancedUser>
            name="skills"
            options={skillsQuery.data}
            label="Skills"
          />

          <RHFDateTimePicker<ZAdvancedUser>
            name="registrationDateAndTime"
            label="Registration Date & Time"
          />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<ZAdvancedUser> name="formerEmploymentPeriod" />
          <RHFSlider<ZAdvancedUser> name="salaryRange" label="Salary Range" />
          <RHFSwitch<ZAdvancedUser>
            name="isTeacher"
            label="Are you a teacher?"
          />

          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField<ZAdvancedUser>
                name={`students.${index}.name`}
                label="Name"
              />
              <Button
                color="error"
                onClick={() => {
                  remove(index);
                }}
                type="button"
              >
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="contained" type="submit">
              {variant === "create" ? "Submit" : "Save"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
