import React, { Component } from "react";
import * as reactbootstrap from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      year: null,
      rating: '',
      duration: '',
      image: '',
      submit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
  }

  // componentDidMount() {
  //   let moviesList = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : {}
  //   let currentMovie = Object.values(moviesList).filter(movie => movie.id == this.props.movieId)
  //   if (Object.keys(currentMovie).length > 0) {
  //     let editMovie = currentMovie[0]
  //     this.setState({
  //       name: editMovie.name,
  //       year: editMovie.year,
  //       rating: editMovie.rating,
  //       duration: editMovie.duration,
  //       image: editMovie.image,
  //     });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.uniqueId !== this.props.uniqueId) {
      this.setState({
        name: '',
        year: null,
        rating: '',
        duration: '',
        image: '',
        submit: false,
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      submit: false
    });
  }

  handleDateChange(date) {
    this.setState({
      year: date
    });
  }

  addMovie(e) {
    this.setState({
      submit: true
    });
    const {name, year,rating, duration} = this.state
    if (name !== '' && year !== '' && rating !== '' && duration !== '') {
      let moviesList = localStorage.getItem('movies') ?  JSON.parse(localStorage.getItem('movies')): {}
      let newMovie = {
        "id": Object.keys(moviesList).length + 1,
        'name': this.state.name,
        "year": this.state.year,
        "rating": this.state.rating,
        "duration": this.state.duration,
        "image": this.state.image,
        "index": Object.keys(moviesList).length + 1,
      }
      moviesList[Object.keys(moviesList).length +1] = newMovie
      localStorage.setItem('movies', JSON.stringify(moviesList));
      localStorage.setItem('newMovie', 1);
      this.props.handleSubmit(e)
    }
  }

  handleDuration(e) {
    const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({duration: e.target.value})
      }
  }

  render() {
    const { name, year, rating, duration, image, submit } = this.state;
    return (
      <reactbootstrap.Container className="pt-5 px-0">
        <div style={{ color: "#EC661C", fontSize: "20px" }}>
          <span>
            <h4>{"Add movie"}</h4>
          </span>
        </div>
        <reactbootstrap.Form style={{ textAlign: 'left' , width: "600px", height: "200px" }}>
          <reactbootstrap.FormGroup>
            <div style={{ marginbottom: "15px", border: "0px" }}>
              <label style={{ marginLeft: "30px", color: "#EC661C", fontSize: "14px" }}>{"Movie name"}<span style={{ color: "red" }}> * </span></label>
              <input
                name="name"
                value={name}
                type="text"
                style={{
                  marginLeft: "36px",
                  marginBottom: "10px",
                }}
                placeholder={"Movie name"}
                onChange={this.handleChange}
                autoComplete="off"
              />
            </div>
            {submit && name === "" && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {"Movie name field is required"}
              </div>
            )}
          </reactbootstrap.FormGroup>
          <reactbootstrap.FormGroup>
            <div style={{ marginbottom: "15px", border: "0px" }}>
              <label style={{ marginRight: "32px", marginLeft: "30px", color: "#EC661C", fontSize: "14px" }}>{"Released year"}<span style={{ color: "red" }}> * </span></label>
                <DateTimePicker
                  onChange={(e) => this.handleDateChange(e)}
                  format="yyyy"
                  value={year}
                />
            </div>
            {submit && year === null && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {"Released year field is required"}
              </div>
            )}
          </reactbootstrap.FormGroup>
          <reactbootstrap.FormGroup>
            <div style={{ marginbottom: "15px", border: "0px" }}>
              <label style={{ marginLeft: "30px", color: "#EC661C", fontSize: "14px" }}>{"Rating"}<span style={{ color: "red" }}> * </span></label>
              <input
                name="rating"
                value={rating}
                type="textarea"
                style={{
                  marginTop: "10px",
                  marginLeft: "72px",
                  marginBottom: "10px",
                }}
                placeholder={"Rating"}
                onChange={this.handleChange}
                autoComplete="off"
              />
            </div>
            {submit && rating === "" && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {"Rating field is required"}
              </div>
            )}
          </reactbootstrap.FormGroup>
          <reactbootstrap.FormGroup>
            <div style={{ marginbottom: "15px", border: "0px" }}>
              <label style={{ marginLeft: "30px", color: "#EC661C", fontSize: "14px" }}>{"Duration in hours"}<span style={{ color: "red" }}> * </span></label>
              <input
                name="duration"
                value={duration}
                type="text"
                pattern="[0-9]*"
                style={{
                  marginLeft: "3px",
                  marginBottom: "10px",
                }}
                placeholder={"Duration"}
                onChange={this.handleDuration}
                autoComplete="off"
              />
            </div>
            {/* <input type="text" pattern="[0-9]*"
             onInput={this.handleDuration} value={this.state.duration} /> */}
            {submit && duration === "" && (
              <div style={{ color: "red", fontSize: "15px" }}>
                {"Duration field is required"}
              </div>
            )}
          </reactbootstrap.FormGroup>
          {/* <reactbootstrap.FormGroup>
            <div className="input-group-prepend col-md-4">
                <span style={{ background: 'none', border: '0px', color: '#EC661C', padding: '8px' }} className=" " id="inputGroupFileAddon01">
                  {"Image"}
                </span>
            </div>
            <div className="col-md-8 custom-file input_sw">
                <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    aria-describedby="inputGroupFileAddon01"
                    name='image'
                    accept={'.jpg, .png, .svg, .gif, .bmp, .tiff, .tif'}
                    onChange={this.handleChange}
                />
            </div>
          </reactbootstrap.FormGroup> */}
          <div>
            <reactbootstrap.Button
              style={{
                float: "left",
                backgroundColor: "#EC661C",
                borderColor: "black",
                marginLeft: "20px",
                marginTop: "30px",
                width: "80px"
              }}
              type="button"
              onClick={(e) => this.props.handleSubmit(e)}
            >
              {"Cancel"}
            </reactbootstrap.Button>
          </div>
          <div>
            <reactbootstrap.Button
              style={{
                float: "right",
                backgroundColor: "#EC661C",
                borderColor: "black",
                marginRight: "20px",
                marginTop: "30px",
                width: "80px"
              }}
              type="button"
              onClick={(e) => this.addMovie(e)}
            >
              {"Add"}
            </reactbootstrap.Button>
          </div>
        </reactbootstrap.Form>
      </reactbootstrap.Container>
    );
  }
}

export default CreateTask;
