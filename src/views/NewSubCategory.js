import React, {useState} from "react";
import PageTitle from "../components/common/PageTitle";
import {
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    Button,
    Container,
    Breadcrumb, 
    BreadcrumbItem,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormSelect
                    } from "shards-react";
import { Link, useHistory } from "react-router-dom";


const AddNewCoAdmin = () => {

  const [title,setTitle] = useState('');
  const [refrencesTo,setReferencesTo] = useState('blogs');
  const [isPending,setIsPending] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = { title, refrencesTo };

  fetch('http://localhost:3000/api/categorys/addCategory', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category)
    }).then(() => {
      console.log('new Co-Admin added');
      setIsPending(true);
      history.go(-1);
    })

  }

  return(
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Add New Sub-Category" subtitle="Sub-Categories" className="text-sm-left" />
    </Row>
    
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/categories">Categories</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>New Sub-Category</BreadcrumbItem>
    </Breadcrumb>

    <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
          <form onSubmit={handleSubmit}>
            <Row form>
            <Col md="6" className="form-group">
                <label htmlFor="feFirstName">Sub-Category Name</label>
                <FormInput
                  id="feCategoryName"
                  type="text"
                  placeholder="Sub-Category name"
                  required={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col md="6">
              <label htmlFor="feFirstName">References</label>
              <InputGroup className="mb-3" >
                <InputGroupAddon type="prepend">
                <InputGroupText>Refers to</InputGroupText>
                </InputGroupAddon>
                <FormSelect
                value={refrencesTo}
                onChange={(e) => setReferencesTo(e.target.value)}
                >
                <option>blog</option>
                <option>podcast</option>
                <option>news</option>
                </FormSelect>
              </InputGroup>
              </Col>
            </Row>
            { !isPending && <Button type="submit">Add</Button> }
            { isPending && <Button type="submit">Adding...</Button> }
          </form>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
  </Container>
  )
};

export default AddNewCoAdmin;
