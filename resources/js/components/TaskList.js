import CircularJSON from 'circular-json'
import axios from 'axios'
    import React, { Component } from 'react'
    import { Link } from 'react-router-dom'
    class TaskList extends Component {
      constructor (props) {
        super(props)
        this.state = {
          Tasks: [],
        }
      }
      ajaxCallFunction(){
        var config = {
            headers: {'x-access-token': localStorage.getItem('user-id')}
        
        };
        axios.get('https://engine-staging.viame.ae/assessment/user/list',config).then(dataresponse => {
        this.setState({
            Tasks: dataresponse.data
        })
      })
    }
       changeStatus(index,data_id,title,description) {
        var current = this;
        var config = {
            headers: {'x-access-token': localStorage.getItem('user-id')}
        };
        if(index == 0){
          axios.delete('https://engine-staging.viame.ae/assessment/user/task/'+data_id,config).then(response => {
            this.ajaxCallFunction();
          })
        }else{
           axios.put('https://engine-staging.viame.ae/assessment/user/task/'+data_id,
            {
              todolist: {
              title: title,
              description:description,
              status: index 
              }
            }
            ,config).then(response => {
              this.ajaxCallFunction();
          })
        }
        
    }
      componentDidMount () {
        var config = {
            headers: {'x-access-token': localStorage.getItem('user-id')}
        };
        axios.get('https://engine-staging.viame.ae/assessment/user/list',config).then(response => {
        this.setState({
            Tasks: response.data
          })
        })
      }
      render () {
         let  Tasks = [];
        if(this.props.Tasks != ''){
            Tasks = this.props.Tasks
        }else if(this.state.Tasks){
            Tasks = this.state.Tasks
        }
    return (
    <div className="dv_table_wrapper">
        <div className="container">
            <div className="table-responsive">
                <table className="table table-bordered dv_task_table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Description </th>
                            <th>Status </th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    <tbody id="add-table">
                         { (Tasks !='') ? (

                            Tasks.map(task => (
                        <tr >
                            <td key={task._id+'_title'}>{task.title}</td>
                            <td key={task._id+'_description'}>{task.description}</td>
                            <td key={task._id+'_status'} id={task._id}>
                            {
                               (task.status == 1) ? (
                                    <span className="dv_working_task" >  Created </span>
                                ):''
                            }
                             {
                            (task.status == 2) ? (
                                <span className="dv_finish_task" > Finish </span>
                            ):''}
                              {(task.status == 3) ? (
                                <span className="dv_working_task" >Working</span>
                             ):''}
                            {(task.status == 4) ? (
                            <span className="dv_cancel_task" >Cancel</span>
                            ):''}
                            {(task.status == 0) ? (
                            <span className="dv_delete_task" >Delete</span>  
                            ):''}
                           </td>
                            <td key={task._id+'_status_select'}>
                                <div className="dropdown">
                                    <Link className="dropdown-toggle" data-toggle="dropdown" to=' '>
                                View
                              </Link>
                                    <div className="dropdown-menu dv_table_action_dropdown">
                                        <a className="dropdown-item" href='#'  onClick={() => this.changeStatus('2', task._id,task.title,task.description)}>Finish </a>
                                        <Link className="dropdown-item" to=' '  onClick={() => this.changeStatus('3', task._id,task.title,task.description)}>Working </Link>
                                        <Link className="dropdown-item"  to=' ' onClick={() => this.changeStatus('4', task._id,task.title,task.description)}>Cancel </Link>
                                        <Link className="dropdown-item" to=' '  onClick={() => this.changeStatus('0', task._id,task.title,task.description)}>Delete </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        ))):(
                          <tr >
                          <td className="text-center center-block" colSpan="4">Empty Data</td>
                          </tr>
                         )}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
        )
       
        
      }
    }

    export default TaskList