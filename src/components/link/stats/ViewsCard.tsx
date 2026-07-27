import ViewCard from "@/components/shared/ViewCard";

const ViewsCard = ({ viewsData }: any) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-5">
      {viewsData.map((ele: any) => (
        <ViewCard key={ele.key} ele={ele} />
      ))}
    </div>
  );
};

export default ViewsCard;
