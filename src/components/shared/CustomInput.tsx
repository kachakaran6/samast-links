import { useId } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Textarea,
} from "../ui";

const CustomInput = ({
  control,
  className,
  label,
  placeholder,
  inputOnly,
  type = "text",
  errorText = "",
  name,
  isRequired,
  isTextArea,
  value,
  onChange,
  error,
  readOnly,
  disabled,
}: any) => {
  const id = useId();

  return (
    <>
      {inputOnly ? (
        <div className="flex flex-col w-full gap-1.5">
          {label && (
            <Label htmlFor={id} className="shad-form_label">
              {label}
              {isRequired && <span className="text-rose-500"> *</span>}
            </Label>
          )}
          {isTextArea ? (
            <Textarea
              id={id}
              rows={3}
              className={`shad-textarea custom-scrollbar ${className}`}
              placeholder={placeholder}
            />
          ) : (
            <Input
              className={`shad-input ${className}`}
              type={type}
              id={id}
              value={value}
              name={name}
              min={1}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              placeholder={placeholder}
            />
          )}
          {error && error?.show && (
            <div className="shad-form_message">{error?.text}</div>
          )}
        </div>
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="w-full">
              {label && (
                <FormLabel className="shad-form_label">{label}</FormLabel>
              )}
              <FormControl>
                {isTextArea ? (
                  <Textarea
                    className={`shad-textarea custom-scrollbar ${className}`}
                    placeholder={placeholder}
                    rows={3}
                    {...field}
                  />
                ) : (
                  <Input
                    className={`shad-input ${className}`}
                    placeholder={placeholder}
                    type={type}
                    readOnly={readOnly}
                    disabled={disabled}
                    {...field}
                  />
                )}
              </FormControl>
              <FormMessage className="shad-form_message">
                {errorText ? errorText : ""}
              </FormMessage>
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CustomInput;
