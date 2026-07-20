export default function TechTag({ label }: { label: string }) {
  return (
    <span className="font-mono text-[0.7rem] text-[#b3b3b3] bg-[#ffffff]/[0.04] border border-[#ffffff]/15 px-3 py-1 rounded-sm transition-colors duration-300 hover:text-[#ffffff] hover:border-[#ffffff]/40 hover:bg-[#ffffff]/[0.08]">
      {label}
    </span>
  );
}
