interface CardProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Card({ onClick, children }: CardProps) {
  return <div onClick={onClick}>{children}</div>;
}
