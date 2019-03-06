import React, { Component } from "react";
import { Link } from "react-router-dom";
import UsersHeader from "./usersHeader";
import "../assets/style.css";
import bookShef from "../assets/img/bookshelf.svg";
import userPicPlaceholder from '../assets/img/undraw_profile.png'
import bookAdd from '../assets/img/bookAdd.png'
import { userProfile } from "../apidata/api";
export default class dashboard extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      userAvater:''
    };
  }

  async componentWillMount() {
    const user = await userProfile();
    console.log(user.message + "  ookkkkk");
    if (user.message === "success") {
      // if(user.user==)

      await this.setState({ name: user.name.toLowerCase(),userAvater:user.avater });

      const id = await window.localStorage.getItem("userId");

      await this.setState({ id: id });
      console.log(this.state.id);
    } else {
      this.props.history.push("/");
    }
  }
  render() {
    const { id, name, userAvater } = this.state;
    const ImagesSTyle={
      width:'90%',
      height:'150px',
      borderRadius:'45%'
    }

    return (
      <div>
        <UsersHeader />
        <div className="alert alert-info">
          Welcome {name} much{" "}
          <span style={{ color: "red", fontSize: "20px" }}>&hearts;</span>
        </div>
        <div className="row ">
          <div className="col-lg-12">
            <nav className="nav flex">
              <div className="navlink">
                <img src={userPicPlaceholder} alt="" style={ImagesSTyle}/>
                <Link className="nav-link  dlink" to="/userprofile">
                  profile
                </Link>
                <Link className="icon" to="addproject">
                  <i className="mdi mdi-account-box-outline icon" />
                </Link>
              </div>

              <div className="navlink">
                <img src={bookAdd} alt="" style={ImagesSTyle} />
                <Link className="nav-link dlink" to="addproject">
                  addproject
                </Link>
                <Link className="icon " to="addproject">
                  <i className="mdi mdi-note-plus-outline  icon" />
                </Link>
              </div>
              <div className="navlink">
                <img src={bookShef} alt="" style={ImagesSTyle} />
                <Link className="nav-link  dlink" to="projects">
                  View Project
                </Link>

                <Link className="icon" to="projects">
                  <i className="mdi mdi-eye-outline  icon" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
