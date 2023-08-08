"use client";

interface Props {
  date: Date;
  dateLocaleStringOptions: Intl.DateTimeFormatOptions;
}

export default function DateDisplay({ date, dateLocaleStringOptions }: Props) {
  const dateString = date.toLocaleString("en-US", dateLocaleStringOptions);

  return <>{dateString}</>;
}
