import React from "react";
import { useState } from "react";
import SmallRegistry from "./smallResgitry";
import { Typography, Card, Modal, Box, TextField, Button } from "@mui/material";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

import registry, { historyRegistry } from "../data";
import BigRegistry from "./bigRegistry";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function RegistryCatalog() {
  const [currentDisplayRegistry, setCurrentDisplayRegistry] = useState(-1);
  const [currentMonthInput, setCurrentMonthInput] = useState(0);
  const [moneyAvreage, setMoneyAvreage] = useState(300);
  const [history, setHistroy] = useState(historyRegistry)
  const handleMouseOver = () => {
    console.log("hlellop");
  };
  const handleClick = (id) => {
    console.log("id", id);
    setCurrentDisplayRegistry(id);
    console.log("currentDisplayRegistry", currentDisplayRegistry);

  };
  const handleInputBtn = () => {
      setHistroy([...history, {
          "חודש": 'פבר',
          "סכום": currentMonthInput
      }]);
      setCurrentMonthInput(0);
      setMoneyAvreage(375);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "85%",
          justifyContent: "center",
        }}
      >
        {registry.map((currRegistry, index) => {
          return (
            <>
              <div
                onClick={() => {
                  handleClick(currRegistry.Id);
                }}
              >
                <SmallRegistry props={currRegistry} key={index} />
              </div>
              {/* /> */}
            </>
          );
        })}
        <Modal
          open={currentDisplayRegistry !== -1}
          onClose={() => {
            setCurrentDisplayRegistry(-1);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
              קופה מספר 2
            </Typography>
            <Typography id="modal-modal-description"  wisx={{ mt: 2 }}>
              <Chart data={history} height={300} color={"#7131A1"}>
                <ArgumentAxis />
                <ValueAxis />

                <LineSeries valueField="סכום" argumentField="חודש" />
              </Chart>
            </Typography>
            <br />
            <Typography id="modal-modal-description" style={{direction:"rtl"}}  wisx={{ mt: 2 }}>
                ממוצע הסכום שנאסף: {moneyAvreage} &#x20aa;
            </Typography>
            <br />
            <Typography id="modal-modal-description" style={{direction:"rtl"}}  wisx={{ mt: 2 }}>
                עדכן חודש נוכחי:
                <TextField id="filled-basic" value={currentMonthInput} variant="standard" onChange={evt => setCurrentMonthInput(evt.target.value)} type={"number"} style={{maxHeight: '10px', fontSize: '10px'}}/> 
                
                <Button variant="filled" onClick={handleInputBtn} style={{background:"#7131A1", color: 'white', marginRight: '5px'}}>
                    עדכן
                </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default RegistryCatalog;
