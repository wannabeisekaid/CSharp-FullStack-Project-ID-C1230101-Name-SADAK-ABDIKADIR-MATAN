import axios from "axios";

export default function AddStudentModal({ appState, setAppState }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppState(prev => ({
            ...prev,
            formData: { ...prev.formData, [name]: value }
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!appState.formData.id || !appState.formData.fullName || !appState.formData.mobile) {
            alert("Validation Error: Please fill in all fields.");
            return;
        }

        try {
            const newStudent = {
                id: parseInt(appState.formData.id) || 0,
                fullName: appState.formData.fullName,
                mobile: parseInt(appState.formData.mobile) || 0
            };

            await axios.post("https://localhost:7056/api/Insert", newStudent);
            alert("Success! Student added.");
            
            setAppState(prev => ({
                ...prev,
                page: "home",
                formData: { id: "", fullName: "", mobile: "" }
            }));
        } catch (error) {
            console.error(error);
            alert("Failed to add student.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <button 
                type="button"
                onClick={() => setAppState(prev => ({ ...prev, page: "home" }))}
                className="text-blue-600 mb-4 hover:underline">
                &larr; Back to Home
            </button>
            <h2 className="text-xl font-bold mb-4">Add Student Page</h2>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Student ID</label>
                    <input 
                        name="id" 
                        value={appState.formData.id} 
                        onChange={handleInputChange} 
                        className="border w-full p-2 rounded focus:ring focus:ring-blue-300" 
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                        name="fullName" 
                        value={appState.formData.fullName} 
                        onChange={handleInputChange} 
                        className="border w-full p-2 rounded focus:ring focus:ring-blue-300" 
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">Mobile Number</label>
                    <input 
                        name="mobile" 
                        value={appState.formData.mobile} 
                        onChange={handleInputChange} 
                        className="border w-full p-2 rounded focus:ring focus:ring-blue-300" 
                    />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
                    Save
                </button>
            </form>
        </div>
    );
}