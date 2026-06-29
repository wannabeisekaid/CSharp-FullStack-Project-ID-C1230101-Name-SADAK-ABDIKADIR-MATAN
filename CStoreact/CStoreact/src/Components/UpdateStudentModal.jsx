import axios from "axios";

export default function UpdateStudentModal({ appState, setAppState }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppState(prev => ({
            ...prev,
            formData: { ...prev.formData, [name]: value }
        }));
    };

    const handleRowClick = (student) => {
        setAppState(prev => ({
            ...prev,
            showUpdateForm: true,
            formData: { id: student.id, fullName: student.fullName, mobile: student.mobile }
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put("https://localhost:7056/api/Update", {
                id: parseInt(appState.formData.id),
                fullName: appState.formData.fullName,
                mobile: parseInt(appState.formData.mobile)
            });
            
            alert("Success! Student updated.");
            
            setAppState(prev => ({
                ...prev,
                showUpdateForm: false,
                students: prev.students.map(s => s.id === prev.formData.id ? prev.formData : s),
                formData: { id: "", fullName: "", mobile: "" }
            }));
        } catch (error) {
            console.error(error);
            alert("Failed to update student.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-full bg-white p-6 rounded shadow mb-6">
                <button 
                    type="button"
                    onClick={() => setAppState(prev => ({ ...prev, page: "home" }))}
                    className="text-blue-600 mb-4 hover:underline">
                    &larr; Back to Home
                </button>
                <h2 className="text-xl font-bold mb-4">Update Page - Select a Record</h2>
                <table className="w-full text-left border-collapse cursor-pointer">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">FullName</th>
                            <th className="p-3 border">Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appState.students.map(std => (
                            <tr key={std.id} onClick={() => handleRowClick(std)} className="border-t hover:bg-yellow-100 transition">
                                <td className="p-3 border">{std.id}</td>
                                <td className="p-3 border">{std.fullName}</td>
                                <td className="p-3 border">{std.mobile}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {appState.showUpdateForm && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Update Form</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label className="block text-sm font-medium mb-1">Student ID (Read Only)</label>
                                <input 
                                    name="id" 
                                    value={appState.formData.id} 
                                    readOnly
                                    className="border w-full p-2 rounded bg-gray-200 cursor-not-allowed text-gray-600" 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input 
                                    name="fullName" 
                                    value={appState.formData.fullName} 
                                    onChange={handleInputChange} 
                                    className="border w-full p-2 rounded focus:ring focus:ring-yellow-400" 
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-1">Mobile Number</label>
                                <input 
                                    name="mobile" 
                                    value={appState.formData.mobile} 
                                    onChange={handleInputChange} 
                                    className="border w-full p-2 rounded focus:ring focus:ring-yellow-400" 
                                />
                            </div>
                            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded mb-2">
                                Update Record
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setAppState(prev => ({ ...prev, showUpdateForm: false }))}
                                className="w-full text-center text-gray-500 hover:underline py-2">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}