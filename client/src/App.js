import { useContext, useState, useRef } from "react";
import "./App.css";
import DetailsTable from "./components/DetailsTable/DetailsTable";
import FormModal from "./components/FormModal/FormModal";
import { DetailContext } from "./context/DetailContext/DetailContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [showModal, setShowModal] = useState("");
  const { setUserDetail } = useContext(DetailContext);

  const senderRef = useRef(null);

  const handleModalVisibility = (mode) => {
    setUserDetail({
      name: "",
      contactNumber: "",
      email: "",
      hobbies: "",
    });
    setShowModal(mode);
  };

  return (
    <div className="App">
      <div className={`${!showModal && "modal__container__inactive"}`}>
        {(showModal === "UPDATE" || showModal === "CREATE") && (
          <FormModal
            showModal={showModal}
            handleModalVisibility={handleModalVisibility}
          />
        )}
      </div>
      <div className="primary__container">
        <div className="table__container">
          <DetailsTable
            ref={senderRef}
            handleModalVisibility={handleModalVisibility}
          />
        </div>
        <div className="btn__container">
          <button onClick={() => senderRef.current.sendSelectedData()}>
            <i className="fi fi-rs-paper-plane"></i>
            SEND
          </button>
          <button onClick={() => handleModalVisibility("CREATE")}>
            <i className="fi fi-rr-square-plus"></i>
            ADD
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
