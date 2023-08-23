import { useState } from "react";
import { newsAPI } from "../../services/newsAPI";

const NewsForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [isMessageShown, setIsMessageShown] = useState(false);

  const handleNameChange = (event) => setTitle(event.target.value);

  const handleAgeChange = (event) => setBody(event.target.value);

  const handleImageChange = (event) => setImage(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("body", body);
    // formData.append("image", image);

    const news = {
      title,
      body,
      image,
    };

    const requestBody = {
      news,
    };

    try {
      const response = await newsAPI.postNews(requestBody);
      console.log("response: ", response);

      if (response.status === 201) {
        setTitle("");
        setBody("");
        setImage(null);
        setIsMessageShown(true);
        console.log("SUCCESS");
      } else {
        console.log("Failed to save record.");
      }
    } catch (error) {
      console.log("Error occurred while saving the record:", error);
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="container">
      {isMessageShown && (
        <div>
          <p>
            News created successfully{" "}
            <span
              onClick={() => {
                setIsMessageShown(false);
              }}
            >
              x
            </span>
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Body:
          <input type="text" value={body} onChange={handleAgeChange} />
        </label>
        <br />
        <label>
          Image:
          <input
            type="file"
            name="image"
            // accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewsForm;
