// lib
import './App.css';
import React, {useState} from 'react';
import { FileUploader } from "react-drag-drop-files";
import Confetti from './components/Confetti';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// media files
import logo from './img/logo.png';
import receiptIcon from './img/receipt.png';
import bg1 from './img/bg-1.png';
import bg2 from './img/bg-2.jpg';

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];
const rootURL = 'http://localhost:3000';


function App() {
  const [info, setInfo] = useState();
  const [file, setFile] = useState();
  const [receiptPath, setReceiptPath] = useState();
  const [disabled, setConfettiDisabled] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const handleOnClick = () => {
    setConfettiDisabled(false);
  }
  const handleNameOnChange = (e) => {
    info["restaurant_name"] = e.target.value;
    setInfo(info);
  }
  const handleDateOnChange = (e) => {
    info["date"] = e.target.value;
    setInfo(info);
  }
  const handleAmountOnChange = (e) => {
    info["amount"] = e.target.value;
    setInfo(info);
  }
  const UploadFragment = () => {
    return (
      <React.Fragment>
          <h2>Upload your receipt</h2>
          <div className='block'>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
          </div>
      </React.Fragment>
    )
  }
  const ReceiptInfo = ({info}) => {
    if (!info) {
      return null;
    } else {
      return <React.Fragment>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control defaultValue={info["restaurant_name"]} onChange={handleNameOnChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control defaultValue={info["date"]} onChange={handleDateOnChange}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control defaultValue={info["amount"]} onChange={handleAmountOnChange}/>
          </Form.Group>
          <Button variant="info" type="submit" onClick={handleOnClick}>
            Looks good!
          </Button>
        </Form>
      </React.Fragment>
    }
  }
  const sendFile = (file) => {
    const data = new FormData();
    setFile(file);
    data.append('file', file);
    fetch(`${rootURL}/upload`,{
      method: 'POST',
      body: data
    })
    .then(res => {
      // setInfo(res);
      res.json()
      .then(data => {
        setInfo(data["info"]);
      });
      setReceiptPath(rootURL + "/" + file.name);
      setShowInfo(true);
    })
    .catch(err => console.log(err));
  }
  const handleChange = (file) => {
    sendFile(file);
  };

  return (
    <React.Fragment>
      <img src={logo} width="400" className="App-logo" alt="logo" />

      <div className="App">
        <Confetti disabled={disabled}/>
        
        <div>
          {receiptPath ? <h2>Your Receipt Image</h2> : <UploadFragment/>}
          <div className='block'>
            {receiptPath ? <img src={receiptPath} width="100%" /> : null }
          </div>
        </div>
        {
          showInfo ? (
            <div>
              <div className='line'>
                <h2>Receipt Information</h2>
                <img src={receiptIcon} width="50" height="auto" alt="receipt-icon" />
              </div>
              <ReceiptInfo info={info}/>        
            </div>
          ) : (
            <div className='bg-color'>
              <img src={bg1} width="100%" style={{"marginTop":20}} alt="background-1" />
            </div>
          )
        }
        
      </div>
    </React.Fragment>
  );
}

export default App;
