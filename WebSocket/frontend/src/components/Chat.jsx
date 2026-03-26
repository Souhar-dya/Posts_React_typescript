
import { useState, useEffect } from "react";

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // The backend uses native WebSockets (ws) on ws://localhost:8080
        const newSocket = new WebSocket("ws://localhost:8080");

        newSocket.onopen = () => {
            console.log("Connected to server");
        };

        newSocket.onmessage = (event) => {
            if (event.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    setMessages((prevMessages) => [...prevMessages, reader.result]);
                };
                reader.readAsText(event.data);
            } else {
                setMessages((prevMessages) => [...prevMessages, event.data]);
            }
        };

        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN && input) {
            socket.send(input);
            setMessages((prevMessages) => [...prevMessages, input]); // Optimistically add our own message
            setInput("");
        }
    };

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;