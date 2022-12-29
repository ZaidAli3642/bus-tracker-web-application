import {
  collection,
  getDocs,
  query,
  where,
  set,
  setDoc,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Form from "../../components/Form";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import SubmitButton from "../../components/SubmitButton";

import useAuth from "../../context/auth/useAuth";
import {
  getBusCount,
  getDriverCount,
  getStudentCount,
} from "../../firebase/firebaseCalls/get";
import { database } from "../../firebase/firebaseConfig";
import { usePromise } from "../../hooks/usePromise";

const validationSchema = Yup.object().shape({
  openingTime: Yup.string()
    .required("Opening Time is required.")
    .label("Opening Time"),
  closingTime: Yup.string()
    .required("Closing Time is required.")
    .label("Closing Time"),
});

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, loading, requestPromise } = usePromise();

  async function sendPushNotification(expoPushToken, title, body) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: title,
      body: body,
      data: { someData: "goes here" },
    };

    console.log("TOken ,", message);
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const sendFeeAlerts = async () => {
    const date = new Date().getDate();

    if (date === 1) {
      const studentCollection = collection(database, "students");

      const q = query(
        studentCollection,
        where("institute", "==", user.institute),
        where("collectFee", "==", "collected")
      );

      const studentSnapshot = await getDocs(q);

      studentSnapshot.docs.forEach((student) => {
        setDoc(student.ref, { ...student.data(), collectFee: "pending" });
      });
    }
  };

  const sendFeeNotification = async () => {
    const date = new Date().getDate();

    if (localStorage.getItem("date") == date) return;

    const studentCollection = collection(database, "students");
    const alertCollection = collection(database, "alert");
    const q = query(
      studentCollection,
      where("institute", "==", user.institute),
      where("collectFee", "==", "pending")
    );

    const studentsSnapshot = await getDocs(q);

    studentsSnapshot.docs.map(async (students) => {
      await addDoc(alertCollection, {
        busNo: students.get("busNo"),
        description: "Your child's payment is pending",
        institute: user.institute,
        parent: true,
        title: "Fee Payment Pending",

        created_at: serverTimestamp(),
        type: "fee",
      });
    });

    localStorage.setItem("date", date.toString());
  };

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const setOpeningAndClosingTime = async (values, { resetForm }) => {
    const instituteCollection = collection(database, "institute");
    const q = query(
      instituteCollection,
      where("institute", "==", user.institute)
    );

    const instituteSnapshot = await getDocs(q);

    const institute = instituteSnapshot.docs.map((institute) => ({
      id: institute.id,
      ...institute.data(),
    }));

    const openingConvertedTime = tConvert(values.openingTime);
    const closingConvertedTime = tConvert(values.closingTime);

    console.log("Getting institute : ", values);
    console.log("Getting institute : ", openingConvertedTime);
    const docRef = doc(database, "institute", institute[0].id);

    await updateDoc(docRef, {
      openingTime: openingConvertedTime,
      closingTime: closingConvertedTime,
    });

    resetForm();

    toast.success("Timing Added.");
  };

  useEffect(() => {
    requestPromise(
      getStudentCount(user),
      getDriverCount(user),
      getBusCount(user)
    );
    sendFeeAlerts();
    sendFeeNotification();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <h1>Hello {user.firstname}</h1>
      <label htmlFor="" className="label">
        Welcome Back!
      </label>
      <div className="admin">
        <Form
          initialValues={{ openingTime: "", closingTime: "" }}
          onSubmit={setOpeningAndClosingTime}
          validationSchema={validationSchema}
        >
          <div className="items-details d-flex justify-content-between align-items-center">
            <Input
              label="Opening Time"
              name="openingTime"
              placeholder="Enter Opening Time"
              type="time"
              inputClasses={"w-75"}
              classes={"w-75"}
            />
            <Input
              label="Closing Time"
              name="closingTime"
              placeholder="Enter Closing Time"
              type="time"
              inputClasses={"w-75"}
              classes={"w-75"}
            />
            <SubmitButton title={"Set"} />
          </div>
        </Form>
        <div className="update-container">
          {/* <div
            className="update update-admin"
          >
            <p>Update Your Information</p>
          </div> */}
          <div className="update update-student ms-0">
            <p>Studnets</p>
            <span>{data && data[0]}</span>
          </div>
          <div className="update update-driver">
            <p>Drivers</p>
            <span>{data && data[1]}</span>
          </div>
        </div>
        <div className="update-container">
          <div className="update update-bus mx-0">
            <p>Buses</p>
            <span>{data && data[2]}</span>
          </div>
          <div className="update update-bus me-0">
            <p>Routes</p>
            <span>{data && data[2]}</span>
          </div>
        </div>

        <div className="update-container">
          <div
            className="update update-fee mx-0"
            onClick={() => navigate("/admin/fee")}
          >
            <p>Fee Management</p>
          </div>
          <div
            className="update update-bus me-0"
            onClick={() => navigate("/admin/attendance")}
          >
            <p>Attendance Record</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
