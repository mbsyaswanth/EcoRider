import Header from "./Header";
import RideCard from "./RideCard";

export default function RidesList() {
  return (
    <div className="pb-4">
      <Header title="This is title" />
      <div className="flex flex-col gap-3 px-4">
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
      </div>
      <footer className="flex flex-col gap-2 items-center text-grey text-sm mt-7">
        <div>No rides found ?</div>
        <button
          type="submit"
          className="bg-primary text-white text-sm font-medium rounded p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          Post Requirement
        </button>
      </footer>
    </div>
  );
}
