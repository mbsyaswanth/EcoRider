import { Player } from "@lottiefiles/react-lottie-player";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
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
  }

  return new Response(null);
};

export default function VerifyingAccount() {
  return (
    <div className="h-screen flex flex-col justify-center p-6">
      <div className="flex flex-col gap-4">
        <Player
          autoplay
          loop
          src="app\lotties\sit-back-relax-lottie.json"
          style={{ height: "300px", width: "300px" }}
        />
        <div className="text-center text-grey flex flex-col gap-2">
          <h1 className="text-center font-bold text-xl">
            You&apos;re Almost There!
          </h1>
          <div>
            Thanks for providing your details! Our team is reviewing them now.
            Your account will be activated shortly.
          </div>
        </div>
      </div>
    </div>
  );
}
