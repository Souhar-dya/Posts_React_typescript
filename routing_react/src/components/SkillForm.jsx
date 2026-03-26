import React from "react";



const SkillForm = () => {

    const [skillName, setSkillName] = React.useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        console.log(skillName);
        if (skillName.includes(value)) {
            setSkillName(skillName.filter((item) => item !== value));
        } else {
            setSkillName([...skillName, value]);
            //The three dots are used to spread the existing skillName array and add the new value to it, creating a new array with all the selected skills.
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(skillName);
        setSkillName([]);
        e.target.skillName.value = "";
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1>Skill Form</h1>
            <label htmlFor="skillName">Select one language you know:</label>
            <input type="checkbox" id="skillName" name="skillName" value="JavaScript" onChange={handleChange} /> Javascript
            <input type="checkbox" id="skillName" name="skillName" value="Python" onChange={handleChange} /> Python
            <input type="checkbox" id="skillName" name="skillName" value="Java" onChange={handleChange} /> Java
            <input type="checkbox" id="skillName" name="skillName" value="C++" onChange={handleChange} /> C++
            <br />
            <p>Selected Skills: {skillName.join(", ")}</p>
            <button type="submit" className="bg-red-900 rounded text-white py-2 px-4 ">Submit</button>
        </form>
        </>
    )



}


export default SkillForm;