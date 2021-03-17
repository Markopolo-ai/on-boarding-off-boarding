import React, {Component} from 'react';

class User_list extends Component {

    state= {
         emailList :JSON.parse(localStorage.getItem('mail_list')) || ['emails']
    }


  render() {
    

    const { emails } = this.props;
    const  emailList2  = this.state.emailList.map(mail => {
      
            return (

                      <div className="container">
                        <div className="row">
                          <div className="col-3">
                          <li> <b>{ mail } </b></li>
                          </div>
                          <div className="col-sm">
                          <button className="btn btn-outline-secondary" type="submit" value="give" onClick={()=>{this.props.giveAccess(mail)}}>Give Access</button>
                          <button className="btn btn-outline-secondary" type="submit" value="remove" onClick={()=>{this.props.removeAccess(mail)}}>Remove Access</button>
                          </div>
                        </div>
                      </div>

                // <li>
                //    <b className='mailList'> { mail } </b>
                //     <button className="btn btn-outline-secondary" type="submit" value="give">Give Access</button>
                //     <button className="btn btn-outline-secondary" type="submit" value="remove">Remove Access</button>
                // </li>

            )
        }
    )
  return (
    <div>

    <h3>Emails List:</h3>
    {emailList2} 

    </div>
  );
}
}
export default User_list;