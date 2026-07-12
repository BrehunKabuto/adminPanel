import { Navigate } from 'react-router-dom';
import { tokenService } from '../shared/lib/tokenService';
import { useRole } from '../features/user/model/useRole';
import { UserRoles } from '../shared/types/UserRoles.enum';


export const HomePage = () => {
  const token = tokenService.get()
  const {myRole} = useRole()

  if (token) {
    
    if(myRole === UserRoles.ADMIN){
        return <Navigate to="/dashboard" />
    }
    else{
        return <Navigate to="order/all" />
    }
  }
  else{
    <Navigate to='/auth/login' />
  }

}