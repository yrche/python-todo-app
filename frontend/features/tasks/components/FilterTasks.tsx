"use client";

import { SegmentGroup, SegmentGroupValueChangeDetails } from "@chakra-ui/react";
import { useState } from "react";
import { Filter, SortPriority, Status } from "../types";

type FilterTasksProps =
  | {
      type: typeof Filter.STATUS | "status";
      onChange: (value: Status) => void;
    }
  | {
      type: typeof Filter.SORT_PRIORITY | "sort_priority";
      onChange: (value: SortPriority) => void;
    };

export function FilterTasks(props: FilterTasksProps) {
  const { type, onChange } = props;

  if (type === Filter.STATUS) {
    return <StatusFilter onChange={onChange as (value: Status) => void} />;
  }

  if (type === Filter.SORT_PRIORITY) {
    return (
      <PriorityFilter onChange={onChange as (value: SortPriority) => void} />
    );
  }

  return null;
}

function StatusFilter({ onChange }: { onChange: (value: Status) => void }) {
  const [status, setStatus] = useState<Status>(Status.ALL);

  function handleChange(e: SegmentGroupValueChangeDetails) {
    const val = e.value as Status;
    setStatus(val);
    onChange(val);
  }

  return (
    <SegmentGroup.Root value={status} onValueChange={handleChange}>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={[Status.ALL, Status.DONE, Status.UNDONE]} />
    </SegmentGroup.Root>
  );
}

function PriorityFilter({
  onChange,
}: {
  onChange: (value: SortPriority) => void;
}) {
  const [sortPriority, setSortPriority] = useState<string | undefined>(
    undefined,
  );

  function handleChange(e: SegmentGroupValueChangeDetails) {
    const val = e.value as SortPriority;
    setSortPriority(val);
    onChange(val);
  }

  return (
    <SegmentGroup.Root value={sortPriority} onValueChange={handleChange}>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={[SortPriority.ASC, SortPriority.DESC]} />
    </SegmentGroup.Root>
  );
}
