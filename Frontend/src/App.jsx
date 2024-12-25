import { Loader } from "./components/Loader"
import { ModalCustom } from "./components/ModalCustom"
import { AppRouter } from "./router/AppRouter"

function App() {


  return (
    <>
     
      <Loader />
      <ModalCustom />
      <AppRouter/>

    </>
  )
}

export default App
