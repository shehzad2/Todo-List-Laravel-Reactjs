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
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

        for (let name of data.keys()) {
          const input = form.elements[name];
          const parserName = input.dataset.parse;

          if (parserName) {
            const parser = inputParsers[parserName];
            const parsedValue = parser(data.get(name));
            data.set(name, parsedValue);
          }
        }
         fetch('/viame/api/save-add-task', {
          method: 'POST',
          body: data,
        }).then(response => response.json())
           .then(data => {
           $('#add_new_task').modal('hide');
            this.setState({ TaskListData: data });
          });
      }
 /*<Route exact path='/viame/' component={TaskList} />*/
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