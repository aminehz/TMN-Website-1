import React, { useState, useEffect } from "react";
import PageTitle from "../components/common/PageTitle";
import ReactQuill from "react-quill";
import { Link, useHistory } from "react-router-dom";
import FileInputComponent from 'react-file-input-previews-base64';
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
          FormSelect,
          Breadcrumb,
          BreadcrumbItem,
          Form,
          FormInput,
          Card,
          CardBody } from "shards-react";


const AddNewNews = () => {

  const [categories,setCategories] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3000/api/categorys/allCategorys")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCategories(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [title,setTitle]= useState('');
    const [details,setDetails]= useState('');
    const [category,setCategory]= useState('');
    const [link,setLink]= useState('');
    const [author,setAuthor]= useState('');
    const [guests,setguests]= useState('');
    const [isPending, setIsPending] = useState(false);
    const history= useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
        
        let formData = {title:title, details:details,category:category,author:author,podcastLink:link,guests:guests,status:'approved'};
       
        axios.post(`http://localhost:3000/api/podcasts/addPodcast`, formData )
        .then(res => {
          setIsPending(true);
          history.go(-1);
        })
    }

  return(

  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Add New Post" subtitle="News Posts" className="text-sm-left" />
    </Row>
    
    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/Podcasts-management">Podcasts Management</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>New Podcast</BreadcrumbItem>
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
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Sub-Category</InputGroupText>
          </InputGroupAddon>
          <FormSelect required={true}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
        {categories &&
                categories.map((category) => (
    
          category.refrencesTo==='podcast'?<option value={category._id}>{category.title}</option>:''
        ))}
        </FormSelect>
        </InputGroup>

        <InputGroup seamless className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">person</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput placeholder="podcast link" onChange={(e) => setLink(e.target.value)} />
        </InputGroup>

        <InputGroup seamless className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">person</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput placeholder="guests" onChange={(e) => setguests(e.target.value)} />
        </InputGroup>
        
        <InputGroup seamless className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">person</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput placeholder="Author" onChange={(e) => setAuthor(e.target.value)} />
        </InputGroup>
        
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
  );
};

export default AddNewNews;
