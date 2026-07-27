const CustomTable = ({ data }: any) => {
  return (
    <>
      {data && (
        <div className="m-5 border border-dark-4 rounded-md overflow-hidden">
          <div className="flex items-center justify-around gap-5 bg-dark-4 p-2 px-4">
            {data?.header.map((heading: any) => <div>{heading}</div>)}
          </div>
          {data?.rows.map((row: any) => (
            <div className="flex items-center justify-around gap-5 p-2 px-4 border-b border-b-dark-4">
              {row.map((ele: any) => (
                <div>{ele}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CustomTable;
