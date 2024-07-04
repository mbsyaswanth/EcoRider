import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Input from "~/components/Input";
import { commitSession, getSession } from "~/sessions";
import { createSupabaseServerClient } from "~/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();

  const {
    error,
    data: { user }
  } = await supabaseClient.auth.verifyOtp({
    email: session.get("email") as string,
    token: formData.get("verification_code") as string,
    type: "email"
  });

  headers.append("Set-Cookie", await commitSession(session));

  if (error) {
    return json({ success: false, error }, { headers, status: 500 });
  }

  const { data } = await supabaseClient
    .from("user_info")
    .select()
    .eq("user_id", user?.id || "");

  const hasRegistered = !!data?.length;
  if (hasRegistered) {
    const isVerified = data[0].is_approved;

    if (isVerified) {
      return redirect("/", {
        headers
      });
    }

    return redirect("/verifying-account", {
      headers
    });
  }

  return redirect("/register", {
    headers
  });
}

export default function Verify() {
  return (
    <div className="flex flex-col bg-white items-center pt-20 h-screen">
      <div className="py-8 flex flex-col gap-2">
        <img src="/favicon.svg" alt="logo" className="h-[45px]" />
        <div className="text-xl font-medium text-grey">Find your commute</div>
      </div>
      <div className="flex flex-col bg-almostWhite gap-7 flex-1 h-full w-full rounded-t-[50px] shadow-lighttop px-7 py-12 mt-4">
        <div>
          <h2 className="text-grey font-medium text-lg">Verify your email</h2>
          <h4 className="text-grey text-sm">
            Please enter the code sent to your email
          </h4>
        </div>
        <Form method="post" className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <Input
              id="verify-code"
              name="verification_code"
              type="number"
              label="Verification Code"
            />
            <div className="flex justify-center gap-2 text-grey">
              <span>Didn&apos;t receive otp?</span>{" "}
              <button className="text-blue">Resend(60)</button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-white text-base font-medium rounded w-full p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Verify
          </button>
        </Form>
      </div>
    </div>
  );
}
