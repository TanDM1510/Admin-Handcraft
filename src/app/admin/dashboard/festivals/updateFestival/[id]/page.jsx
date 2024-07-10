import UpdateFestivalView from "@/sections/festival/update-festival/UpdateFestivalView";
export const metadata = {
  title: "Lễ hội",
};
export default function Page({ params }) {
  return (
    <div>
      <UpdateFestivalView id={params} />
    </div>
  );
}
