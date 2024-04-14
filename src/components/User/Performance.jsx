import { useEffect, useState } from 'react';
import UserNavbar from '../Navbar/UserNavbar';
import './Style/Performance.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { GetPerformancebyuid } from '../../Services/PerformanceService';

const Performance = () => {
const uid = window.sessionStorage.getItem('user');
const [performance, setPerformance] = useState([]);

useEffect(() => {
  fetchperformance();
},[]);

const fetchperformance = async() =>{
  try{
    const res = await GetPerformancebyuid(uid);
    setPerformance(res.data);
    console.log(performance);
  }catch(err){
    console.log(err);
  }
}

  const tech = [
    {
      percent: 20,
      tech: 'C'
    },
    {
      percent: 50,
      tech: 'C++'
    },
    {
      percent: 63,
      tech: 'C#'
    },
    {
      percent: 95,
      tech: 'Java'
    },
    {
      percent: 36,
      tech: 'Dotnet'
    },
    {
      percent: 86,
      tech: 'Python'
    },
    {
      percent: 75,
      tech: 'Javascript'
    },
    {
      percent: 68,
      tech: 'React'
    },
    {
      percent: 72,
      tech: 'Angular'
    }
  ]

  const valueFormatter = (value) => `${value}%`;

  return (
    <div>
      <UserNavbar />
      <div className="chart">
        <BarChart
          dataset={tech}
          xAxis={[{ scaleType: 'band', dataKey: 'tech' }]}
          series={[
            { dataKey: 'percent', label: 'percent', valueFormatter },
          ]}
          />
      </div>
    </div>
  )
}

export default Performance
