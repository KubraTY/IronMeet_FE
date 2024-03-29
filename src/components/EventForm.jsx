import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/eventForm.module.css";
import img1 from "../images/FE-Img1.jpg";

const EventForm = ({ sameUser = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState("");
  const { fetchWithToken } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const getOneEvent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/event/${eventId}`
      );
      if (response.status === 200) {
        const eventData = response.data;
        setTitle(eventData.title);
        setDescription(eventData.description);
        setDate(eventData.date);
        setCategory(eventData.category);
        setLocation(eventData.location);
        setType(eventData.type);
        setStatus(eventData.status);
        setPhoto(eventData.photo);
        // console.log("Fetched event:", eventData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!sameUser) {
      getOneEvent();
    }
  }, [eventId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqPayload = {
      title,
      description,
      date,
      category,
      location,
      type,
      status,
      photo,
    };

    try {
      const response = await fetchWithToken(
        `${sameUser ? "event" : `event/${eventId}`}`,
        `${sameUser ? "POST" : "PUT"}`,
        reqPayload
      );

      console.log(response.status);
      // For new event
      if (response.status === 201) {
        // const newEvent = response.data;
        alert("Successfully created an Event!");
        navigate("/allEvents");
      } else {
        console.log(response, "Something went wrong while creating an event");
      }
      // For update event
      if (response.status === 200) {
        alert("Successfully updated an Event!");
        navigate("/allEvents");
      } else {
        console.log(response, "Something went wrong while updating an event");
      }
    } catch (error) {
      console.log("error in Event!!", error);
    }
  };

  return (
    <>
      <h1 className={styles.Title}>
        {sameUser ? "Create an Event" : "Update an Event"}
      </h1>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {" "}
          <form onSubmit={handleSubmit} className={styles.formcls}>
            <label className={styles.labelcls}>
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.inputTextcls}
              />
            </label>
            <label className={styles.labelcls}>
              Description
              <textarea
                rows={1}
                cols={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textAreacls}
              />
            </label>
            <label className={styles.labelcls}>
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.inputDatecls}
              />
            </label>
            <label className={styles.labelcls}>
              Category
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.inputTextcls}
              />
            </label>
            <label className={styles.labelcls}>
              Location
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.inputTextcls}
              />
            </label>
            <label className={styles.labelcls}>
              Type
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={styles.selectcls}
              >
                <option value="">Select an option</option>
                <option value="in-person">in-person</option>
                <option value="virtual">virtual</option>
                <option value="hybrid">hybrid</option>
              </select>
            </label>
            <label className={styles.labelcls}>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.selectcls}
              >
                <option value="">Select an option</option>
                <option value="upcoming">upcoming</option>
                <option value="ongoing">ongoing</option>
                <option value="completed">completed</option>
                <option value="canceled">canceled</option>
              </select>
            </label>
            <label className={styles.labelcls}>
              Photo
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className={styles.inputTextcls}
              />
            </label>
            <button type="submit" className={styles.buttoncls}>
              {sameUser ? "Create Event" : "Update"}
            </button>
          </form>
        </div>
        <div className={styles.imageContainer}>
          <img src={img1} alt="image" />
        </div>
      </div>
    </>
  );
};

export default EventForm;
