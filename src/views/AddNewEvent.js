import React, { useState } from "react";
import PageTitle from "../components/common/PageTitle";
import ReactQuill from "react-quill";
import { Link, useHistory } from "react-router-dom";
import FileInputComponent from 'react-file-input-previews-base64'
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-quill/dist/quill.snow.css";
import "../assets/quill.css";
import {  Container,
          Button,
          Row, 
          Col,
          InputGroup,
          InputGroupAddon,
          InputGroupText,
          Breadcrumb,
          BreadcrumbItem,
          FormInput,
          FormGroup,
          CardBody,
          Card,
          Form,

        } from "shards-react";


const AddNewEvent = () => {


    const [title,setTitle]= useState('');
    const [details,setDetails]= useState('');
    const [date,setDate]= useState('');
    const [eventposter,setEventPoster]= useState('');
    const [hour,setHour]= useState('');
    const [location,setLocation]= useState('');
    const [isPending, setIsPending] = useState(false);
    const history= useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

      
      let formData = {"title":title, details:details,date:date,hour:hour,location:location,eventPoster:eventposter.base64.split("base64,")[1],status:'approved'};
      axios.post(`http://localhost:3000/api/event/addEvent`, formData )
      .then(res => {
        setIsPending(true);
        history.go(-1);
      })
    }
  return (

  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Add New Post" subtitle="Event Posts" className="text-sm-left" />
    </Row>
    
    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/Events-management">Events Management</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>New Event</BreadcrumbItem>
    </Breadcrumb>

    <Row>
      {/* Editor */}

        <Col lg="12" md="12">
        <form onSubmit={handleSubmit}>

        <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post">
            <FormInput size="lg" className="mb-3" placeholder="Your Title" 
                  required={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
            <ReactQuill className="add-new-post__editor mb-1"
                  required={true}
                  value={details}
                  onChange={setDetails}
            />
          </Form>
        </CardBody>
        </Card>

        <Col lg="12" md="12">
        
        <FormGroup>
              <FormInput
                id="feInputLocation"
                placeholder="Location"
                required={true}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormGroup>
        </Col>


      <Col lg="12" md="12">
        
        <InputGroup seamless className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">place</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput placeholder="Hour" onChange={(e) => setHour(e.target.value)} />
        </InputGroup>

        {/* DatePicker */}

        <Col lg="12" md="12">
            <InputGroup className="mb-3">
            <DatePicker value={date} onChange={(date) => setDate(date.toString().substring(0,15))} />
 
             </InputGroup>
        </Col>

        <FileInputComponent labelText=""
          labelStyle={{fontSize:14}}
          multiple={true}
          callbackFunction={(file_arr)=>{setEventPoster(file_arr[0])}}
          accept="image/*" 
          imagePreview={true}
          textBoxVisible={true}
          buttonComponent={<></>}
          textFieldComponent={
          <div className="custom-file mb-3">
          <input className="custom-file-input" id="customFile2" 
                    required={false}
                     />
          <label className="custom-file-label" htmlFor="customFile2">
            {eventposter === '' ? "chose image" : eventposter.name}
          </label>
        </div>
        }
          
          />

        { !isPending && 
          <Button theme="accent" size="xl" className="ml-auto" type="submit">
            <i className="material-icons">file_copy</i> Publish
          </Button>}
        { isPending && 
          <Button theme="accent" size="xl" className="ml-auto" type="submit">
            <i className="material-icons">file_copy</i> Publishing...
          </Button>}
      </Col>
      </form>
      </Col>
    </Row>
  </Container>
  )
};

export default AddNewEvent;
