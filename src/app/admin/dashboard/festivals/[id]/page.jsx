import FestivalDetailView from "@/sections/festival/FestivalDetail/FestivalDetailView";

export default function Page({ params }) {
  return (
    <div>
      <FestivalDetailView id={params} />
    </div>
  );
}
