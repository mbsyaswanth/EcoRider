import { Form } from "@remix-run/react";
import NavHeader from "~/components/NavHeader";
import NumberInput from "~/components/NumberInput";

export default function BookRide() {
  return (
    <div>
      <NavHeader title="Ride with Yaswanth" />

      <div className="flex flex-col mt-1">
        <div className="flex flex-col px-4 gap-4 pb-32">
          <div className="flex gap-3">
            <img src="/clock.svg" alt="clock" />
            <p className="text-base text-grey">Thursday, 21st Jan at 8:00am</p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <img src="/location-dot.svg" alt="from location dot" />
              <span className="text-base text-grey">
                New Town, Mahabubnagar
              </span>
            </div>
            <img src="/ellipsis-vertical.svg" alt="to location dot" />
            <div className="flex items-center gap-3">
              <img src="/location-dot.svg" alt="to location dot" />
              <span className="text-base text-grey">
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
          <div className="flex flex-col gap-1 bg-white text-grey p-3 rounded-md">
            <div className="text-sm font-medium">Note from Yaswanth</div>
            <p className="text-base">
              Please select your boarding points and be on time. Lets make it
              win-win for everyone. Thanks.
            </p>
          </div>
        </div>

        <Form className="fixed bg-white flex flex-col gap-5 justify-center items-center bottom-0 w-full pt-10 pb-8 rounded-t-[48px] shadow-[0_2px_8px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]">
          <NumberInput
            id="seats"
            name="seats"
            label="Seats"
            defaultValue={1}
            min={1}
            max={4}
            containerClass="w-64"
          />
          <button
            type="submit"
            className="bg-primary text-white text-lg font-medium rounded w-64 p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Confirm
          </button>
        </Form>
      </div>
    </div>
  );
}
