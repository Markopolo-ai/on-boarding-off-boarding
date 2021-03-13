
import { useSelector , useDispatch } from "react-redux" ;
import {useEffect} from 'react' ;
import {addN} from "../redux/store"

function Test() {
    
    const count = useSelector ( state => state.counter.count )  ;
    
    const userList = useSelector( state => state.counter.list ) ;
    
    const dispatch = useDispatch() ;

    useEffect( () => foo(dispatch) );
    
    return (

        <div className="test-class">
            <h1> This is a test Component </h1>
            <h2> count is : { JSON.stringify(count)} </h2>
            <button onClick={ () => dispatch( { type: 'INC' } ) } > inc </button>
            <button onClick={ () => dispatch( { type: 'DEC' } ) } > dec </button>
            <button onClick={ () => dispatch( addN(2) ) } > add 2 </button>
            <button onClick={ () => foo(dispatch) } > get list </button>

            {/* {JSON.stringify(userList)} */}

            {   userList.length ?
                userList.map( user => {
                   return  <div key={user.id}> {user.title} </div>
                } ) :
                <div>Nothing to see </div>
            }


        </div>
    );
}

function foo (dispatch) {

    fetch('https://jsonplaceholder.typicode.com/todos')
    .then( response => response.json())
    .then( function(json) {

        dispatch({
            type : 'GET_LIST' ,
            payload : {
                list : json 
            }
        })

    } ) ;
}

export default Test ;