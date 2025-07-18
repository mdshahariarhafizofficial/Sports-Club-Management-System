import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import Loader from '../../Loading/Loader';
import AdminProfile from '../AdminProfile/AdminProfile';
import MyProfile from '../MyProfile/MyProfile';

const DashboardHome = () => {
    const {role, roleLoading} = useUserRole();

    if (roleLoading) {
        return <Loader></Loader>
    }
    if (role === 'admin') {
    return <AdminProfile />;
  }

  return <MyProfile />;
};

export default DashboardHome;