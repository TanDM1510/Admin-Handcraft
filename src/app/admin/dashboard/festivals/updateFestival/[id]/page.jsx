import UpdateFestivalView from "@/sections/festival/update-festival/UpdateFestivalView";

export default function Page({ params }) {
  return (
    <div>
      <UpdateFestivalView id={params} />
    </div>
  );
}
