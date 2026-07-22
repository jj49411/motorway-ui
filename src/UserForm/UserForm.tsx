import { useForm, useWatch } from "react-hook-form";
import { StringField } from "../components/form/StringField";
import { RangeField } from "../components/form/RangeField";
import { css } from "@emotion/css";

const formClassname = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const submitButtonClassname = css`
  background-color: #ffe14c;
  padding: 10px 30px;
  cursor: pointer;
  border: 1px #ffe14c solid;
  border-radius: 4px;
`;

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

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function UserForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { salary: 0 },
  });

  // watch salary changes, re-render and display slider value
  const currentSalary = useWatch({
    control,
    name: "salary",
  });

  function onSubmit(data: FormValues) {
    console.log(`Form submitted with data: ${data}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={formClassname}
    >
      <StringField
        id="name"
        label="Name"
        registration={register("name", { required: "Name is required" })}
        error={errors.name?.message}
        required
      />

      <StringField
        id="email"
        type="email"
        label="Email"
        registration={register("email", {
          required: "Email is required",
          pattern: {
            value: emailRegex,
            message: "Invalid email address",
          },
        })}
        error={errors.email?.message}
        required
      />

      <StringField
        id="dateOfBirth"
        type="date"
        label="Date of birth"
        registration={register("dateOfBirth", {
          required: "Date of birth is required",
          validate: (value) => {
            const selectedDate = new Date(value);
            const today = new Date();

            if (selectedDate < today) return true;
            return "Date of birth must be in the past";
          },
        })}
        error={errors.dateOfBirth?.message}
        required
      />

      <StringField
        id="favouriteColour"
        type="text"
        label="Favourite colour"
        registration={register("favouriteColour", {
          required: "Favourite colour is required",
        })}
        error={errors.favouriteColour?.message}
        required
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

      <button
        type="submit"
        disabled={isSubmitting}
        className={submitButtonClassname}
      >
        Submit
      </button>
    </form>
  );
}
