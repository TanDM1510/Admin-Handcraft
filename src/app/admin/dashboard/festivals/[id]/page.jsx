import FestivalDetailView from "@/sections/festival/FestivalDetail/FestivalDetailView";
export const metadata = {
  title: "Lễ hội",
};
export default function Page({ params }) {
  return (
    <div>
      <FestivalDetailView id={params} />
    </div>
  );
}
