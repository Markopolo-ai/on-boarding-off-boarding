
import {useSelector,useDispatch} from 'react-redux'

import '../css/pagination.css' ;

import {APIService} from '../services/APIService' ;

export default function Pagination() {
    
    const dispatch    = useDispatch() ;
    
    const pagination  = useSelector( state => state.member.members ) ;

    const gotoPage    = (page) => APIService.paginate(dispatch,page) ;

    let curPage       = () => {
        let last_page = Math.ceil( pagination.count / 4 ) - 1 ;
        if (!pagination.next) return last_page ; 
        let u = new URL(pagination.next) ;
        let s = new URLSearchParams(u.search) ;
        let page = s.get('page') ;
        return page != null ? page - 2 : last_page ;  
    } ;

    return (
        
        <div className="app-pagination">

            {
                [ ...Array( Math.ceil( (pagination.count / 4) || 0 ) ) ].map( (v,idx)=> {
                    return (

                        <div className={ curPage() == idx  ? 'pagination-cur-page' : '' }  
                             key={idx}
                             onClick={ () => gotoPage(idx) } > 

                             { idx + 1 } 

                        </div>
                    )
                })
            }

        </div>
    );
}