const UserDetails = require("../models/userDetails");
const nodemailer = require("nodemailer");

const addUserDetails = async (req, res) => {
  const { name, contactNumber, email, hobbies } = req.body;
  const userDetail = await UserDetails.create({
    name,
    email,
    contactNumber,
    hobbies,
  });

  res.json({ id: userDetail._id });
};

const getUserDetails = async (req, res) => {
  const userDetails = await UserDetails.find();
  res.json(userDetails);
};

const editUserDetails = async (req, res) => {
  const { name, contactNumber, email, hobbies, _id } = req.body;
  const userDetail = await UserDetails.findById(_id);
  const newUserDetail = await userDetail.updateOne({
    name,
    contactNumber,
    email,
    hobbies,
  });

  res.json(newUserDetail);
};

const deleteUserDetails = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const deletedDetail = await UserDetails.findByIdAndDelete(idToDelete);
    if (!deletedDetail) {
      return res.status(404).json({ message: "Detail not found" });
    }
    res.json({ message: "Detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

const sendUserDetails = async (req, res) => {
  try {
    const userDetails = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ursvedantyetekar@gmail.com",
        pass: "yhngpreitnjkpzdp",
      },
    });

    let tableRows = "";

    userDetails.forEach((user, index) => {
      const hobbiesWithCommas = user.hobbies.split(" ").join(", ");
      tableRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.name}</td>
          <td>${user.contactNumber}</td>
          <td>${user.email}</td>
          <td>${hobbiesWithCommas}</td>
        </tr>
      `;
    });

    const emailContent = `
      <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <p style="font-size: 18px;">Dear Sir,</p>
        <p style="margin-bottom: 16px;">Here are the details of selected users:</p>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Hobbies</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        <p style="margin-top: 16px;">Thank You!</p>
        <p>Yours Sincerely,<br>Vedant's friend Bot.</p>
      </body>
      </html>
    `;

    const message = {
      from: "ursvedantyetekar@gmail.com",
      to: "info@redpositive.in",
      subject: `User Details`,
      html: emailContent,
    };

    const info = await transporter.sendMail(message);
    console.log("Email sent: ", info.messageId);
    res
      .status(200)
      .json({ message: "Email sent successfully", email: message.to });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

module.exports = {
  addUserDetails,
  getUserDetails,
  editUserDetails,
  deleteUserDetails,
  sendUserDetails,
};
