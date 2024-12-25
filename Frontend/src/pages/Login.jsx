import { useGetAuth } from "../stores/useGetAuth";
import { Controller, useForm } from "react-hook-form";
import { useLoaderStore } from "../stores/useLoaderStore";
import { useEffect } from "react";
import { useSocketStore } from "../stores/useSocketStore";

export const Login = () => {

  // const { socket, auth } = useGetAuth();
  const { socket } = useSocketStore();
  const { control, handleSubmit } = useForm();
  const { setLoading } = useLoaderStore();

  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = (data) => {
    socket.emit('inicio-sesion', data);
    socket.on('inicio-sesion', (isAuthenticated) => {
      console.log(isAuthenticated)
      if (!isAuthenticated) {
        alert('Algun dato es incorrecto');
        return;
      }
      sessionStorage.setItem('isAuth', true);
      // setAuth(true);
      window.location.href = '/home';
    });
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-[url('./assets/background.jpg')]">
        <form className="flex flex-col border bg-white border-b-gray-950 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <div className="m-6 flex flex-col items-center justify-center">
            <div className="bg-white size-16 rounded-full bg-cover bg-[url('./assets/user.svg')]"></div>
            <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1>
          </div>
          <div className="m-6">
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <Controller
              name="subname"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-gray-300 py-3 px-4 rounded-lg focus:border-green-700 outline-none focus:ring-1 focus:ring-green-700"
                  type="text"
                  placeholder="Ingresar usuario"
                />
              )}
            />
          </div>
          <div className="m-6">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-gray-300 py-3 px-4 rounded-lg focus:border-green-700 outline-none focus:ring-1 focus:ring-green-700"
                  type="password"
                />
              )}
            />
          </div>
          <div className="m-6">
            <button type="submit" className="w-full bg-green-700 hover:bg-green-700 text-white font-medium py-3 rounded-lg">
              Ingresar
            </button>
          </div>
          <div className="m-6 text-center">
            <a href="#" className="text-gray-600 hover:text-gray-800 underline decoration-solid">Olvide mi contraseña</a>
          </div>
        </form>
      </div>
    </>
  );
};
