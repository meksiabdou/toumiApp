import logo from "./logo.svg";
import "./App.css";
import data from "../src/data/data.json";
import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [dataPone, setDataPhone] = useState(data);

  const [minPrix, setMinPrix] = useState("");

  const [maxPrix, setMaxPrix] = useState("");

  const [name, setName] = useState("");

  const getNumberFromString = (string) => {
    try {
      string = string.replace(/([a-zA-Z,()%].*)/g, "").trim();
      const number = Number(string);
      if (number && number !== NaN) {
        return number;
      }
      return string;
    } catch (error) {
      //console.log(error);
      return string;
    }
  };

  const escapeRegExp = (string) => {
    if (string) {
      return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
  };

  const onSubmit = () => {
    let newData = [];

    if (name && maxPrix && minPrix) {
      const regExp = new RegExp(
        `${escapeRegExp(name.toLocaleLowerCase())}`,
        "g"
      );

      newData = dataPone.filter((item) => {
        if (item.prix && item.nom) {
          const prix = getNumberFromString(item.prix);
          const _minPrix = getNumberFromString(minPrix);
          const _maxPrix = getNumberFromString(maxPrix);

          if (
            Array.isArray(item.nom.toLocaleLowerCase().match(regExp)) &&
            _minPrix <= prix &&
            _maxPrix >= prix
          ) {
            return true;
          }
        }
        return false;
      });
    }

    setDataPhone(newData);
  };

  useEffect(() => {
    setDataPhone(data);
  }, []);

  return (
    <div className=" bg-gray-50 h-full w-full overflow-x-hidden ">
      <div className=" bg-white  w-full h-16 fixed shadow-md flex items-center justify-center text-boald font-bold z-50	 ">
        <h1 className="">Moteur de recherche produit</h1>
      </div>

      <div className="grid grid-cols-4  w-full h-screen pt-16 flex-row ">
        <div className=" w-80 h-full fixed p-6 bg-gray-200">
          <div className="w-full mb-6">
            <label className="mb-5 text-base text-gray-600 ">
              Recherche par nom {name}
            </label>
            <input
              onKeyUp={(e) => {
                setName(e.target.value);
              }}
              placeholder="Recherche par nom"
              className="w-full h-12 rounded-sm p-5 mt-3"
            />
          </div>

          <div className="w-full mb-6">
            <label className="mb-5 text-base text-gray-600 ">
              Prix à partir de {minPrix === 0 ? "5000 Da" : minPrix + " Da"}
            </label>
            <input
              placeholder="Prix à partir de"
              onKeyUp={(e) => {
                setMinPrix(e.target.value);
              }}
              className="w-full h-12 rounded-sm p-5 mt-3"
              type="number"
            />
          </div>

          <div className="w-full mb-6">
            <label className="mb-5 text-base text-gray-600 ">
              Prix jusqu'à {maxPrix === 0 ? maxPrix : maxPrix + " Da"}
            </label>
            <input
              placeholder="Prix jusqu'à "
              onKeyUp={(e) => {
                setMaxPrix(e.target.value);
              }}
              className="w-full w-full h-12 rounded-sm p-5 mt-3"
              type="number"
            />
          </div>

          <div className="w-full mb-6">
            <button
              className="w-full w-full h-12 rounded-sm mt-3 bg-blue-200"
              onSubmit={onSubmit}
            >
              Trouver
            </button>
          </div>
        </div>

        <div className="col-span-3 gap-8 w-screen m-0 pl-80	grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 md:grid-cols-1 2xl:grid-cols-4  pt-40 ">
          {dataPone.map((item, key) => {
            return (
              <div
                key={key}
                className=" m-5 flex justify-center flex-col items-center  "
              >
                <div className="w-72 shadow-md rounded-md flex justify-center flex-col bg-white overflow-hidden">
                  <img
                    className="w-full mb-5 h-72"
                    src={
                      item.image_urls
                        ? item.image_urls.split(",").length > 1
                          ? item.image_urls.split(",")[0]
                          : item.image_urls
                        : "/image.png"
                    }
                  />
                  <a className="m-5 mb-2" key={key}>
                    {item.nom}
                  </a>

                  <div className=" grid grid-cols-4 p-5 gap-3 ">
                    <div className=" h-10 text-center text-white rounded-lg bg-green-600 flex items-center justify-center col-span-2  ">
                      {item.marque ? item.marque : item.nom.split(" ")[0]}
                    </div>

                    <div className=" h-10  bg-purple-700   rounded-lg  text-center flex items-center justify-center  col-span-2  text-white  ">
                      {item.prix.split(" ")[0]} Da
                    </div>

                    <div
                      className={`h-10  ${
                        item.url.includes("ouedkniss")
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }   rounded-lg  text-center flex items-center justify-center  col-span-4   text-white `}
                    >
                      {item.url.includes("ouedkniss") ? "Ouedkniss" : "jumia"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
