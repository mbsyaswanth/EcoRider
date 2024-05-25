import { Form } from "@remix-run/react";
import Input from "~/components/Input";
import NavHeader from "~/components/NavHeader";

export default function OfferRide() {
  return (
    <div>
      <NavHeader title="Offer Ride" />

      <Form className="flex flex-col">
        <div className="flex flex-col px-4 *:mb-5 pb-32">
          <Input
            id="starting_from"
            name="starting_from"
            label="Starting from"
          />
          <Input id="going_to" name="going_to" label="Going to" />
          <Input
            id="date_time"
            name="date_time"
            type="datetime-local"
            label="Date and Time"
          />
          <Input
            id="vehicle_identification"
            name="vehicle_identification"
            label="Vehicle Identification"
          />
          <div className="flex gap-3">
            <Input
              id="seats"
              name="seats"
              label="Seats"
              containerClass="flex-0"
            />
            <Input id="cost" name="cost" label="Cost" containerClass="flex-1" />
          </div>
          <Input id="upi_id" name="upi_id" label="UPI ID" />
        </div>

        <div className="bg-white flex justify-center fixed bottom-0 w-full pt-10 pb-8 rounded-t-[48px] shadow-[0_2px_8px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]">
          <button
            type="submit"
            className="bg-primary text-white text-lg font-medium rounded w-64 p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Publish
          </button>
        </div>
      </Form>
    </div>
  );
}
