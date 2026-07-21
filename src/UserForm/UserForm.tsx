import { useForm } from "react-hook-form";
import { StringField } from "../components/form/StringField";

interface FormValues {
  name: string;
  email: string;
  dateOfBirth: string;
  favouriteColour: string;
  salary: number;
}

export default function UserForm() {
  const { register } = useForm<FormValues>();

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
    </form>
  );
}
