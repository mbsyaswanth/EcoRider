import { Form } from "@remix-run/react";
import Input from "~/components/Input";
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { createSupabaseServerClient } from "~/supabase.server";
import { commitSession, getSession } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);

  const session = await getSession(headers.get("Cookie"));

  const formData = await request.formData();

  const userEmail = formData.get("email") as string;

  const { error } = await supabaseClient.auth.signInWithOtp({
    email: userEmail
  });

  if (error) {
    return json({ success: false }, { headers });
  }

  session.flash("email", userEmail);

  headers.append("Set-Cookie", await commitSession(session));

  return redirect("/otp-verification", {
    headers
  });
}

export default function Login() {
  return (
    <div className="flex flex-col bg-white items-center pt-20 h-screen">
      <div className="py-8 flex flex-col gap-2">
        <img src="/favicon.svg" alt="logo" className="h-[45px]" />
        <div className="text-xl font-medium text-grey">Find your commute</div>
      </div>
      <div className="flex flex-col bg-almostWhite gap-7 flex-1 h-full w-full rounded-t-[50px] shadow-lighttop px-7 py-12 mt-4">
        <div>
          <h2 className="text-grey font-medium text-lg">Hello there!</h2>
          <h4 className="text-grey text-sm">Lets find your ride</h4>
        </div>
        <Form method="post" className="flex flex-col gap-7">
          <Input id="email" name="email" type="email" label="Email" />
          <button
            type="submit"
            className="bg-primary text-white text-base font-medium rounded w-full p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Continue
          </button>
        </Form>
        <div className="flex justify-center text-grey">or</div>
        <button
          type="submit"
          className="bg-white text-grey text-base font-medium rounded-2xl w-full p-2 shadow-[1px_1px_6px_0_rgba(0,0,0,0.25),1px_2px_4px_0_rgba(0,0,0,0.25),0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          Continue with google
        </button>
      </div>
    </div>
  );
}
