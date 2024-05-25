import { Form } from "@remix-run/react";
import Input from "~/components/Input";
import NavHeader from "~/components/NavHeader";

export default function OfferRide() {
  return (
    <div>
      <NavHeader title="Find Rides" />

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
            id="seats"
            name="seats"
            label="Seats"
            containerClass="flex-0"
          />
        </div>

        <div className="bg-white flex justify-center fixed bottom-0 w-full pt-10 pb-8 rounded-t-[48px] shadow-[0_2px_8px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]">
          <button
            type="submit"
            className="bg-primary text-white text-lg font-medium rounded w-64 p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Find
          </button>
        </div>
      </Form>
    </div>
  );
}
