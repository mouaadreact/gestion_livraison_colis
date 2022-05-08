import React,{useState,useEffect} from 'react'
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../Dashboard.css';
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


function ChartClient() {
 const [command,setCommand]=useState([]);
 const [labels,setLabels] = useState([]);

    useEffect(()=>{
        async  function fetchData(){
            await axios
            .get(`${process.env.REACT_APP_API_URL}api/user/Client/CommandPerClient`)
            .then((res)=>{
                if(res!==undefined){
                  console.log(res.data)
                setLabels(res.data.map(e => e._id));
                setCommand(res.data.map(e => e.total)) 
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
      label: 'Dataset 1',
      data: labels.map((index,e)=>{return command[e]}),
      backgroundColor: [ 
        '#1de9b6',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        '#1de9b6',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

  return (
      <>
        <div className="row">
                        <div className="col-lg-7 col-xl-8">
                            <div className="card shadow mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h6 style={{fontFamily:"cursive",fontWeight:"bold",color:"#e83e8c",fontSize:"14px"}}>Client Histogramme&nbsp;</h6>
                                    <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i className="fas fa-ellipsis-v text-gray-400"></i></button>
                                        <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                                            <p className="text-center dropdown-header">dropdown header:</p><a className="dropdown-item" href="#">&nbsp;Action</a><a className="dropdown-item" href="#">&nbsp;Another action</a>
                                            <div className="dropdown-divider"></div><a className="dropdown-item" href="#">&nbsp;Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                    <Bar options={options_bar} data={data_bar} height={100}/>;
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
    </>
  )
}

export default ChartClient