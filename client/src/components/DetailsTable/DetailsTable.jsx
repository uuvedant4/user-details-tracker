import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import "./DetailsTable.css";
import { DetailsContext } from "../../context/DetailsContext/DetailsContext";
import { DetailContext } from "../../context/DetailContext/DetailContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RevolvingDot } from "react-loader-spinner";

const DetailsTable = forwardRef(function DetailsTable(props, senderRef) {
  const { state: userDetails, dispatch } = useContext(DetailsContext);
  const { setUserDetail } = useContext(DetailContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const { handleModalVisibility } = props;
  const [loading, setLoading] = useState(false);

  const handleEditDetail = (userDetail) => {
    handleModalVisibility("UPDATE");
    setUserDetail(userDetail);
  };

  const handleDeleteDetail = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then(() => dispatch({ type: "DELETE_DETAIL", payload: id }))
      .catch((error) => console.log(error.message));
  };

  const handleRowSelect = (userDetail) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.some((selectedRow) => selectedRow._id === userDetail._id)
        ? prevSelectedRows.filter(
            (selectedRow) => selectedRow._id !== userDetail._id
          )
        : [...prevSelectedRows, userDetail]
    );
  };

  const sendSelectedData = () => {
    if (selectedRows.length === 0) {
      toast("No rows selected to send.");
      return;
    }

    setLoading(true);

    const selectedData = userDetails.filter((userDetail) =>
      selectedRows.some((selectedUser) => selectedUser._id === userDetail._id)
    );

    axios
      .post("http://localhost:5000/send", selectedData)
      .then(() => {
        setSelectedRows([]);
        setLoading(false);
        toast("Email sent successfully");
      })
      .catch((error) => {
        toast("Error sending emails:", error.message);
      });
  };

  useImperativeHandle(senderRef, () => ({ sendSelectedData }));

  return (
    <div className="details-table">
      <table className="details-table__table">
        <thead>
          <tr className="details-table__row">
            <th className="details-table__header">Select</th>
            <th className="details-table__header">ID</th>
            <th className="details-table__header">Name</th>
            <th className="details-table__header">Mobile Number</th>
            <th className="details-table__header">Email</th>
            <th className="details-table__header">Hobbies</th>
            <th className="details-table__header">Edit</th>
            <th className="details-table__header">Delete</th>
          </tr>
        </thead>
        <tbody>
          {userDetails &&
            userDetails.map((userDetail, indx) => {
              const isSelected = selectedRows.some(
                (selectedUser) => selectedUser._id === userDetail._id
              );

              return (
                <tr key={userDetail._id ? userDetail._id : indx}>
                  <td className="details-table__cell">
                    <input
                      type="checkbox"
                      className="details-table__checkbox"
                      checked={isSelected}
                      onChange={() => handleRowSelect(userDetail)}
                    />
                  </td>
                  <td className="details-table__cell">{indx + 1}</td>
                  <td className="details-table__cell">{userDetail.name}</td>
                  <td className="details-table__cell">
                    {userDetail.contactNumber}
                  </td>
                  <td className="details-table__cell">{userDetail.email}</td>
                  <td className="details-table__cell details-table__cell--hobbies">
                    {userDetail.hobbies.split(" ").map((hobby, indx) => (
                      <span key={indx} className="details-table__hobby">
                        {hobby}
                        {indx !== userDetail.hobbies.length - 1 && (
                          <span className="details-table__hobby-separator">
                            ,{" "}
                          </span>
                        )}
                      </span>
                    ))}
                  </td>
                  <td className="details-table__cell">
                    <i
                      onClick={() => handleEditDetail(userDetail)}
                      className="details-table__icon fi fi-rr-edit"
                    ></i>
                  </td>
                  <td className="details-table__cell">
                    <i
                      onClick={() => handleDeleteDetail(userDetail._id)}
                      className="details-table__icon fi fi-rr-trash"
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>{" "}
      <RevolvingDot
        height="300"
        width="300"
        radius="30"
        color="white"
        secondaryColor=""
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          zIndex: "3",
        }}
        wrapperClass=""
        visible={loading}
      />
    </div>
  );
});

export default DetailsTable;
