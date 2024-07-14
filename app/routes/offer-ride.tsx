import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { TablesInsert } from "database";
import Input from "~/components/Input";
import LocationSearchInput from "~/components/LocationSearchInput";
import NavHeader from "~/components/NavHeader";
import { createSupabaseServerClient } from "~/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);

  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const formData = await request.formData();

  const rideInfo: TablesInsert<"rides"> = {
    user_id: user.id,
    source: formData.get("source") as string,
    destination: formData.get("destination") as string,
    when: formData.get("when") as string,
    vehicle_identification: formData.get("vehicle_identification") as string,
    seats: formData.get("seats") as unknown as number,
    cost: formData.get("cost") as unknown as number,
    note: formData.get("note") as string,
    upi_id: formData.get("upi_id") as string
  };

  const { error } = await supabaseClient.from("rides").insert(rideInfo);

  if (error) {
    return json({ success: false, error }, { headers, status: 500 });
  }

  return redirect("/my-rides/${ride_id}", {
    headers
  });
}

export default function OfferRide() {
  return (
    <div>
      <NavHeader title="Offer Ride" />

      <Form className="flex flex-col" method="post">
        <div className="flex flex-col px-4 *:mb-5 pb-32">
          <LocationSearchInput
            id="source"
            name="source"
            label="Starting from"
          />
          <LocationSearchInput
            id="destination"
            name="destination"
            label="Going to"
          />
          <Input
            id="when"
            name="when"
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
          <Input id="note" name="note" label="Note to riders" />
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
