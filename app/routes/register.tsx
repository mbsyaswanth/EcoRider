import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { TablesInsert } from "database";
import Input from "~/components/Input";
import { createSupabaseServerClient } from "~/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabaseClient } = createSupabaseServerClient(request);
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data } = await supabaseClient
    .from("user_info")
    .select()
    .eq("user_id", user?.id || "");

  const hasRegistered = !!data?.length;
  if (hasRegistered) {
    const isVerified = data[0].is_approved;

    if (isVerified) {
      return redirect("/");
    }

    return redirect("/verifying-account");
  }

  return new Response(null);
};

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);

  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const formData = await request.formData();

  const userInfo: TablesInsert<"user_info"> = {
    user_id: user.id,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as unknown as number,
    company: formData.get("company") as string,
    linkedin_url: formData.get("linkedin_url") as string,
    work_location: {
      address: formData.get("work_location") as string
    },
    residence_location: {
      address: formData.get("residence_location") as string
    }
  };

  const { error } = await supabaseClient.from("user_info").insert(userInfo);

  if (error) {
    return json({ success: false, error }, { headers, status: 500 });
  }

  return redirect("/verifying-account", {
    headers
  });
}

export default function Register() {
  return (
    <div>
      <Form method="post" className="flex flex-col px-4 pt-6 pb-32 gap-5">
        <div className="top-0 sticky py-2 backdrop-blur-md">
          <h1 className="text-grey text-xl font-bold">
            Just a few more details!
          </h1>
          <h4 className="text-base text-grey">
            Please fill the below details. Our team will review and activate
            your account.
          </h4>
        </div>

        <div className="flex flex-col gap-4">
          <Input id="name" name="name" label="Name" />
          <Input id="email" name="email" label="Email" type="email" />
          <Input id="phone" name="phone" type="number" label="Phone" />
          <Input id="company" name="company" label="Company" />
          <Input
            id="linkedin_url"
            name="linkedin_url"
            label="LinkedIn URL"
            type="url"
          />
          <Input id="work_location" name="work_location" label="Work Address" />
          <Input
            id="residence_location"
            name="residence_location"
            label="Residence Address"
          />
        </div>

        <div className="bg-white flex justify-center fixed bottom-0 left-0 w-full pt-10 pb-8 rounded-t-[48px] shadow-[0_2px_8px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]">
          <button
            type="submit"
            className="bg-primary text-white text-lg font-medium rounded w-64 p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
