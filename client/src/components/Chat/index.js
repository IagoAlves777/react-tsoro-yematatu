import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./styles.css";
function Chat(
  {
    messages,
    handleFormSubmit,
    color
  }
){
  const [message, updateMessage] = useState("");
  const handleInputChange = (event) => updateMessage(event.target.value);
  function handleSubmit(event){
    event.preventDefault();
    handleFormSubmit(message);
    updateMessage('');
    console.log(messages);
  }
  return (
    <div className="div_messenger">
      <main className="main_chat">
        <div className="chat_scroll">
          <ul className="list">
            {messages.map((m, index) => (
              <li
                className={`list__item list__item--${
                  m.color === color ? "mine" : "other"
                }`}
                key={index}
              >
                <span
                  className={`message message--${
                    m.color === color ? "mine" : "other"
                  }`}
                >
                  {m.message}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Type a new message here"
            onChange={handleInputChange}
            value={message}
          />
        </Form>
      </main>
    </div>
  );
};

export default Chat;
