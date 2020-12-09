import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';
import AddMovie from './AddMovie';
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Modal from 'react-awesome-modal'

class ManageMovies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moviesList: localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : {} ,
      showAddMovie: false,
      sortType: '1',
    }

    this.handleView = this.handleView.bind(this)
    this.handleHide = this.handleHide.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sortByPriceAsc = this.sortByPriceAsc.bind(this)
    this.sortByPriceDesc = this.sortByPriceDesc.bind(this)
  }

  componentDidMount() {
    this.sortByPriceAsc(this.state.sortType)
  }

  componentDidUpdate(prevProps, prevState) {
    let movies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : {};
    if (parseInt(localStorage.getItem('newMovie')) === 1) {
      this.setState({
        moviesList: movies,
      },(localStorage.setItem('newMovie', 0)))
    }
  }

  handleView(id) {
    window.location.href = '/moviedetails/' + id;
  }

  handleHide() {
    this.setState({
      showAddMovie: false,
    })
  }

  handleSubmit(e) {
    this.setState({
      showAddMovie: false,
    })
  }

  sortByPriceAsc(sortType) {
    let ascendingData = Object.values(this.state.moviesList).sort((a, b) => (a.duration - b.duration))
    this.setState({
      moviesList: ascendingData,
      sortType: sortType,
    });
  }

  sortByPriceDesc(sortType) {
    let descendingData =  Object.values(this.state.moviesList).sort((a, b) => (b.duration - a.duration))
    this.setState({
      moviesList: descendingData,
      sortType: sortType,
    });
  }

  handleChange(e) {
    if (parseInt(e.target.value) === 1) {
      this.sortByPriceAsc(e.target.value)
    } else {
      this.sortByPriceDesc(e.target.value)
    }
  }

  searchData(e) {
    let list = []
    let res = ''
    let allMovies =  localStorage.getItem('movies') ?  JSON.parse(localStorage.getItem('movies')): {}
    list = Object.values(allMovies).filter(function (item) {
      res = item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
      return res;
    });
    this.setState({
      moviesList: list,
    })
  }

  render() {
    const { moviesList, sortType } = this.state;

    const createTemplateContent = (
      <Modal visible={this.state.showAddMovie} style={{width:"400", height:"300"}} effect="fadeInUp" onClickAway={() => this.handleHide()}>
          <div>
              <AddMovie handleSubmit={this.handleSubmit} uniqueId={Math.floor((Math.random() * 10) + 1)}/>
          </div>
      </Modal>
    )

    return(
      <reactbootstrap.Container className="pt-5 px-0">
        <div style={{ color: '#EC661C', fontSize: '20px'}} >
          <reactbootstrap.Button style={{ marginRight: "180px", float: 'right',backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px' }} type="button" onClick={(e) => this.setState({showAddMovie: true})}>
              {'Add movie'}
          </reactbootstrap.Button>
        </div>
        <div style={{ marginLeft: "220px", color: '#EC661C', fontSize: '20px'}} >
            <span><h4>{"Manage movies"}</h4></span>
        </div>
        <reactbootstrap.Form style={{ marginLeft: "100px" }}>
          <reactbootstrap.FormGroup>
            <div style={{ float: 'right', marginTop: "-24px", marginRight: "20px", marginBottom: "15px", borderColor: "black" }}>
              <label style={{ color: "#EC661C", fontSize: "14px" }}>
                {"Sort  "}
              </label>
              <reactbootstrap.FormControl
                as="select"
                name="type"
                className="input_sw"
                value={sortType}
                onChange={this.handleChange}
              >
                <option value={"1"}>{"ASC"}</option>
                <option value={"2"}>{"DSC"}</option>
              </reactbootstrap.FormControl>
            </div>
          </reactbootstrap.FormGroup>
          <reactbootstrap.Table style={{border: '4px solid lightgray', 'width' : '80%', 'marginLeft': '60px', 'marginRight': '60px' }}>
            <input type="text" style={{ borderRadius: "5px", borderColor: "#EC661C", height: '20px', width: "274%" }} placeholder={"What are you looking for (Search with movie name) ?"} autoFocus onChange={(e) => this.searchData(e)} /><br />
            <thead style={{ backgroundColor: '#EC661C', color: 'white', position: 'sticky', top: '0', textAlign: 'center' }}>
                <tr style={{ textAlign: 'center', border: '2px solid black' }}>
                  <th>{'Movie name'}</th>
                  <th>{'Released year'}</th>
                  <th>{'Rating'}</th>
                  <th>{'Duration'}</th>
                  <th>{'View'}</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'gray', color: 'white', position: 'sticky', top: '0', textAlign: 'center' }}>
                {Object.keys(moviesList).length > 0 &&
                  <>
                    {Object.values(moviesList).map((item) => (
                      <tr style={{ textAlign: 'center', border: '2px solid black' }}>
                         <td>{item.name}</td>
                         <td>{(new Date(item.year)).getFullYear()}</td>
                         <td>{item.rating}</td>
                         <td>{item.duration + " Hours"}</td>
                         <td>
                           <reactbootstrap.Button style={{ backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px', width: '80px' }} type="button" onClick={(e) => this.handleView(item.id)}>
                                 {'View'}
                           </reactbootstrap.Button>
                         </td>
                      </tr>
                    ))}
                  </>
                }
                {createTemplateContent}
              </tbody>
          </reactbootstrap.Table>
        </reactbootstrap.Form>
      </reactbootstrap.Container>
    )
  }

}

export default ManageMovies
