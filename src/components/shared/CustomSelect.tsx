import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomSelect({
  items,
  onSelect,
  defaultVal,
  children,
  bind_value,
  bind_label,
  placeholder,
  customLabelText = "",
  value = "",
  label,
}: any) {
  return (
    <SelectGroup className="w-full">
      <Select onValueChange={onSelect} defaultValue={defaultVal} value={value}>
        {label && <SelectLabel>{label}</SelectLabel>}
        <SelectTrigger className="!bg-dark-2 !border-2 !border-dark-4 btn-shadow hover:!border-dark-4">
          <SelectValue placeholder={placeholder}></SelectValue>
        </SelectTrigger>
        {items && items?.length > 0 && (
          <SelectContent className="!bg-dark-2">
            {items.map((ele: any, i: number) => (
              <SelectItem
                key={ele[bind_value] || i}
                value={bind_value ? ele[bind_value] : ele}
                className={`${
                  value == (bind_value ? ele[bind_value] : ele)
                    ? "!bg-dark-4"
                    : ""
                } !py-3 rounded-d`}>
                {customLabelText + ele[bind_label]}
              </SelectItem>
            ))}
          </SelectContent>
        )}
        {!items && children}
      </Select>
    </SelectGroup>
  );
}
