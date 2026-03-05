import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PDFgenerator from "./PDFgenerator.jsx";
import { TabUnselected } from "@mui/icons-material";
// import { isCompositeComponent } from "react-dom/test-utils";

function Shuffle({ students, tables, setTables }) {
	const Supervisors = students.filter(
		(student) => student.role == "supervisor",
	);
	const Students = students.filter((student) => student.role == "student");
	const MaleStudents = Students.filter((student) => student.gender == "M");
	const FemaleStudents = Students.filter((student) => student.gender == "F");

	const [ammountOfTables, setAmmountOfTabls] = useState();

	// NEW STATE: Holds the data for our visual test report modal
	const [testResults, setTestResults] = useState(null);

	const handleChange = (e) => {
		setAmmountOfTabls(e.target.value);
	};

	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const arrayBuffer = new Uint32Array(1);
			window.crypto.getRandomValues(arrayBuffer);
			const j = arrayBuffer[0] % (i + 1);
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const sortTablesByGender = (tables) => {
		tables.forEach((table) => {
			table.sort(function (a, b) {
				if (a.name < b.name) {
					return -1;
				}
				if (b.name > a.name) {
					return 1;
				}
				return 0;
			});

			table.sort(function (a, b) {
				if (a.gender > b.gender) {
					return -1;
				}
				if (b.gender < a.gender) {
					return 0;
				}
				return 0;
			});
		});
	};

	const shuffleStudents = () => {
		const numTables = parseInt(ammountOfTables, 10);
		if (!numTables || numTables <= 0) {
			alert("Please enter a valid amount of tables.");
			return;
		}

		let malesCopy = [...MaleStudents];
		let femalesCopy = [...FemaleStudents];
		let supervisorsCopy = [...Supervisors];

		shuffle(malesCopy);
		shuffle(femalesCopy);
		shuffle(supervisorsCopy);

		let newTables = [];
		for (let i = 0; i < numTables; i++) {
			newTables.push([]);
		}

		const baseTableIndices = Array.from({ length: numTables }, (_, i) => i);
		let indexPool = [...baseTableIndices];
		shuffle(indexPool);

		const getNextRandomTableIndex = () => {
			if (indexPool.length === 0) {
				indexPool = [...baseTableIndices];
				shuffle(indexPool);
			}
			return indexPool.shift();
		};

		while (malesCopy.length > 0) {
			newTables[getNextRandomTableIndex()].push(malesCopy.shift());
		}
		while (femalesCopy.length > 0) {
			newTables[getNextRandomTableIndex()].push(femalesCopy.shift());
		}
		while (supervisorsCopy.length > 0) {
			newTables[getNextRandomTableIndex()].push(supervisorsCopy.shift());
		}

		sortTablesByGender(newTables);
		setTables(newTables);
	};

	const moveStudent = (e, studentTable, studentIndex) => {
		let newTables = [...tables];
		let tableToMove = e.target.value;
		let newStudent = newTables[studentTable].splice(studentIndex, 1);
		if (newStudent[0].role == "supervisor") {
			let newSupervisor;
			newTables[tableToMove - 1].forEach((student, i) => {
				if (student.role == "supervisor") {
					newSupervisor = newTables[tableToMove - 1].splice(i, 1);
					newTables[studentTable].unshift(...newSupervisor);
				}
			});
		}
		newTables[tableToMove - 1].unshift(...newStudent);
		e.target.value = studentTable + 1;
		sortTablesByGender(newTables);
		setTables(newTables);
	};

	// --- ALGORITHM TO TEST RANDOMNESS LIKENESS ---
	const testShuffle = () => {
		const numTables = parseInt(ammountOfTables, 10);
		if (!numTables || numTables <= 0) {
			alert("Please enter a valid amount of tables before testing.");
			return;
		}

		const iterations = 100;
		const pairFrequency = {};

		for (let run = 0; run < iterations; run++) {
			let testMales = [...MaleStudents];
			let testFemales = [...FemaleStudents];
			let testSupervisors = [...Supervisors];

			shuffle(testMales);
			shuffle(testFemales);
			shuffle(testSupervisors);

			let testTables = [];
			for (let i = 0; i < numTables; i++) {
				testTables.push([]);
			}

			const baseTableIndices = Array.from(
				{ length: numTables },
				(_, i) => i,
			);
			let indexPool = [...baseTableIndices];
			shuffle(indexPool);

			const getNextRandomTableIndex = () => {
				if (indexPool.length === 0) {
					indexPool = [...baseTableIndices];
					shuffle(indexPool);
				}
				return indexPool.shift();
			};

			while (testMales.length > 0)
				testTables[getNextRandomTableIndex()].push(testMales.shift());
			while (testFemales.length > 0)
				testTables[getNextRandomTableIndex()].push(testFemales.shift());
			while (testSupervisors.length > 0)
				testTables[getNextRandomTableIndex()].push(
					testSupervisors.shift(),
				);

			// No need to sort visually for the backend test

			// Analyze the tables for this run
			testTables.forEach((table) => {
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

		// Calculate likeness statistics
		const allCounts = Object.values(pairFrequency);
		const maxTogether = Math.max(...allCounts);
		const sortedPairs = Object.entries(pairFrequency).sort(
			(a, b) => b[1] - a[1],
		);
		const top10 = sortedPairs.slice(0, 10);
		const expectedAverage = iterations / numTables;

		// Set the results to our state so the modal can render them
		setTestResults({
			iterations,
			numTables,
			expectedAverage: expectedAverage.toFixed(1),
			maxTogether,
			top10,
		});
	};

	return (
		<>
			<PDFViewer>
				<PDFgenerator tables={tables} />
			</PDFViewer>
			<h1>There are {Supervisors.length} supervisors</h1>
			<div className="input-tables-section">
				<label htmlFor="">Ammount of tables</label>
				<input
					type="number"
					onChange={handleChange}
					value={ammountOfTables}
				/>
				<button onClick={shuffleStudents}>Shuffle</button>
			</div>

			<div className="tables-section">
				{tables.map((table, i) => (
					<div key={i}>
						<h1>table {i + 1}</h1>
						<ol className="table">
							{table.map((student, studentIndex) => (
								<div key={studentIndex}>
									{student.role == "supervisor" ? (
										<li className="tableData">
											<b>
												{studentIndex +
													1 +
													". " +
													student.name}{" "}
											</b>
											<div>
												<select
													name="table"
													id="table"
													onChange={(e) => {
														moveStudent(
															e,
															i,
															studentIndex,
														);
													}}
													value={i + 1}
												>
													{tables.map(
														(value, index) => (
															<option
																key={index}
																value={
																	index + 1
																}
															>
																{index + 1}
															</option>
														),
													)}
												</select>
												<span
													className={
														student.gender == "M"
															? "boy"
															: "girl"
													}
												>
													{" O"}
												</span>
											</div>
										</li>
									) : (
										<li className="tableData">
											<p>
												{studentIndex +
													1 +
													". " +
													student.name}
											</p>
											<div>
												<select
													name="table"
													id="table"
													onChange={(e) => {
														moveStudent(
															e,
															i,
															studentIndex,
														);
													}}
													value={i + 1}
												>
													{tables.map(
														(value, index) => (
															<option
																key={index}
																value={
																	index + 1
																}
															>
																{index + 1}
															</option>
														),
													)}
												</select>
												<span
													className={
														student.gender == "M"
															? "boy"
															: "girl"
													}
												>
													{" O"}
												</span>
											</div>
										</li>
									)}
								</div>
							))}
						</ol>
					</div>
				))}
			</div>

			{/* DEVELOPER TOOLS BUTTON */}
			<div
				style={{
					marginTop: "50px",
					padding: "20px",
					borderTop: "2px solid #ccc",
					textAlign: "center",
				}}
			>
				<h3>Developer Tools</h3>
				<button
					onClick={testShuffle}
					style={{
						backgroundColor: "black",
						color: "white",
						padding: "10px 20px",
						cursor: "pointer",
						borderRadius: "5px",
					}}
				>
					Run 100x Randomness Test
				</button>
				<p
					style={{
						fontSize: "12px",
						color: "gray",
						marginTop: "10px",
					}}
				>
					This simulates 100 weeks of dining and generates a
					statistical report.
				</p>
			</div>

			{/* TEST RESULTS MODAL */}
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
							width: "90%",
							maxHeight: "85vh",
							overflowY: "auto",
							boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
						}}
					>
						<h2
							style={{
								marginTop: 0,
								color: "#333",
								borderBottom: "2px solid #eee",
								paddingBottom: "10px",
							}}
						>
							📊 Randomness Test Results
						</h2>
						<p>
							<strong>Iterations Run:</strong>{" "}
							{testResults.iterations}
						</p>
						<p>
							<strong>Tables:</strong> {testResults.numTables}
						</p>

						<div
							style={{
								backgroundColor: "#e8f4fd",
								padding: "15px",
								borderRadius: "8px",
								margin: "15px 0",
							}}
						>
							<p
								style={{
									margin: "0 0 10px 0",
									color: "#0056b3",
								}}
							>
								<strong>Statistical Expectation:</strong>
							</p>
							<p style={{ margin: 0, fontSize: "14px" }}>
								By pure mathematical chance, any two specific
								students should sit at the same table
								approximately{" "}
								<b>{testResults.expectedAverage}</b> times out
								of {testResults.iterations}.
							</p>
						</div>

						<p>
							<strong>
								Highest times any pair actually sat together:
							</strong>{" "}
							{testResults.maxTogether}
						</p>
						<p style={{ fontSize: "12px", color: "gray" }}>
							<em>
								(If this number is close to the expectation,
								your shuffle is mathematically perfect!)
							</em>
						</p>

						<h3
							style={{
								borderBottom: "1px solid #ccc",
								paddingBottom: "5px",
								marginTop: "25px",
							}}
						>
							Top 10 Most Frequent Pairs
						</h3>
						<ul style={{ paddingLeft: "20px" }}>
							{testResults.top10.map(([pair, count], index) => (
								<li key={index} style={{ marginBottom: "8px" }}>
									{pair}: <strong>{count}</strong> times
								</li>
							))}
						</ul>

						<button
							onClick={() => setTestResults(null)}
							style={{
								width: "100%",
								padding: "12px",
								marginTop: "20px",
								backgroundColor: "#dc3545",
								color: "white",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
								fontSize: "16px",
								fontWeight: "bold",
							}}
						>
							Close Report
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default Shuffle;
