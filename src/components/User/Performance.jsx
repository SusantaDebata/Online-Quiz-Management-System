import { useEffect, useReducer } from 'react';
import UserNavbar from '../Navbar/UserNavbar';
import './Style/Performance.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { GetPerformancebyuid } from '../../Services/PerformanceService';

const initialState = {
  performance: [],
  loading: true,
  error: null,
};

const performanceReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...initialState };
    case 'FETCH_SUCCESS':
      return { ...state, performance: action.payload, loading: false };
    case 'FETCH_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error();
  }
};

const Performance = () => {
  const uid = window.sessionStorage.getItem('user');
  const [state, dispatch] = useReducer(performanceReducer, initialState);

  useEffect(() => {
    fetchperformance();
  }, []);

  const fetchperformance = async () => {
    try {
      dispatch({ type: 'FETCH_INIT' });
      const res = await GetPerformancebyuid(uid);
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message });
    }
  };

  console.log('Reducer:', state);

  const valueFormatter = (value) => `${value}%`;

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  const tech = [
    {
      percent: state.performance.ctech,
      tech: 'C'
    },
    {
      percent: state.performance.cpptech,
      tech: 'C++'
    },
    {
      percent: state.performance.cshtech,
      tech: 'C#'
    },
    {
      percent: state.performance.javatech,
      tech: 'Java'
    },
    {
      percent: state.performance.dotnettech,
      tech: 'Dotnet'
    },
    {
      percent: state.performance.pythontech,
      tech: 'Python'
    },
    {
      percent: state.performance.jstech,
      tech: 'Javascript'
    },
    {
      percent: state.performance.reacttech,
      tech: 'React'
    },
    {
      percent: state.performance.angulartech,
      tech: 'Angular'
    }
  ];

  const colorRange = (value) => {
    if (value < 50) {
      return 'red';
    } else if (value < 80) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="chart">
        <BarChart
          dataset={tech}
          xAxis={[{ scaleType: 'band', dataKey: 'tech' }]}
          series={[
            {
              dataKey: 'percent',
              label: 'percent',
              valueFormatter,
              colors: (value) => colorRange(value),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Performance;
