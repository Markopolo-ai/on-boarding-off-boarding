

import Header from '../component/Header' ;
import DataTable from '../component/DataTable' ;
import AppInput from '../component/AppInput' ;
import Pagination from '../component/Pagination' ;

import '../css/datatable.css' ;

function Dashboard() {

    return (
        <div>
            
            <Header/>

            <AppInput/>

            <DataTable/>
            
            <Pagination/>
            
        </div>
    ) ;
}

export default Dashboard ;