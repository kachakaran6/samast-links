import { CustomSelect } from "@/components/shared/CustomSelect";
import { useState } from "react";
import BlockFormButtons from "./BlockFormButtons";

const Space = ({
  element,
  setOpen,
  handeBlockFormSubmit,
  selectedIndex,
}: any) => {
  const [value, setvalue] = useState(element.val.size);
  const handleSelect = (data: any) => {
    setvalue(data);
  };

  const handleSubmit = () => {
    handeBlockFormSubmit({ size: value });
  };
  return (
    <>
      <CustomSelect
        defaultVal={value}
        onSelect={handleSelect}
        placeholder={"Select space size"}
        items={element?.sizes}
        bind_label={"label"}
        bind_value={"value"}
        value={value}></CustomSelect>
      <BlockFormButtons
        setOpen={setOpen}
        onSubmit={handleSubmit}
        isUpdate={selectedIndex || selectedIndex == 0}
      />
    </>
  );
};

export default Space;
