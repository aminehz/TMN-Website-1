import React, { useState } from "react";
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
  } from "shards-react";
import { Link, useHistory,} from "react-router-dom";


const AddNewCoAdmin = () => {

  const history = useHistory();
  
  const [name,setName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [city,setCity] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const coadmin = { name, lastName, email, password, city };

    fetch('http://localhost:3000/api/coadmin/addCoadmin', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coadmin)
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
      <PageTitle sm="4" title="Add New Co-Addmin" subtitle="Co-admin" className="text-sm-left" />
    </Row>
    
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="/co-admin">Co-Admins</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>New Co-Admin</BreadcrumbItem>
    </Breadcrumb>

    <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
          <form onSubmit={handleSubmit}>
            <Row form>
            <Col md="6" className="form-group">
                <label htmlFor="feFirstName">First Name</label>
                <FormInput
                  type="text"
                  placeholder="First name"
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col md="6">
                <label htmlFor="feLastName">Last Name</label>
                <FormInput
                  type="text"
                  placeholder="Last name"
                  required={true}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="feEmailAddress">Email</label>
                <FormInput
                  type="email"
                  placeholder="Email"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col md="6">
                <label htmlFor="fePassword">Password</label>
                <FormInput
                  type="password"
                  placeholder="Password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="feInputCity">City</label>
                <FormInput
                  type="text"
                  placeholder="City"
                  required={true} 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Col>
            </Row>
            { !isPending && <Button type="submit">Create</Button>}
            { isPending && <Button  disabled>Adding...</Button>}
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
