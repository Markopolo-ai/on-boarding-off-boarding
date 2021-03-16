
import {useSelector,useDispatch} from 'react-redux'

import '../css/pagination.css' ;

import {APIService} from '../services/APIService' ;

export default function Pagination() {
    
    const dispatch    = useDispatch() ;
    
    const pagination  = useSelector( state => state.member.members ) ;

    const gotoPage    = (page) => APIService.paginate(dispatch,page) ;

    return (
        
        <div className="app-pagination">

            {
                [ ...Array( Math.ceil( (pagination.count / 4) || 0 ) ) ].map( (v,idx)=> {
                    return (

                        <div key={idx} onClick={ () => gotoPage(idx) } > { idx + 1 } </div>
                    )
                })
            }

        </div>
    );
}