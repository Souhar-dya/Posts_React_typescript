import React, { useState } from 'react';

const DepertmentForm = () => {

    const [deptName, setDeptName] = useState("");
    const [deptCode, setDeptCode] = useState("");
    const [deptManager, setDeptManager] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const deptName = e.target.deptName.value;
        const deptCode = e.target.deptCode.value;
        const deptManager = e.target.deptManager.value;
        if(!deptName || !deptCode || !deptManager){
            alert("Please fill all the fields");
            return;
        }
        console.log(deptName, deptCode, deptManager);
        e.target.deptName.value = "";
        e.target.deptCode.value = "";
        e.target.deptManager.value = "";
    }
    return (
        <div >
            <h1>Department Form</h1>
            <br /><br /><br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="deptName">Department Name:</label>
                <input type="text" id="deptName" placeholder="Department Name" />
                <br />
                <br />
                <label htmlFor="deptCode">Department Code:</label>
                <input type="text" id="deptCode" placeholder="Department Code" />
                <br />
                <select name="deptManager" id="deptManager">
                    <option value="">Select Manager</option>
                    <option value="manager1">Manager 1</option>
                    <option value="manager2">Manager 2</option>
                </select>
                <br />
                <button type="submit" className="bg-red-900 rounded text-white py-2 px-4 ">Submit</button>
            </form>
        </div>
    )
}

export default DepertmentForm;