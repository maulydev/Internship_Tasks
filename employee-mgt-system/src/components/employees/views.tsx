"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EmployeeTable from "./employee-table";
import DepartmentTable from "../department/department-table";
import TrashTable from "../trash/trash-table";
import PositionTable from "../position/position-table";

type View = "emp" | "dep" | "pos" | "tra";

const viewOptions: { label: string; viewType: View }[] = [
  { label: "Employees", viewType: "emp" },
  { label: "Department", viewType: "dep" },
  { label: "Position", viewType: "pos" },
  { label: "Trash", viewType: "tra" },
];

const Views = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultView = (searchParams.get("view") as View) || "emp";
  const [switchView, setSwitchView] = useState<View>(defaultView);

  const handleSwitch = (view: View) => {
    setSwitchView(view);
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const viewParam = searchParams.get("view") as View;
    if (viewParam && viewParam !== switchView) {
      setSwitchView(viewParam);
    }
  }, [searchParams]);

  return (
    <section>
      <div className="container mx-auto flex items-center">
        {viewOptions.map(({ label, viewType }) => (
          <button
            key={viewType}
            onClick={() => handleSwitch(viewType)}
            className={`p-4 px-8 font-bold text-white cursor-pointer ${
              switchView === viewType ? "bg-blue-500" : "bg-blue-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {switchView === "emp" && <EmployeeTable />}
      {switchView === "dep" && <DepartmentTable />}
      {switchView === "pos" && <PositionTable />}
      {switchView === "tra" && <TrashTable />}
    </section>
  );
};

export default Views;
