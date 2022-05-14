import React, { useState, useEffect } from "react";
import PageTitle from "../components/common/PageTitle";
import ReactQuill from "react-quill";
import { Link, useHistory } from "react-router-dom";
import FileInputComponent from 'react-file-input-previews-base64'
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
    const [content,setContent]= useState('');
    const [category,setCategory]= useState('');
    const [newsImages,setNewsImages]= useState('');
    const [author,setAuthor]= useState('');
    const [isPending, setIsPending] = useState(false);
    const history= useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
        let newtab = []
        newsImages.map((pic) => {
          newtab.push(pic.base64.split("base64,")[1])
        })
        
        let formData = {"title":title, content:content,category:category,author:author,newsImages:newtab,status:'approved'};
       
        axios.post(`http://localhost:3000/api/news/addNews`, formData )
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
        <Link to="/News-management">News Management</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>New News</BreadcrumbItem>
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
                  value={content}
                  onChange={setContent}
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
    
          category.refrencesTo==='news'?<option value={category._id}>{category.title}</option>:''
        ))}
        </FormSelect>
        </InputGroup>
        <FileInputComponent labelText=""
          labelStyle={{fontSize:14}}
          multiple={true}
          callbackFunction={(file_arr)=>{setNewsImages(file_arr)}}
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
            {newsImages === '' ? "chose image" : newsImages.name}
          </label>
        </div>
        }
          
          />
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
