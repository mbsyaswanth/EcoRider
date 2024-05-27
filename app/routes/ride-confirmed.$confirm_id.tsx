export default function RideConfirmed() {
  return (
    <div className="flex items-center bg-white h-screen px-8 py-6">
      <div className="flex flex-col items-center gap-5">
        <img
          src="/ride-confirmed-illustration.svg"
          alt="ride confirmed illustration"
        />
        <div className="flex flex-col items-center gap-2 mx-2">
          <h1 className="text-grey text-xl font-bold">
            Your ride is confirmed!
          </h1>
          <div className="text-gre text-base text-center">
            Please select your boarding and dropping points.
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex flex-col gap-3 w-full px-8 py-6">
        <button
          type="submit"
          className="bg-primary text-white text-base font-medium rounded w-full p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          Select Now
        </button>
        <button
          type="submit"
          className="text-grey text-base font-medium rounded w-full p-2"
        >
          I will do it later
        </button>
      </div>
    </div>
  );
}
