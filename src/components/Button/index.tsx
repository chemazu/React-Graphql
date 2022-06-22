import React from "react";
import "./style.scss";

type Props = { className?: string; title: string; onClick?: (e:any) => void };

export default function Button({ className, title, onClick }: Props) {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
}
