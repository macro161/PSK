import React from 'react';
import '../../css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const Stats = () => {

    return (
        <div>
            <Button/>
            <h1>STATISTIKA</h1>
            <table className="table table-bordered table-pad">
            <tbody>
                <tr>
                    <td>Daugiausiai kelionių buvo į</td>
                    <td>Vilnius</td>
                </tr>
                <tr>
                    <td>Brangiausia kelionė buvo į</td>
                    <td>Vilnius</td>
                </tr>
                <tr>
                    <td>Pigiausia kelionė buvo į</td>
                    <td>Vilnius</td>
                </tr>
                <tr>
                    <td>Trumpiausė kelionė buvo į</td>
                    <td>Vilnius</td>
                </tr>
                <tr>
                    <td>Ilgiausia kelionė buvo</td>
                    <td>Vilnius</td>
                </tr>
                <tr>
                    <td>Kiek kartu keliavo <input type="text" name="vardas" /></td>
                    <td>Vilnius</td>
                </tr>
                </tbody>
            </table>

            <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>;
            
            

            <table className="table table-bordered table-pad">
                <tr>
                    <td>Kiek kelionių įvyko nuo: </td>
                    <td>
                        <input type="date" id="start" name="trip-start" value="2018-07-22"min="2018-01-01" max="2018-12-31"/>
                    </td>
                    <td>Iki </td>
                    <td><input type="date" id="start" name="trip-start" value="2018-07-22"min="2018-01-01" max="2018-12-31"/></td>
                    <td>100</td>


                </tr>
            </table>
            <div class="container">        
                    <button type="button" class="btn btn-primary btn-info">Export as PDF</button>
                    <button type="button" class="btn btn-primary btn-info">Export as JPG</button>
                    <button type="button" class="btn btn-primary btn-info">Visualize statistics</button>
            </div>

        </div>
    );
};

export default Stats;