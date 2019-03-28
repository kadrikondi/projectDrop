import React, { Component } from "react";
import "./Addproject.css";
import "../../assets/smalloader.css";
import LoginHeader from "../usersHeader";

class Addproject extends Component {
  constructor() {
    super();
    this.state = {
      topic: "",
      department: "",
      school: "",
      year: "",
      summary: "",
      // projectdoc:'',
      notif: "",
      isLoading: false
    };
    this.handleTopic = this.handleTopic.bind(this);
    this.handleDepartment = this.handleDepartment.bind(this);
    this.handleSchool = this.handleSchool.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleSummary = this.handleSummary.bind(this);
    // this.handleProjectDoc =this.handleProjectDoc.bind(this)
  }
  handleTopic(e) {
    this.setState({ topic: e.target.value });
  }
  handleDepartment(e) {
    this.setState({ department: e.target.value });
  }
  handleSchool(e) {
    this.setState({ school: e.target.value });
  }
  handleYear(e) {
    this.setState({ year: e.target.value });
  }
  handleSummary(e) {
    this.setState({ summary: e.target.value });
  }
  //   handleProjectDoc(e){
  //       console.log(e.target.files[0])
  //       this.setState({
  //           projectdoc:e.target.files[0]
  //       })
  //   }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    //    console.log("state" + this.state.projectdoc)

    //    const data = new FormData();
    //    data.append('projectdoc', this.state.projectdoc,this.state.projectdoc.name);
    // //    data.append('filename', this.state.);
    //     console.log('Ok'+ data)
    console.log("oK" + this.state.topic);
    fetch("/project/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        topic: this.state.topic,
        department: this.state.department,
        school: this.state.school,
        year: this.state.year,
        summary: this.state.summary
        // projectdoc:data
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ isLoading: false });
        this.setState({ notif: res.message });
        if (res.message === `success now upload`) {
          const id = res.id;
          localStorage.setItem("projectId", JSON.stringify(res.id));
          this.props.history.push(`/upload/${id}`);
        }
        // this.props.history.push('/upload')
      })

      .catch(err => console.log(err));
  };
  async componentDidMount() {
    const token = await localStorage.getItem("token");
    console.log(token);
    if (!token) {
      this.props.history.push("/");
    }
  }

  render() {
    const { topic, department, school, year, summary, projectdoc } = this.state;
    return (
      <div>
        <LoginHeader />

        {/* <!--Form with header--> */}
        <div className="card col-lg-4 mt-4" id="addproject">
          {/* <!--Header--> */}
          <div className="card-header  black-text text-center ">
            <h3>
              <i className="mdi mdi-note-plus" /> Add Project
            </h3>
          </div>

          {this.state.notif === "empty field" ? (
            <div className="alert alert-danger">{this.state.notif}</div>
          ) : (
            <div className="alert alert-danger" style={{ display: "none" }}>
              {this.state.notif}
            </div>
          )}

          <div className="card-body px-lg-5 pt-0  ">
            {/* <!--Body--> */}
            <div className="form-group mt-5">
              <input
                type="text"
                id="form3"
                name="topic"
                className="form-control"
                value={topic}
                onChange={this.handleTopic}
                placeholder="Project topic"
              />
              {/* <label htmlFor="form3"> */}

              {/* <i className="mdi mdi-format-title"></i> Topic</label> */}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="form2"
                className="form-control"
                name="department"
                value={department}
                onChange={this.handleDepartment}
                placeholder="Project Deparment"
              />
              {/* <label htmfor="form2">
            
            <span className="mdi mdi-equal-box"></span> Department</label> */}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="form2"
                className="form-control"
                name="school"
                value={school}
                onChange={this.handleSchool}
                placeholder="Institution"
              />
              {/* <label htmlFor="form2"> 
            <i className="mdi mdi-equal-box"></i> School</label> */}
            </div>

            <div className="form-group">
              {/* <i className="fa fa-user prefix"></i> */}
              <input
                type="text"
                id="form3"
                className="form-control"
                name="year"
                value={year}
                onChange={this.handleYear}
                placeholder="Project Year"
              />
              {/* <label htmlFor="form3"> <i className="mdi mdi-note"></i>Project Year</label> */}
            </div>

            <div className="form-group">
              <textarea
                type="text"
                id="form10"
                className="md-textarea form-control"
                rows="2"
                name="summary"
                value={summary}
                onChange={this.handleSummary}
                placeholder="&#x270d;Project Summary"
              />
              {/* <label htmlFor="form10">Summary</label> */}
            </div>

            {/* <div className="md-form"> */}
            {/* <i className="fa fa-user prefix"></i> */}

            {/*             
            <label className="mdi mdi-file-export text-left text-muted">Upload project file</label> */}
            {/* <input style={{display: 'inherit'}} 
            type="file" 
            className="form-control" 
            name="projectdoc"
            
            onChange={this.handleProjectDoc} 
            ref={inputFile=>this.inputFile=inputFile}/>
             <button  className="btn btn-grey" 
             onClick={()=>this.inputFile.click()}>Choose Project Document</button> */}
            {/* <p className="help-block text-left"> upload a zip doc or pdf file</p> */}
            {/* </div> */}

            <div className="text-center">
              {this.state.isLoading === true ? (
                (document.getElementById("btnaddProject").style.display =
                  "none") && <div className="text-center" id="loader" />
              ) : (
                <button
                  id="drop"
                  type="button"
                  id="btnaddProject"
                  className="btn btn-pink mdi mdi-cloud-upload"
                  onClick={this.handleSubmit}
                >
                  {" "}
                  &nbsp; Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Addproject;
