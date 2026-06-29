import axios from "axios";
import { useState, useEffect } from "react";
import AddStudentModal from "./AddStudentModal";
import UpdateStudentModal from "./UpdateStudentModal";

export default function StudentList() {
    const [appState, setAppState] = useState({
        page: "home",
        students: [],
        formData: { id: "", fullName: "", mobile: "" },
        showUpdateForm: false
    });

    useEffect(() => {
        let isMounted = true;

        if (appState.page === "home" || appState.page === "update") {
            axios.get("https://localhost:7056/api/Get")
                .then(response => {
                    if (isMounted) { 
                        const sortedData = response.data.reverse();
                        setAppState(prev => ({ ...prev, students: sortedData }));
                    }
                })
                .catch(error => console.error(error));
        }


        return () => {
            isMounted = false; 
        };
    }, [appState.page]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow mb-6 flex space-x-4">
                <button 
                    onClick={() => setAppState(prev => ({ ...prev, page: "add", formData: { id: "", fullName: "", mobile: "" } }))}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Add Navigation
                </button>
                <button 
                    onClick={() => setAppState(prev => ({ ...prev, page: "update", showUpdateForm: false }))}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
                    Update Navigation
                </button>
            </div>

            {appState.page === "home" && (
                <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
                    <h1 className="text-2xl font-bold mb-4">Home Page</h1>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 border">ID</th>
                                <th className="p-3 border">FullName</th>
                                <th className="p-3 border">Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appState.students.map(std => (
                                <tr key={std.id} className="border-t">
                                    <td className="p-3 border">{std.id}</td>
                                    <td className="p-3 border">{std.fullName}</td>
                                    <td className="p-3 border">{std.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {appState.students.length === 0 && (
                        <p className="text-center p-4 text-gray-500">No students found.</p>
                    )}
                </div>
            )}

            {appState.page === "add" && <AddStudentModal appState={appState} setAppState={setAppState} />}
            {appState.page === "update" && <UpdateStudentModal appState={appState} setAppState={setAppState} />}
        </div>
    );
}