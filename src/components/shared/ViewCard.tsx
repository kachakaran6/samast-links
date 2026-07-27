const ViewCard = ({ ele }: any) => {
  return (
    <div className="flex flex-col gap-1 bg-dark-3 border border-dark-4 hover:border-gray-800 p-3 px-5 rounded-lg">
      <div className="font-medium text-sm text-slate-500">{ele.name}</div>
      <div className="font-medium text-lg text-slate-300">
        {ele.data?.length}
      </div>
    </div>
  );
};

export default ViewCard;
