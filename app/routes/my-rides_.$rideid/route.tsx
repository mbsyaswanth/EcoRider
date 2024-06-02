import OwnerView from "./OwnerView";
import RiderView from "./RiderView";

export default function MyRide() {
  return false ? <RiderView /> : <OwnerView />;
}
