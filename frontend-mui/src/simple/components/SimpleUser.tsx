import { Mode, useForm } from "react-hook-form";
import { Schema, schema } from "../../advanced/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material";

const initialMode: Mode = "onBlur";

const SimpleUser = () => {
  const {
    register,
    formState: { errors },
  } = useForm<Schema>({
    mode: initialMode,
    // defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });
  return (
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
    </Stack>
  );
};

export default SimpleUser;
