import React from "react";
import "./style.scss";

type Props = { className?: string,title: string};

export default function Button({ className,title }: Props) {
  return <button className={className}>{title}</button>;
}
