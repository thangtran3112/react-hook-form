import { FormProvider, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

import { defaultValues, ZAdvancedUser, schema } from "../schema/schema";
import { Users } from "./Users";
import useZustandForm from "../../stores/formStore";

export function UsersProvider() {
  const { mode } = useZustandForm();
  const methods = useForm<ZAdvancedUser>({
    mode: mode,
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
