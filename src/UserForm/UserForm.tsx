import { useForm, useWatch } from "react-hook-form";
import { StringField } from "../components/form/StringField";
import { RangeField } from "../components/form/RangeField";

interface FormValues {
  name: string;
  email: string;
  dateOfBirth: string;
  favouriteColour: string;
  salary: number;
}

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function UserForm() {
  const { register, control } = useForm<FormValues>({
    defaultValues: { salary: 0 },
  });

  const currentSalary = useWatch({
    control,
    name: "salary",
  });

  return (
    <form>
      <StringField id="name" label="Name" registration={register("name")} />

      <StringField
        id="email"
        type="email"
        label="Email"
        registration={register("email")}
      />

      <StringField
        id="dateOfBirth"
        type="date"
        label="Date of birth"
        registration={register("dateOfBirth")}
      />

      <StringField
        id="favouriteColour"
        type="text"
        label="Favourite colour"
        registration={register("favouriteColour")}
      />

      <RangeField
        id="salary"
        label="Salary"
        min="0"
        max="150000"
        step="1000"
        currentValue={gbpFormatter.format(currentSalary)}
        registration={register("salary")}
      />
    </form>
  );
}
