import React from 'react';
import '../../css/bootstrap.css';
import '../../css/bootstrap.min.css';
import '../../styles.css';

const Stats = () => {
  
  return (
    <table className="table table-bordered table-pad">
        <caption>Statistika</caption>
        <tr>
            <td>Daugiausiai kelionių buvo į</td>
            <td>vilnius</td>
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
</table>
  );
};

export default Stats;