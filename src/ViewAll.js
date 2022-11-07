import Api from './Api'
import {useNavigate} from "react-router-dom";

const ViewAll = ()  => {
    const navigate = useNavigate()

    return (

        <Api render_type='view_all' navigation={navigate}/>

    )
};

export default ViewAll;