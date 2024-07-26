import { useState, useEffect, useRef } from "react";
import userApi from "../../api/userApi";
import { getActive } from "../../helpers";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const customerRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await userApi.getAllUsers();
      setCustomers(response);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await userApi.deleteUser(id);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleActiveCustomer = async (id) => {
    try {
      await userApi.activeUser(id);
      fetchCustomers();
    } catch (error) {
      console.error("Error active customer:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <strong className="text-gray-700 font-medium">Customers</strong>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
        />
      </div>

      <table className="w-full text-gray-700 border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 border-b border-gray-300">ID</th>
            <th className="px-4 py-2 border-b border-gray-300">Email</th>
            <th className="px-4 py-2 border-b border-gray-300">Full Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Phone</th>
            <th className="px-4 py-2 border-b border-gray-300">Address</th>
            <th className="px-4 py-2 border-b border-gray-300">
              Date of Birth
            </th>
            <th className="px-4 py-2 border-b border-gray-300">Role</th>
            <th className="px-4 py-2 border-b border-gray-300">Active</th>
            <th className="px-4 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((customer) =>
              customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-100 text-sm"
                ref={(el) => (customerRefs.current[customer.id] = el)}
              >
                <td className="px-4 py-3 border-b border-gray-300">
                  {customer.id}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {customer.email}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {customer.fullName}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {customer.phone}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {customer.address}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {new Date(customer.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {customer.role}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {getActive(customer.status)}
                </td>
                <td className="flex px-4 py-3 border-b border-gray-300 gap-4 ">
                  <button
                    onClick={() => handleActiveCustomer(customer.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-normal py-2 px-4 rounded"
                  >
                    UnActive
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
