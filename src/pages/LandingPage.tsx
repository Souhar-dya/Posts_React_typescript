import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();
  return (
    <div>
        <h1>Welcome to JSON Holder</h1>
        <p>Your one-stop solution for managing and sharing JSON data.</p>
        <button onClick={() => navigate('/login')}>Login</button>
        <br />
        <span><button onClick={() => navigate('/register')}>Register</button></span>
    </div>
  );
}




export default LandingPage;