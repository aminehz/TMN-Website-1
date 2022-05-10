import React, {useState, useEffect} from "react";
import PageTitle from "../components/common/PageTitle";
import { Link, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
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
  }, []);

    const [title,setTitle]= useState('');
    const [content,setContent]= useState('');
    const [category,setCategory]= useState('');
    const [firstimage,setFirstImage]= useState('');
    const [author,setAuthor]= useState('');
    const [isPending, setIsPending] = useState(false);
    const history= useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();

        
        let formData = {"title":title, content:content,category:category,author:author,image:firstimage.base64.split("base64,")[1],status:'approved'};
        axios.post(`http://localhost:3000/api/blogs/addblog`, formData )
        .then(res => {
          setIsPending(true);
          history.go(-1);
        })

      
      /*fetch('http://localhost:3000/api/blogs/addblog', {
        method: 'POST',
        body: formData
      }).then(() => {
        console.log('new blog added');
        setIsPending(true);
        history.go(-1);
      })*/
      
      
    }
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
    <Row Form>
      {/* Editor */}
      <Col lg="12" md="12">
      <Form>
      <form onSubmit={handleSubmit}>

        <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post">
            <FormInput size="lg" className="mb-3" placeholder="Your Title" 
                  required={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
            <ReactQuill theme="snow" className="add-new-post__editor mb-1"
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
    
          category.refrencesTo==='blogs'?<option value={category._id}>{category.title}</option>:''
        ))}
        </FormSelect>
        </InputGroup>
        
        <FileInputComponent labelText=""
          labelStyle={{fontSize:14}}
          multiple={true}
          callbackFunction={(file_arr)=>{setFirstImage(file_arr[0])}}
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
            {firstimage === '' ? "chose image" : firstimage.name}
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
          <FormInput placeholder="Author"           
                    required={true}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)} />
        </InputGroup>
        { !isPending && <Button theme="accent" size="xl" className="ml-auto" type="submit">
          <i className="material-icons">file_copy</i> Publish
        </Button>}
        { isPending && <Button theme="accent" size="xl" className="ml-auto" type="submit">
          <i className="material-icons">file_copy</i> Publishing...
        </Button>}

        
      </Col>
    </form>
    </Form>
    </Col>
    </Row>
  </Container>
);
};


export default AddNewBlog;

