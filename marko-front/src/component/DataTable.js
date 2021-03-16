
import React , {useEffect} from 'react' ;
import { useSelector , useDispatch } from "react-redux" ;
import { useHistory } from 'react-router-dom' ;
import { APIService } from '../services/APIService' ;
import { useAlert } from 'react-alert' ;

export default function DataTable() {

    const dispatch = useDispatch() ;

    const myAlert  = useAlert() ;

    const history  = useHistory()  ;

    let members = useSelector( state => state.member.members.results )  || [] 

    useEffect( () => { APIService.getMembers(dispatch) } , [])

    const removeMember = (id) => {
         APIService.removeMember(dispatch,id,myAlert) ;
    }

    return (
        <div className="app-data-table" >
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">Date Added</th> */}
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {   
                        members.map( (member,key) => (
                            // <div>  {JSON.stringify(member)} </div>
                            <tr key={key} >
                                <td> {member.id} </td>
                                <td> {member.email} </td>
                                <td> 
                                    <i className="fa fa-trash" 
                                       onClick={()=> removeMember(member.id)} >
                                    </i>
                                    <i className="fa fa-eye"
                                       onClick={ () => history.push(`/detail/${member.id}`) } ></i>
                                </td>
                            </tr>
                        ) )
                    }
                    
                </tbody>
                </table>    
                
        </div>
    ) ;
}