import { useContext } from "react";
import "./FormModal.css";
import { DetailsContext } from "../../context/DetailsContext/DetailsContext";
import { DetailContext } from "../../context/DetailContext/DetailContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ADD_DETAIL,
  EDIT_DETAIL,
} from "../../reducers/DetailsReducer/actionTypes";

function FormModal({ handleModalVisibility, showModal }) {
  const { state: userDetails, dispatch } = useContext(DetailsContext);
  const { userDetail, setUserDetail } = useContext(DetailContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetail((prevUserDetail) => ({
      ...prevUserDetail,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!userDetail.name) {
      toast("Username is required");
      return false;
    } else if (!userDetail.contactNumber) {
      toast("Mobile Number is required");
      return false;
    } else if (!userDetail.email) {
      toast("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(userDetail.email)) {
      toast("Invalid email format");
      return false;
    } else if (!userDetail.hobbies) {
      toast("Hobbies are required");
      return false;
    }
    return true;
  };

  const addUserDetails = async () => {
    if (validateForm()) {
      axios
        .post("/add", userDetail)
        .then(({ id }) =>
          dispatch({ type: ADD_DETAIL, payload: { ...userDetail, id } })
        )
        .catch((error) => console.log(error.message));
      handleModalVisibility("");
    }
  };

  const editUserDetails = async () => {
    if (validateForm()) {
      axios
        .put(`/edit/${userDetail._id}`, userDetail)
        .then(() => dispatch({ type: EDIT_DETAIL, payload: userDetail }))
        .catch((error) => console.log(error.message));
      handleModalVisibility("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showModal === "CREATE") {
      addUserDetails();
    } else if (showModal === "UPDATE") {
      editUserDetails();
    }
  };

  return (
    <div className="form__modal">
      <form className="form__container" onSubmit={handleSubmit}>
        <div className="form__details__container">
          <label>Username</label>
          <input
            name="name"
            value={userDetail.name}
            onChange={handleInputChange}
            placeholder="John Doe"
          />

          <label>Mobile Number</label>
          <input
            type="number"
            name="contactNumber"
            value={userDetail.contactNumber}
            onChange={handleInputChange}
            placeholder="9293991493"
          />

          <label>Email</label>
          <input
            name="email"
            value={userDetail.email}
            onChange={handleInputChange}
            placeholder="johndoe1988@gmail.com"
          />

          <label>Hobbies</label>
          <input
            name="hobbies"
            value={userDetail.hobbies}
            onChange={handleInputChange}
            placeholder="football singing golf"
            multiple
            size="10"
          />
        </div>
        <div className="form__btn__container">
          <button onClick={handleModalVisibility}>
            <i className="fi fi-rr-circle-xmark"></i>CLOSE
          </button>
          {showModal === "CREATE" ? (
            <button type="submit">
              <i className="fi fi-rr-disk"></i>SAVE
            </button>
          ) : (
            <></>
          )}
          {showModal === "UPDATE" ? (
            <button type="submit">
              <i className="fi fi-rr-disk"></i>UPDATE
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormModal;
