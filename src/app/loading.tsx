import Skeleton from "./components/Skeleton";

export default function loading() {
  const skeletons = [];

  for (let i = 0; i < 4; i++) {
    skeletons.push(<Skeleton key={i} isLoading />);
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {skeletons}
    </div>
  );
}
