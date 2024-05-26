function RideCard() {
  return (
    <article className="bg-white flex flex-col gap-1 px-2 py-3 rounded-lg shadow-[0_0_4px_0_rgba(0,0,0,0.25),0_0_4px_0_rgba(0,0,0,0.25)]">
      <header className="flex flex-col flex-1 gap-1">
        <p className="text-lgrey text-sm font-normal mb-2">
          Kundan is offering 4 seats
        </p>
        <div>
          <div className="flex items-center gap-2">
            <img src="/location-dot.svg" alt="from location dot" />
            <span className="text-base text-grey">New Town, Mahabubnagar</span>
          </div>
          <img src="/ellipsis-vertical.svg" alt="to location dot" />
          <div className="flex items-center gap-2">
            <img src="/location-dot.svg" alt="to location dot" />
            <span className="text-base text-grey">
              Gachibowli Circle, Hyderabad
            </span>
          </div>
        </div>
      </header>
      <footer className="flex justify-between text-lgrey text-sm mt-1">
        <p className="text-grey">via Ikea Circle, Midspace</p>
        <div className="flex gap-2">
          <img src="/clock.svg" alt="clock" />
          7:45am
        </div>
      </footer>
    </article>
  );
}

export default RideCard;
