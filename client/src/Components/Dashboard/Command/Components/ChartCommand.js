import React, { useEffect, useState } from 'react'
import '../../Dashboard.css';
import '../../assets/bootstrap/css/bootstrap.min.css';
import './Command.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
     ArcElement 
  } from 'chart.js';
  import { Bar,Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement 
  );


function Charts() {

    const [command,setCommand]=useState([]);
 const [labels,setLabels] = useState([]);

    useEffect(()=>{
        async  function fetchData(){
            await axios
            .get(`${process.env.REACT_APP_API_URL}api/user/Command/CommandPerMonth`)
            .then((res)=>{
                if(res!==undefined){
                 setLabels(res.data.result.map(e => e.month));
                setCommand(res.data.result.map(e => e.command))
                }
            })
            .catch((err)=>console.log(err));
    };
    fetchData();},[]);


    const options_bar = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };

      

 const data_bar = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map((index,e)=>{return command[e]}),
      backgroundColor: '#42a5f5',
    }
  ],
};


const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 2',
      data: labels.map((index,e)=>{return command[e]}),
      backgroundColor: [
        'rgba(153, 102, 255, 1) ',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        '#7986cb',
        '#388e3c',
        '#880e4f',
        '#dd2c00',
        '#bdbdbd',
        '#607d8b'


      ],
      borderColor: [
        'rgba(153, 102, 255, 1) ',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        '#7986cb',
        '#388e3c',
        '#880e4f',
        '#dd2c00',
        '#bdbdbd',
        '#607d8b'
      ],
      borderWidth: 1,
    },
  ],
};
  return (
    <div> 

<div className="row">
                        <div className="col-lg-7 col-xl-8">
                            <div className="card shadow mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h6 className="h_command">Client Histogramme&nbsp;</h6>
                                    <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i className="fas fa-ellipsis-v text-gray-400"></i></button>
                                        <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                                            <p className="text-center dropdown-header">dropdown header:</p><a className="dropdown-item" href="#">&nbsp;Action</a><a className="dropdown-item" href="#">&nbsp;Another action</a>
                                            <div className="dropdown-divider"></div><a className="dropdown-item" href="#">&nbsp;Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                    <Bar options={options_bar} data={data_bar} height={100}/> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-xl-4">
                            <div className="card shadow mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h6 className="text-primary fw-bold m-0"></h6>
                                    <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i className="fas fa-ellipsis-v text-gray-400"></i></button>
                                        <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                                            <p className="text-center dropdown-header">dropdown header:</p><a className="dropdown-item" href="#">&nbsp;Action</a><a className="dropdown-item" href="#">&nbsp;Another action</a>
                                            <div className="dropdown-divider"></div><a className="dropdown-item" href="#">&nbsp;Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                    <Pie data={data} height={100}/> 
                                    </div>
                                    <div className="text-center small mt-4"><span className="me-2"><i className="fas fa-circle text-primary"></i>&nbsp;Direct</span><span className="me-2"><i className="fas fa-circle text-success"></i>&nbsp;Social</span><span className="me-2"><i className="fas fa-circle text-info"></i>&nbsp;Refferal</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

    </div>
  )
}

export default Charts