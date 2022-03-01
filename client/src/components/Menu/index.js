import { React } from "react";
import {
  Form,
  Card,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap/";
import "./styles.css";

function Menu({
  nick,
  setNick,
  setRadioValue,
  radioValue,
  pickColor,
  setStart,
  disableRed,
  disableBlue,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    setNick(e.target.value);
  };
  const radios = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
  ];
  function next(){
    pickColor();
    setStart();
  }
  
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Tsoro Yematatu</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Nick Name"
              onChange={handleChange}
              value={nick}
            />
          </Form>
          <div className="div_colors">
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  disabled={idx%2 ? disableBlue : disableRed}
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-primary" : "outline-danger"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          <div className="button">
            <Button variant="dark" onClick={next}>
              START
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Menu;
