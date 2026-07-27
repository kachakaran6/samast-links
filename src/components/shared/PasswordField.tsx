import { CustomInput } from ".";

const PasswordField = ({ control, placeholder, label, name }: any) => {
  return (
    <>
      <CustomInput
        placeholder={placeholder}
        type={"password"}
        control={control}
        className="max-sm:!max-h-12 !max-h-10 !mt-[2px]"
        name={name}
        label={label}
      />
    </>
  );
};

export default PasswordField;
