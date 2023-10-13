import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart } from 'recharts';
import { useSelector } from 'react-redux';
import CreateAdminInstance from '../../../Axios/adminAxios'







const colors = ['#8884d8', '#82ca9d']; // Define your custom colors here

function LineChartComponent() {

  const [suce, setSuc] = useState(1);

  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [dataForChart, setDataForChart] = useState([]);
  const adminAxios = CreateAdminInstance()
  



  const usersAndpros = async () => {
    try {
      const response = await adminAxios.get('/usersAndpros');
      setPros(response.data.pros);
      setUsers(response.data.users);
        } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };
  

  useEffect(() => {
    usersAndpros();
  }, [suce]);
   console.log(users,'users');
   console.log(pros,'pros');
   function prepareDataForLineChart(users, pros) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
  
    const data = months.map((month) => {
      const userCount = users.filter((user) =>
        new Date(user.updatedAt).toLocaleString('default', { month: 'short' }) === month
      ).length;
  
      const proCount = pros.filter((pro) =>
        new Date(pro.updatedAt).toLocaleString('default', { month: 'short' }) === month
      ).length;
  
      return { name: month, users: userCount, pros: proCount };
    });
  
    return data;
  }
  

   useEffect(() => {
    
    const chartData = prepareDataForLineChart(users, pros);
    setDataForChart(chartData);
  }, [users, pros]);

  
  return (
    <>
      <LineChart width={900} height={300} data={dataForChart}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" name="Users" stroke={colors[0]} />
        <Line type="monotone" dataKey="pros" name="Pros" stroke={colors[1]} />
      </LineChart>
    </>
  );
}

export default LineChartComponent;
