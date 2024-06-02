import { Link } from "@remix-run/react";
import LabelWithValue from "~/components/LabelWithValue";

const RiderCard = ({
  name,
  phone,
  boardingAt,
  droppingAt,
  seats
}: {
  name: string;
  phone: string;
  boardingAt: string;
  droppingAt: string;
  seats: string;
}) => {
  return (
    <article className="flex flex-col gap-2 bg-white p-4 rounded flex-grow basis-full shrink-0 snap-center">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg text-grey">{name}</h3>
        <Link to={`tel:${phone}`}>
          <img className="p-1" src="/phone-solid.svg" alt="phone" />
        </Link>
      </div>
      <LabelWithValue label="Boarding at" value={boardingAt} />
      <LabelWithValue label="Dropping at" value={droppingAt} />
      <LabelWithValue label="Seats" value={seats} />
    </article>
  );
};

export default RiderCard;
