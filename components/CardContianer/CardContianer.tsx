interface CardContianer {
  children: React.ReactNode;
  autoSize?: boolean;
}

export default function CardContianer(props: CardContianer) {
  return (
    <div
      className={
        "flex-1 flex w-full items-center gap-[1rem]  [background:var(--card-color,#271A0C)] pl-3 pr-4 py-3 rounded-2xl  border-3 border-solid border-[#F7931A10] hover:border-[#F7931A] transition-all" +
        (props.autoSize ? " w-full h-full" : "")
      }
    >
      {props.children}
    </div>
  );
}
