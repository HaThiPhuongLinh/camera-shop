export function getOrderStatus(status) {
  switch (status) {
    case "SHIPPING":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-sm text-sky-600 bg-sky-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "PENDING":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-sm text-yellow-600 bg-yellow-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "DELIVERED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-sm text-green-600 bg-green-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-sm text-gray-600 bg-gray-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}

export function getActive(active) {
  switch (active) {
    case true:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-sm text-green-600 bg-green-100">
          {"Active"}
        </span>
      );
    case false:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-sm text-red-600 bg-red-100">
          {"InActive"}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-sm text-gray-600 bg-gray-500">
          {active}
        </span>
      );
  }
}
