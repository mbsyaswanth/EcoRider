import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "EcoRider | Home" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};

const homeMenu = [
  {
    label: "Find Rides",
    path: "/find-rides"
  },
  {
    label: "Offer Ride",
    path: "/offer-ride"
  },
  {
    label: "Active Ride",
    path: "/active-ride"
  },
  {
    label: "Publish Requirement",
    path: "/post-requirement"
  }
];

const ActionLink = ({ label, path }: { label: string; path: string }) => {
  return (
    <Link
      to={path}
      className="flex basis-0 justify-center items-center text-lg text-center text-grey font-medium px-4 py-10 min-w-32 rounded-2xl shadow-[0_4px_48px_0_rgba(147,147,147,0.7)]"
    >
      {label}
    </Link>
  );
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen pt-4">
      <header className="flex justify-between px-4 py-2 mb-6">
        <img src="favicon.svg" alt="logo" />
        <div className="flex items-center gap-5">
          <button>
            <img src="bullhorn.svg" alt="notifications" />
          </button>
          <button>
            <img src="gear.svg" alt="notifications" />
          </button>
        </div>
      </header>

      <div className="px-4 py-2 mb-4">
        <h1 className="text-xl text-grey font-medium">Hi Yaswanth!</h1>
        <h4 className="text-base text-lgrey">
          Discover rides or start driving.
        </h4>
      </div>

      <div className="flex flex-wrap justify-between items-stretch content-start gap-9 bg-white h-full shadow-lighttop rounded-t-[50px] p-10">
        {homeMenu.map(({ label, path }) => (
          <ActionLink key={label} label={label} path={path} />
        ))}
      </div>
    </div>
  );
}
