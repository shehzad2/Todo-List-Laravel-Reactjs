    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Header from './Header'
     import Login from './Login'
    import TaskList from './TaskList'
    import AddTaskList from './AddTaskList'
    class App extends Component {
       constructor(props) {
        super(props);
        this.state = {
          TaskListData:[]
        };

         this.handleSubmitAddTaskList = this.handleSubmitAddTaskList.bind(this);
      }
       handleSubmitAddTaskList(event) {
        const current = this
        event.preventDefault();
        const form = event.target;
        const title = form.elements['title'].value;
        const description = form.elements['description'].value;
        let axiosConfig = {
            headers: {
                'x-access-token': localStorage.getItem('user-id')
            }
          };
        axios.post('https://engine-staging.viame.ae/assessment/user/task',{
        todolist: {
        title:title,
        description:description,
        status: 1
        }}, axiosConfig)
        .then(function (response) {
          $('#add_new_task').modal('hide');
          var config = {
            headers: {'x-access-token': localStorage.getItem('user-id')}
              };
              axios.get('https://engine-staging.viame.ae/assessment/user/list',config).then(response => {
             current.setState({ TaskListData: response.data });
              })
            
        })
      }
      render () {
        if( localStorage.getItem('user-email')){
        return (

          <BrowserRouter>

            <div>
              <Header />
              
              <Switch>
               <TaskList Tasks = {this.state.TaskListData} />
                <Route path='/viame/create' component={AddTaskList} />
              </Switch>
              <div className="modal fade" id="add_new_task">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h4 className="modal-title">Add New Task </h4>
                          <button type="button" className="close" data-dismiss="modal">×</button>
                      </div>
                      <div className="modal-body">
                          <form className="add-task-form"  onSubmit={this.handleSubmitAddTaskList}>
                          <div className="form-group">
                              <label htmlFor="exampleInputEmail1" className="text-uppercase">Task Name </label>
                              <input type="hidden" name="token" value={localStorage.getItem('user-id')}/>
                              <input type="text" className="form-control dv_input_field" placeholder="" name="title"  required /> 
                          </div>
                <div className="form-group">
                              <label htmlFor="exampleInputEmail1" className="text-uppercase">Task Description </label>
                              <textarea className="form-control dv_input_field" cols="30" rows="10"  name="description"  required></textarea>
                          </div> 
                          <div className="form-group">
                              <button type="submit" className="btn btn-login btn-block float-right">Submit</button>
                          </div>
                          </form>
                      </div>

                  </div>
              </div>
          </div>
            </div>
          </BrowserRouter>
        )
      }else{
        return (
          <BrowserRouter>
            <div>
              <Login />
            </div>
          </BrowserRouter>
        )
      }
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))