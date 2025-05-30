"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SellerOverview from "@/components/Sellers/SellerOverview";
import TableSearch from "@/components/ui/TableSearch";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { allShopData } from "@/lib/data";

type AllShops = {
  id: number;
  shopId: string;
  name: string;
  category: string;
  address: string;
  district: string;
  area: string;
  photo: string;
  verified: boolean;
  type: string;
};

type Column = {
  header: string;
  accessor: string;
  className?: string;
};

const columns: Column[] = [
  { header: "Info", accessor: "info" },
  { header: "Category", accessor: "category", className: "hidden md:table-cell" },
  { header: "Address", accessor: "address", className: "hidden md:table-cell" },
  { header: "District", accessor: "district", className: "hidden md:table-cell" }, // ✅ typo fixed
  { header: "Area", accessor: "area", className: "hidden md:table-cell" },
  { header: "Type", accessor: "type", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions" },
];

export default function Seller() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "all-sellers", label: "All Shops" },
    { id: "pending-approvals", label: "Pending Approvals" },
  ];

  const renderRow = (item: AllShops) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF]">
      <td className="flex items-center gap-4 p-4 ">
        <div className="flex gap-2 items-center">
        <Image
          src={item.photo}
          alt={item.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">{item.name}</h3>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm ">{item.category}</td>
      <td className="hidden md:table-cell text-sm ">{item.address}</td>
      <td className="hidden md:table-cell text-sm">{item.district}</td>
      <td className="hidden md:table-cell text-sm">{item.area}</td>
      {/*<td className="hidden md:table-cell text-sm">{item.verified ? "Yes" : "No"}</td> */} {/* verified */}
      <td className="hidden md:table-cell text-sm">{item.type}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]">
              <Image src="/view.png" alt="view" width={16} height={16} />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );


  const renderRow2 = (item: AllShops) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF]">
      <td className="flex items-center gap-4 p-4 ">
        <div className="flex gap-2 items-center">
        <Image
          src={item.photo}
          alt={item.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">{item.name}</h3>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm ">{item.category}</td>
      <td className="hidden md:table-cell text-sm ">{item.address}</td>
      <td className="hidden md:table-cell text-sm">{item.district}</td>
      <td className="hidden md:table-cell text-sm">{item.area}</td>
      {/*<td className="hidden md:table-cell text-sm">{item.verified ? "Yes" : "No"}</td> */} {/* verified */}
      <td className="hidden md:table-cell text-sm">{item.type}</td>
      <td>
        <div className="flex items-center gap-2 flex-row">
          <Link href={`/list/teachers/${item.id}`}>
            <div className="flex items-center gap-2">
                    {/* Accept Button */}
                    <button className="focus:outline-none cursor-pointer">
                      <Image
                        src="/accept-icon-image.png" // ✅ Replace with actual PNG file
                        alt="Accept"
                        width={20}
                        height={20}
                      />
                    </button>
            
                    {/* Reject Button */}
                    <button className="focus:outline-none cursor-pointer">
                      <Image
                        src="/reject-icon-image.png" // ✅ Replace with actual PNG file
                        alt="Reject"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
          </Link>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <span className="text-2xl font-bold m-5">Seller Management</span>
      <div className="w-full flex flex-col items-center">
        {/* Tabs */}
        <div className="relative w-fit border-b border-gray-200">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-base transition-all ${
                  activeTab === tab.id ? "text-[#5A31F5]" : "text-gray-500"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#5A31F5]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 w-full">
          {activeTab === "overview" && <Overview />}
          {activeTab === "all-sellers" && (
            <AllSellers columns={columns} renderRow={renderRow} />
          )}
          {activeTab === "pending-approvals" && <PendingApprovals columns={columns} renderRow2={renderRow2} />}
        </div>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="text-lg font-semibold">
      <SellerOverview />
    </div>
  );
}

function AllSellers({
  columns,
  renderRow,
}: {
  columns: Column[];
  renderRow: (item: AllShops) => React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 flex-1 m-2  mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg ">
      {/* TOP */}
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">All shops</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
              <Image src="/sort.png" alt="sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* TABLE LIST */}
      <Table<AllShops>
        columns={columns}
        data={allShopData}
        renderRow={renderRow}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
}














{/*in this code after this line i want to use the renderRow2 because i want to render another row , fix the error  */}

function PendingApprovals({
  columns,
  renderRow2,
}: {
  columns: Column[];
  renderRow2: (item: AllShops) => React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 flex-1 m-2  mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg ">
      {/* TOP */}
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">Pending Approvals</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
              <Image src="/sort.png" alt="sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* TABLE LIST */}
      <Table<AllShops>
        columns={columns}
        data={allShopData}
        renderRow={renderRow2}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
}

