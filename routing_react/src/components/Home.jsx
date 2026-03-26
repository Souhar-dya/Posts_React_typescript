import {Link} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const Home = ({name}) => {
    const appContext = useContext(AppContext);

    return (
        <>
        <h1>{appContext}</h1>
      
      


        <h1>Hello {name}, thanks for visiting</h1>
        </>
    )
}

export default Home;