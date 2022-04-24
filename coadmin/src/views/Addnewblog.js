import React, {useState, useEffect} from "react";
import PageTitle from "../components/common/PageTitle";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

import {  Container,
          Button,
          Row, 
          Col,
          InputGroup,
          InputGroupAddon,
          InputGroupText,
          CardBody,
          Card,
          Form,
          FormSelect,
          Breadcrumb,
          BreadcrumbItem,
          FormInput } from "shards-react";


const AddNewBlog = () => {

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

  return(
  
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Add New Post" subtitle="Blog Posts" className="text-sm-left" />
    </Row>
    

    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/Blogs-management">Blogs Management</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>New Blog</BreadcrumbItem>
    </Breadcrumb>
    <Row>
      {/* Editor */}

      <Col lg="12" md="12">
        <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post">
            <FormInput size="lg" className="mb-3" placeholder="Your Title" />
            <ReactQuill className="add-new-post__editor mb-1"/>
          </Form>
        </CardBody>
     </Card>
      </Col>

      <Col lg="12" md="12">
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Category</InputGroupText>
          </InputGroupAddon>
        <FormSelect>
          <option>Choose</option>
          <option>News</option>
          <option>Blog</option>
          <option>Podcast</option>
          <option>Event</option>
        </FormSelect>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Sub-Category</InputGroupText>
          </InputGroupAddon>
        <FormSelect>
        {categories &&
                categories.map((category) => (

          <option>{category.title}</option>
        ))}
        </FormSelect>
        </InputGroup>
        <div className="custom-file mb-3">
          <input type="file" className="custom-file-input" id="customFile2" />
          <label className="custom-file-label" htmlFor="customFile2">
            Choose first image
          </label>
        </div>
        <div className="custom-file mb-3">
          <input type="file" className="custom-file-input" id="customFile2" />
          <label className="custom-file-label" htmlFor="customFile2">
            Choose second image
          </label>
        </div>

        <InputGroup seamless className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">person</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput placeholder="Author" onChange={() => {}} />
          
        </InputGroup>
        
        <FormInput placeholder="Social Media" onChange={() =>{}}/>
        
        
        <Button theme="accent" size="xl" className="ml-auto">
          <i className="material-icons">file_copy</i> Publish
        </Button>

        
      </Col>
      
    </Row>
  </Container>
);
};


export default AddNewBlog;

