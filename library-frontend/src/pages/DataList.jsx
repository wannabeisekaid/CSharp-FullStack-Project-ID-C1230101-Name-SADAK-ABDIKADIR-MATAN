import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DataList() {
  const { table } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // load table data
  useEffect(() => {
    fetchData();
    setSelectedId(null);
    setSearch(''); // clear search box
  }, [table]);

  // fetch from api
  const fetchData = async () => {
    try {
      const res = await axios.get(`https://localhost:7066/api/${table}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // execute search filter
  const doSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      fetchData();
      return;
    }
    try {
      const res = await axios.get(`https://localhost:7066/api/${table}/search/${search}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // get row id
  const getId = (item) => {
    const idKey = Object.keys(item).find(key => key.toLowerCase().includes('id'));
    return item[idKey];
  };

  // dynamic placeholder text
  const getPlaceholder = () => {
    if (table === 'Books') return "Search Title...";
    return "Search Name...";
  };

  // row actions
  const goAdd = () => nav(`/${table}/add`);
  
  const goEdit = () => {
    if (!selectedId) return alert("Select row first");
    nav(`/${table}/edit/${selectedId}`);
  };
  
  const goDelete = () => {
    if (!selectedId) return alert("Select row first");
    nav(`/${table}/delete/${selectedId}`);
  };

  return (
    <div>
      <h2 className="text-capitalize">{table} Inventory</h2>
      
      {/* top controls */}
      <div className="d-flex justify-content-between bg-light p-3 border rounded mb-3">
        <div>
          <button onClick={goAdd} className="btn btn-success me-2">Add New</button>
          <button onClick={goEdit} className="btn btn-warning me-2">Edit Selected</button>
          <button onClick={goDelete} className="btn btn-danger">Delete Selected</button>
        </div>
        
        {/* search input */}
        <form onSubmit={doSearch} className="d-flex">
          <input 
            type="text" 
            className="form-control me-2" 
            placeholder={getPlaceholder()}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>

      {/* dynamic table */}
      {data.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="text-capitalize">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const rowId = getId(row);
              const isSelected = selectedId === rowId;
              
              return (
                <tr 
                  key={index} 
                  onClick={() => setSelectedId(rowId)}
                  className={isSelected ? "table-primary" : ""}
                  style={{ cursor: "pointer" }}
                >
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{typeof val === 'object' ? 'Data' : val}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  );
}

export default DataList;