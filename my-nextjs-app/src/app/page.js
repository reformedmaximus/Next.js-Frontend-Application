import Image from "next/image";
import DataTable from "../components/DataTable";

export default function Home() {
  return (
    <div className="container mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4">Welcome to this amazing Next.js App </h1>
      <DataTable></DataTable>
    </div>
  );
}
