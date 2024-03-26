import React from "react";

const PropertyTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Total Price</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.title}>
            <td>{item.title}</td>
            <td>{item.totalPrice}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
