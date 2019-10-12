import React from 'react'
import { Link } from 'react-router-dom'
 /*const Login = () => (

      
    )*/
class Login extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      opened: false,
      loginData:[],
      registerData:[]
    };
    this.toggleBox = this.toggleBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
  }
  
  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened,

    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
     axios.post('https://engine-staging.viame.ae/assessment/login',{users:{
          email:email,
          password:password
      }})
    .then(function (response) {
      localStorage.setItem('user-id',response.data.token);
      localStorage.setItem('user-email',response.data.email);
      window.location.reload();
    })
  }

  handleSubmitRegister(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
     axios.post('https://engine-staging.viame.ae/assessment/users',{users:{
          email:email,
          password:password
      }})
    .then(function (response) {
      window.location.reload();
    })
  }
   render() {
    var { title, children } = this.props;
    const { opened } = this.state;
      return (
         <section className="login-block">
            <div className="container dv_container">
            <div className="row" > 
                <div className="col-md-8 banner-sec">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <img className="d-block img-fluid" src="public/images/1.jpg" alt="First slide"/>
                                <div className="carousel-caption d-none d-md-block">
                                    <div className="banner-text">
                                        <h2>This is First Slide</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block img-fluid" src="public/images/2.jpg" alt="Second slide"/>
                                <div className="carousel-caption d-none d-md-block">
                                    <div className="banner-text">
                                        <h2>This is Second Slide</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block img-fluid" src="public/images/3.jpg" alt="Third slide"/>
                                <div className="carousel-caption d-none d-md-block">
                                    <div className="banner-text">
                                        <h2>This is Heaven</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       { !opened ? (
        <div className="col-md-4 login-sec">
                    <form className="login-form" id="login-form" onSubmit={this.handleSubmit}>
                        <div className="dv_login_form">
              <h2 className="text-center"><img src="https://www.goodhand.ae/public/images/logo.svg" alt=""/> <br/> Login Now </h2>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">Email ID </label>
                <input type="email" className="form-control dv_input_field" placeholder="" required name="email" id="login-email"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="text-uppercase">Password </label>
                <input type="password" className="form-control  dv_input_field" placeholder="" required name="password" id="login-password"/>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-login btn-block float-right">Submit</button>
              </div>
              <div className="dv_register">
                Don't have account <Link to=' ' onClick={this.toggleBox}>Register</Link> here
              </div>
            </div>
            </form>
          
                </div>
         ):(
          <div className="col-md-4 login-sec">
                   <form className="login-form" id="register-form" onSubmit={this.handleSubmitRegister}>
                          <div className="dv_register_form" >
                            <h2 className="text-center"><img src="https://www.goodhand.ae/public/images/logo.svg" alt="" /> <br/> Register Now </h2>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1" className="text-uppercase">Email ID </label>
                              <input type="email" className="form-control dv_input_field" placeholder="" required name="email" id="register-email"/>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1" className="text-uppercase">Password </label>
                              <input type="password" className="form-control  dv_input_field" placeholder="" required name="password" id="register-password"/>
                            </div>
                            <div className="form-group">
                              <button type="submit" className="btn btn-login btn-block float-right">Submit</button>
                            </div>
                            <div className="dv_login">
                              have account <Link to=' ' onClick={this.toggleBox}>Login</Link> here
                            </div>
                          </div>
                                   </form>
          
                </div>

         )}
            </div>
         
    </div>
    </section>
      );
   
      
   }
}
   



    export default Login