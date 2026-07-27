import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CustomCarousel = ({
  showPrevious,
  showNext,
  children,
  options,
  plugins,
  contentClass,
}: any) => {
  return (
    <>
      <Carousel className="w-full" opts={options} plugins={plugins}>
        <CarouselContent className={`${contentClass}`}>
          {children}
        </CarouselContent>
        {showPrevious && <CarouselPrevious />}
        {showNext && <CarouselNext />}
      </Carousel>
    </>
  );
};

export default CustomCarousel;
