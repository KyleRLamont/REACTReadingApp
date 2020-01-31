import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from "axios";


class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: "",
  };

  // componentDidMount() {

  // }

  // loadBooks = (res) => {
  //   this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" })
  //     .catch(err => console.log(err));
  // };



  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const term = event.target;
    // const mykey = process.env.KEY || key
    const queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + term;
    axios.get(queryURL)
      .then(res => this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Google Book Search and Database!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Search Term (required)"
              />

              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Find Now
              </FormBtn>
            </form>
            <List>
              {this.state.books.map(book => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                </ListItem>
              ))}
            </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
