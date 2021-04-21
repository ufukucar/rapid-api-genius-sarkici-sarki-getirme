import React, { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [sonuc, setSonuc] = useState([]);

  useEffect(() => {
    const data = { q: "Kendrick Lamar" };

    // axios
    //   .get("https://genius.p.rapidapi.com/search/", {
    //     headers: {
    //       "x-rapidapi-key":
    //         "6507574abdmshab42c6c21e5af52p1c00e8jsne7e4e372dcc6",
    //       "x-rapidapi-host": "genius.p.rapidapi.com",
    //     },
    //     params: data,
    //   })
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Lütfen bir şarkıcı adı yazınız!");
      return;
    }

    let data = { q: "Kendrick Lamar" };
    const sonuc = axios
      .get("https://genius.p.rapidapi.com/search/", {
        headers: {
          "x-rapidapi-key":
            "6507574abdmshab42c6c21e5af52p1c00e8jsne7e4e372dcc6",
          "x-rapidapi-host": "genius.p.rapidapi.com",
        },

        params: {
          q: name,
        },
      })
      .then((res) => {
        console.log(res.data.response.hits);
        setSonuc(res.data.response.hits);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form className="mt-5" onSubmit={handleOnSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Ara bakalım
              </button>
            </form>
          </div>
        </div>

        {/** New row */}
        <div className="row mt-5">
          <h2>Sonuçlar</h2> <br />
        </div>
        <div className="row mt-5">
          {sonuc.map((item, index) => (
            <div className="col-lg-4 mb-4" key={index}>
              <div className="card">
                <img
                  src={item.result.header_image_thumbnail_url}
                  className="card-img-top"
                  alt={item.result.full_title}
                  style={{ height: "250px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.result.full_title}</h5>
                  <p className="card-text">
                    {item.result.header_image_thumbnail_url}
                  </p>
                  <button href="#" className="btn btn-primary">
                    Sözleri Görüntüle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
