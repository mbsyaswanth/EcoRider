import { Link } from "@remix-run/react";
import LabelWithValue from "~/components/LabelWithValue";
import NavHeader from "~/components/NavHeader";

export default function MyRide() {
  return (
    <div>
      <NavHeader title="Your ride at 8am" />

      <div className="p-4 pt-0">
        <div className="flex flex-col gap-4 bg-white py-4 rounded-lg mb-24">
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
            <LabelWithValue label="Ride offered by" value="Kiran Kumar P" />
            <div className="flex flex-col gap-1 bg-almostWhite text-grey p-2 rounded-md">
              <p className="text-base">
                Please select your boarding points and be on time. Lets make it
                win-win for everyone. Thanks.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="bg-almostWhite px-2 py-4 rounded-r-full ml-[-6px]"></div>
            <div className=" flex w-full border-t border-dashed border-grey"></div>
            <div className="bg-almostWhite px-2 py-4 rounded-l-full mr-[-6px]"></div>
          </div>

          <div className="flex flex-col px-4 gap-3">
            <LabelWithValue
              label="Boarding at"
              value="Bus Stand, Mahabubnagar"
            />
            <LabelWithValue
              label="Dropping at"
              value="Gachibowli Circle, Hyderabad"
            />
            <div className="flex justify-between">
              <LabelWithValue label="Seats" value="1" />
              <LabelWithValue label="Fare" value="200" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full flex justify-between items-center px-4 py-3 shadow-[0_2px_8px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]">
        <Link to="tel:9465678790" className="p-1">
          <img src="/phone.svg" alt="phone icon" />
        </Link>
        <span className="bg-vlgrey rounded-sm py-1 w-[2px] h-8" />
        <button className="p-1">
          <img src="/route.svg" alt="boarding/dropping point icon" />
        </button>
        <span className="bg-vlgrey rounded-sm py-1 w-[2px] h-8" />
        <button className="p-1">
          <img src="/people-group.svg" alt="co-passengers icon" />
        </button>
        <span className="bg-vlgrey rounded-sm py-1 w-[2px] h-8" />
        <Link
          to="upi://pay?pa=upiaddress@okhdfcbank&pn=John&cu=INR"
          className="p-1"
        >
          <img src="/indian-rupee-sign.svg" alt="pay icon" />
        </Link>
        <span className="bg-vlgrey rounded-sm py-1 w-[2px] h-8" />
        <button className="p-1">
          <img src="/rectangle-xmark.svg" alt="cancel booking icon" />
        </button>
      </div>
    </div>
  );
}
