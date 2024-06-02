const OrderTable = ({ title, orders, columns }) => {
  return (
    <div className="mb-4">
      <h3>{title}</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>{order[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
