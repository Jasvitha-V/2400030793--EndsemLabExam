import { useState } from "react";
import "./App.css";

function App() {
  const initialData = [
    { student: "Alice", subject: "Math", marks: 85 },
    { student: "Bob", subject: "Science", marks: 78 },
    { student: "Charlie", subject: "English", marks: 92 },
    { student: "David", subject: "Math", marks: 64 },
    { student: "Eva", subject: "Science", marks: 90 },
  ];

  const [data, setData] = useState(initialData);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({
    subject: "",
    min: "",
    max: "",
  });

  // Sort function
  const sortBy = (key) => {
    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return sortAsc ? -1 : 1;
      if (a[key] > b[key]) return sortAsc ? 1 : -1;
      return 0;
    });

    setSortAsc(!sortAsc);
    setData(sorted);
  };

  // Apply filters
  const applyFilters = () => {
    const { subject, min, max } = filters;

    const filtered = initialData.filter((item) => {
      return (
        (subject === "" || item.subject === subject) &&
        (min === "" || item.marks >= Number(min)) &&
        (max === "" || item.marks <= Number(max))
      );
    });

    setData(filtered);
  };

  return (
    <div className="container">
      <h2>Student Marks Table</h2>

      {/* Filters */}
      <div className="filters">
        <label>
          Subject:
          <select
            value={filters.subject}
            onChange={(e) =>
              setFilters({ ...filters, subject: e.target.value })
            }
          >
            <option value="">All</option>
            <option>Math</option>
            <option>Science</option>
            <option>English</option>
          </select>
        </label>

        <label>
          Score Range:
          <input
            type="number"
            placeholder="Min"
            value={filters.min}
            onChange={(e) => setFilters({ ...filters, min: e.target.value })}
          />
          <span> - </span>
          <input
            type="number"
            placeholder="Max"
            value={filters.max}
            onChange={(e) => setFilters({ ...filters, max: e.target.value })}
          />
        </label>

        <button onClick={applyFilters}>Apply</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("student")}>Student</th>
            <th onClick={() => sortBy("subject")}>Subject</th>
            <th onClick={() => sortBy("marks")}>Marks</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.student}</td>
              <td>{row.subject}</td>
              <td>{row.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
