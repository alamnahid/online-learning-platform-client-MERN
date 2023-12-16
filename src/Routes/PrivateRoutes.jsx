import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation()

    if(user){
        return children;
    }
    if(loading){
        return <Loading/>
    }
    return <Navigate to='/login' state={{form: location}}></Navigate> 
};

export default PrivateRoutes;