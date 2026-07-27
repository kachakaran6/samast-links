const Text = ({ text, align }: any) => {
  return <div className={`text-base font-medium text-${align}`}>{text}</div>;
};

export default Text;
