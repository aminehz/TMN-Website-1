import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Breadcrumb, BreadcrumbItem, Badge } from "shards-react";
import { Link, } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

const BlogsManagement = () => {

  const [blogs, setBlogs] = useState([])

    const fetchData = () => {
      fetch("http://localhost:3000/api/blogs/allblogs")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setBlogs(data)
        })
    }
  
    useEffect(() => {
      fetchData()
    }, [])

  return(
  
  <Container fluid className="main-content-container px-4">

    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Blogs list" subtitle="Blogs Management" className="text-sm-left" />
    </Row>
    
    {/* Components Navigation */}
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>Blogs Management</BreadcrumbItem>
    </Breadcrumb>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">Blogs list</h6>
            <Link to="/new-blog">
              <Button outline theme="primary" className="mb-2 mr-1" style={{float: "right"}}>
                Add Blog
              </Button>
            </Link>
          </CardHeader>
          <CardBody className="bg-dark p-0 pb-3">
            <table className="table table-dark mb-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="border-0">
                    Title
                  </th>
                  <th scope="col" className="border-0">
                    Sub-Category
                  </th>
                  <th scope="col" className="border-0">
                    written by
                  </th>
                  <th scope="col" className="border-0">
                    Status
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                  <th scope="col" className="border-0">
                    Social Media
                  </th>
                </tr>
              </thead>
              <tbody>
              {blogs &&
                blogs.map((blog, _id) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.category ? blog.category.title : ""}</td>
                  <td>{blog.author}</td>
                  <td>                 
                    <Badge theme={(() => {
                        switch (blog.status) {
                          case "aproved":   return "success";
                          case "rejected":  return "danger";
                          default :         return "warning";
                        }
                    })()}>{blog.status}
                    </Badge>
                  </td>
                  <td>
                    <Link to={`/Blog-details/${blog._id}`}>
                        <Button outline size="sm" theme="info" className="mb-2 mr-1">
                        Info
                        </Button>
                    </Link>
                  </td>
                  <td>
                    {blog.authorSocialMedia}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default BlogsManagement;