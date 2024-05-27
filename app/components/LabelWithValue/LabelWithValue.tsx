const LabelWithValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col">
      <label className="text-grey text-sm opacity-80">{label}</label>
      <p className="text-grey text-base">{value}</p>
    </div>
  );
};

export default LabelWithValue;
