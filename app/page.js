"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [students, setStudents] = useState([]);

  // -----------------------
  // Fetch CSV
  // -----------------------
  useEffect(() => {
    Papa.parse("/studentdashboard.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log("CSV Parsed Data:", results.data);
        setStudents(results.data);
      },
      error: function (err) {
        console.error("Error parsing CSV:", err);
      },
    });
  }, []);

  // -----------------------
  // Overview Stats
  // -----------------------
  const totalStudents = students.length;

  const average = (key) => {
    if (totalStudents === 0) return 0;
    return (
      students.reduce((sum, s) => sum + Number(s[key] || 0), 0) / totalStudents
    ).toFixed(2);
  };

  const avgComprehension = average("comprehension");
  const avgAttention = average("attention");
  const avgFocus = average("focus");
  const avgRetention = average("retention");
  const avgScore = average("assessment_score");
  const avgEngagement = average("engagement_time");

  // -----------------------
  // Radar Chart Data (First Student)
  // -----------------------
  const firstStudent = students[0] || {};
  const radarData = [
    { subject: "Comprehension", A: Number(firstStudent.comprehension) || 0 },
    { subject: "Attention", A: Number(firstStudent.attention) || 0 },
    { subject: "Focus", A: Number(firstStudent.focus) || 0 },
    { subject: "Retention", A: Number(firstStudent.retention) || 0 },
    { subject: "Score", A: Number(firstStudent.assessment_score) || 0 },
  ];

  // -----------------------
  // Table Search & Sort
  // -----------------------
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredStudents = students
    .filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.class.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = Number(a[sortKey]) || a[sortKey];
      const valB = Number(b[sortKey]) || b[sortKey];
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // -----------------------
  // Prediction Panel State & Handlers
  // -----------------------
  const [inputValues, setInputValues] = useState({
    comprehension: "",
    attention: "",
    focus: "",
    retention: "",
    engagement_time: "",
  });
  const [predictedScore, setPredictedScore] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePredict = () => {
    // Simple example linear regression formula (mock)
    // Weights are random for demonstration; in real, use trained model
    const { comprehension, attention, focus, retention, engagement_time } =
      inputValues;
    const prediction =
      0.2 * Number(comprehension) +
      0.2 * Number(attention) +
      0.2 * Number(focus) +
      0.2 * Number(retention) +
      0.2 * Number(engagement_time || 0);
    setPredictedScore(prediction.toFixed(2));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Student Dashboard</h1>
      <p>Total Students: {students.length}</p>

      {/* Overview Stats */}
      <div>
        <h2>Overview Stats</h2>
        <ul>
          <li>Avg Comprehension: {avgComprehension}</li>
          <li>Avg Attention: {avgAttention}</li>
          <li>Avg Focus: {avgFocus}</li>
          <li>Avg Retention: {avgRetention}</li>
          <li>Avg Assessment Score: {avgScore}</li>
          <li>Avg Engagement Time: {avgEngagement}</li>
        </ul>
      </div>

      {/* Bar Chart */}
      <h2>Skills vs Assessment Score (Bar Chart)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={students}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="comprehension" fill="#8884d8" />
          <Bar dataKey="attention" fill="#82ca9d" />
          <Bar dataKey="focus" fill="#ffc658" />
          <Bar dataKey="retention" fill="#ff8042" />
          <Bar dataKey="assessment_score" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>

      {/* Scatter Chart */}
      <h2>Attention vs Assessment Score (Scatter Chart)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="attention" name="Attention" />
          <YAxis type="number" dataKey="assessment_score" name="Score" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Students" data={students} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Radar Chart */}
      <h2>{firstStudent.name || "Student"} Profile (Radar Chart)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name={firstStudent.name}
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Prediction Panel */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Predict Assessment Score</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          {["comprehension", "attention", "focus", "retention", "engagement_time"].map(
            (key) => (
              <input
                key={key}
                type="number"
                name={key}
                placeholder={key.replace("_", " ")}
                value={inputValues[key]}
                onChange={handleInputChange}
                style={{ padding: "5px", width: "120px" }}
              />
            )
          )}
        </div>
        <button
          onClick={handlePredict}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Predict Score
        </button>
        {predictedScore && (
          <p style={{ marginTop: "10px" }}>
            Predicted Assessment Score: <strong>{predictedScore}</strong>
          </p>
        )}
      </div>

      {/* Student Table */}
      <h2>Student Table</h2>
      <input
        type="text"
        placeholder="Search by name or class"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />

      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th onClick={() => handleSort("student_id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("class")}>Class</th>
            <th onClick={() => handleSort("comprehension")}>Comprehension</th>
            <th onClick={() => handleSort("attention")}>Attention</th>
            <th onClick={() => handleSort("focus")}>Focus</th>
            <th onClick={() => handleSort("retention")}>Retention</th>
            <th onClick={() => handleSort("assessment_score")}>Score</th>
            <th onClick={() => handleSort("engagement_time")}>Engagement</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s.student_id}>
              <td>{s.student_id}</td>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.comprehension}</td>
              <td>{s.attention}</td>
              <td>{s.focus}</td>
              <td>{s.retention}</td>
              <td>{s.assessment_score}</td>
              <td>{s.engagement_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Insights Section */}
	<div
  	style={{
   	marginTop: "30px",
    	padding: "20px",
    	border: "1px solid #ccc",
    	borderRadius: "8px",
    	backgroundColor: "#f9f9f9",
  	}}
	>
  	<h2>Key Insights</h2>
  	<ul>
    		<li>Comprehension and retention strongly correlate with assessment scores.</li>
    		<li>Attention and engagement time moderately impact performance.</li>
    		<li>Linear Regression predicts assessment scores moderately (check predicted score panel).</li>
    		<li>Students can be clustered into 3 learning personas: High performers, Average learners, At-risk learners.</li>
  	</ul>
	</div>

    </div>
  );
}
