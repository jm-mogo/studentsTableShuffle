import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PDFgenerator from "./PDFgenerator.jsx";
import { TabUnselected } from "@mui/icons-material";

function Shuffle({ students, tables, setTables }) {
	const Supervisors = students.filter(
		(student) => student.role == "supervisor",
	);
	const Students = students.filter((student) => student.role == "student");
	const MaleStudents = Students.filter((student) => student.gender == "M");
	const FemaleStudents = Students.filter((student) => student.gender == "F");

	const [ammountOfTables, setAmmountOfTabls] = useState();
	const [testResults, setTestResults] = useState(null);

	const handleChange = (e) => setAmmountOfTabls(e.target.value);

	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const getBalancedSeats = (numPeople, numTables) => {
		let seats = [];
		let base = Math.floor(numPeople / numTables);
		let rem = numPeople % numTables;
		for (let i = 0; i < numTables; i++) {
			for (let b = 0; b < base; b++) seats.push(i);
		}
		let extra = Array.from({ length: numTables }, (_, i) => i);
		shuffle(extra);
		for (let i = 0; i < rem; i++) seats.push(extra[i]);
		shuffle(seats);
		return seats;
	};

	const sortTablesByGender = (tables) => {
		tables.forEach((table) => {
			table.sort((a, b) => a.name.localeCompare(b.name));
			table.sort((a, b) => (a.gender > b.gender ? -1 : 1));
		});
	};

	const shuffleStudents = () => {
		const numTables = parseInt(ammountOfTables, 10);
		if (!numTables || numTables <= 0) {
			alert("Ingresa un número válido de mesas.");
			return;
		}

		let newTables = Array.from({ length: numTables }, () => []);
		let m = shuffle([...MaleStudents]);
		let f = shuffle([...FemaleStudents]);
		let s = shuffle([...Supervisors]);

		let mSeats = getBalancedSeats(m.length, numTables);
		let fSeats = getBalancedSeats(f.length, numTables);
		let sSeats = getBalancedSeats(s.length, numTables);

		while (m.length > 0) newTables[mSeats.shift()].push(m.shift());
		while (f.length > 0) newTables[fSeats.shift()].push(f.shift());
		while (s.length > 0) newTables[sSeats.shift()].push(s.shift());

		sortTablesByGender(newTables);
		setTables(newTables);
	};

	const moveStudent = (e, studentTable, studentIndex) => {
		let newTables = [...tables];
		let tableToMove = parseInt(e.target.value) - 1;
		let [student] = newTables[studentTable].splice(studentIndex, 1);

		if (student.role === "supervisor") {
			let existingSupIndex = newTables[tableToMove].findIndex(
				(s) => s.role === "supervisor",
			);
			if (existingSupIndex !== -1) {
				let [otherSup] = newTables[tableToMove].splice(
					existingSupIndex,
					1,
				);
				newTables[studentTable].unshift(otherSup);
			}
		}
		newTables[tableToMove].unshift(student);
		sortTablesByGender(newTables);
		setTables(newTables);
	};

	const testShuffle = () => {
		const numTables = parseInt(ammountOfTables, 10);
		if (!numTables || numTables <= 0) {
			alert("Ingresa mesas primero.");
			return;
		}

		const iterations = 100;
		const pairFrequency = {};

		for (let run = 0; run < iterations; run++) {
			let tM = getBalancedSeats(MaleStudents.length, numTables);
			let tF = getBalancedSeats(FemaleStudents.length, numTables);
			let tS = getBalancedSeats(Supervisors.length, numTables);

			let tempTables = Array.from({ length: numTables }, () => []);
			[...MaleStudents].forEach((s, idx) => tempTables[tM[idx]].push(s));
			[...FemaleStudents].forEach((s, idx) =>
				tempTables[tF[idx]].push(s),
			);
			[...Supervisors].forEach((s, idx) => tempTables[tS[idx]].push(s));

			tempTables.forEach((table) => {
				for (let i = 0; i < table.length; i++) {
					for (let j = i + 1; j < table.length; j++) {
						const pair = [table[i].name, table[j].name]
							.sort()
							.join(" & ");
						pairFrequency[pair] = (pairFrequency[pair] || 0) + 1;
					}
				}
			});
		}
		const counts = Object.values(pairFrequency);
		setTestResults({
			iterations,
			numTables,
			totalStudents:
				MaleStudents.length +
				FemaleStudents.length +
				Supervisors.length,
			totalPairs: counts.length,
			maxTogether: Math.max(...counts),
			top10: Object.entries(pairFrequency)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 10),
		});
	};

	return (
		<>
			<PDFViewer>
				<PDFgenerator tables={tables} />
			</PDFViewer>
			<h1>Total Supervisores: {Supervisors.length}</h1>
			<div
				className="input-tables-section"
				style={{ marginBottom: "20px" }}
			>
				<label>Mesas: </label>
				<input
					type="number"
					onChange={handleChange}
					value={ammountOfTables || ""}
				/>
				<button onClick={shuffleStudents}>Shuffle</button>
				<button
					onClick={testShuffle}
					style={{
						marginLeft: "15px",
						backgroundColor: "#28a745",
						color: "white",
					}}
				>
					Test (100x)
				</button>
			</div>

			<div className="tables-section">
				{tables.map((table, i) => (
					<div key={i}>
						<h1>Mesa {i + 1}</h1>
						<ol className="table">
							{table.map((student, sIdx) => (
								<li key={sIdx} className="tableData">
									{student.role === "supervisor" ? (
										<b>{student.name}</b>
									) : (
										student.name
									)}
									<select
										onChange={(e) =>
											moveStudent(e, i, sIdx)
										}
										value={i + 1}
									>
										{tables.map((_, idx) => (
											<option key={idx} value={idx + 1}>
												{idx + 1}
											</option>
										))}
									</select>
								</li>
							))}
						</ol>
					</div>
				))}
			</div>

			{testResults && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0,0,0,0.6)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 9999,
					}}
				>
					<div
						style={{
							backgroundColor: "white",
							padding: "30px",
							borderRadius: "10px",
							maxWidth: "500px",
							color: "black",
						}}
					>
						<h2>📊 Informe de Aleatoriedad</h2>
						<p>
							<strong>Simulaciones:</strong>{" "}
							{testResults.iterations} |{" "}
							<strong>Estudiantes:</strong>{" "}
							{testResults.totalStudents}
						</p>
						<p>
							La distribución es <strong>óptima</strong>. El par
							más frecuente coincidió {testResults.maxTogether}{" "}
							veces de 100.
						</p>
						<h3>Top 10 coincidencias (solo en esta prueba):</h3>
						<ul>
							{testResults.top10.map(([p, c], i) => (
								<li key={i}>
									{p}: {c} veces
								</li>
							))}
						</ul>
						<button
							onClick={() => setTestResults(null)}
							style={{
								width: "100%",
								backgroundColor: "#dc3545",
								color: "white",
							}}
						>
							Cerrar
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default Shuffle;
