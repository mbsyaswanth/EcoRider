import { Link } from "@remix-run/react";
import LabelWithValue from "~/components/LabelWithValue";
import NavHeader from "~/components/NavHeader";
import RiderCard from "../RiderCard";

const OwnerView = () => {
  return (
    <div>
      <NavHeader title="Yay! Your ride is live" />

      <div className="p-4 pt-0 pb-8">
        <div className="flex flex-col gap-4 bg-white py-4 rounded-lg mb-7">
          <div className="flex flex-col px-4 gap-3">
            <div className="flex gap-3">
              <img src="/clock.svg" alt="clock" />
              <p className="text-base text-grey">
                Thursday, 21st Jan at 8:00am
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <img src="/location-dot.svg" alt="from location dot" />
                <span className="text-base text-grey ml-1">
                  New Town, Mahabubnagar
                </span>
              </div>
              <img src="/ellipsis-vertical.svg" alt="to location dot" />
              <div className="flex items-center gap-3">
                <img src="/location-dot.svg" alt="to location dot" />
                <span className="text-base text-grey ml-1">
                  Gachibowli Circle, Hyderabad
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <img src="/arrow-trend-up.svg" alt="car side" />
                <p className="text-base text-grey">via Ikea Circle, Midspace</p>
              </div>
            </div>

            <div className="flex gap-3">
              <img src="/car-side.svg" alt="car side" />
              <p className="text-base text-grey">White Altroz 3456</p>
            </div>

            <div className="flex justify-between">
              <LabelWithValue label="UPI ID" value="kiran.kumar@okaxis" />
              <LabelWithValue label="Fare" value="200" />
              <LabelWithValue label="Seats" value="4" />
            </div>

            <div className="flex flex-col gap-1 bg-almostWhite text-grey p-2 rounded-md">
              <p className="text-base">
                Please select your boarding points and be on time. Lets make it
                win-win for everyone. Thanks.
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-primary text-white text-sm font-medium rounded w-64 p-1"
              >
                Edit
              </button>
              <button
                type="submit"
                className="bg-white text-primary text-sm font-medium rounded w-64 p-1 border"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <section>
          <h2 className="font-bold text-lg text-grey mb-3">Booked by</h2>

          <div className="flex gap-4 snap-x snap-mandatory overflow-x-auto">
            <RiderCard
              name="Shiva Kasi"
              phone="9467235689"
              boardingAt="Bus Stand, Mahabubnagar"
              droppingAt="Gachibowli Circle, Hyderabad"
              seats="1"
            />
            <RiderCard
              name="Shiva Kasi"
              phone="9467235689"
              boardingAt="Bus Stand, Mahabubnagar"
              droppingAt="Gachibowli Circle, Hyderabad"
              seats="1"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default OwnerView;
