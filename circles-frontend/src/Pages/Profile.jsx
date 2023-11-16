import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import HeaderBar from "../Components/HeaderBar";
import Autocomplete from "@mui/material/Autocomplete";
import NotesList from "./NotesListOfProfile";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Profile() {
  const [interest, setInterest] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [savedInterest, setSavedInterest] = useState("");
  const [profile, setProfile] = useState({});
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subtypeInput, setSubtypeInput] = useState("");
  const [allCoworkers, setAllCoworkers] = useState([]);
  const [coworkerSearchQuery, setCoworkerSearchQuery] = useState("");
  const [filteredCoworkers, setFilteredCoworkers] = useState(allCoworkers);
  const [selectedCoworker, setSelectedCoworker] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureImage, setProfilePictureImage] = useState("");



  useEffect(() => {
    fetchInterest();
    fetchInterests();
    fetchAllCoworkers();
  }, [savedInterest]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleProfilePictureUpload = async () => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append("file", profilePicture);

      const token = localStorage.getItem("token");
      const leader = localStorage.getItem("username");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(`/api/profile/picture/upload/${leader}`, {
          method: "POST",
          headers: headers,
          body: formData,
        });
      
        if (response.ok) {
          console.log("Profile picture uploaded successfully");
          fetchProfilePicture()
        } else {
          const errorMessage = await response.text(); // Assuming the error message is returned as text
          console.error(`Profile picture upload failed: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
      
    }
  };

  const handleCoworkerSearchQuery = (e) => {
    const query = e.target.value;
    setCoworkerSearchQuery(query);
    filterCoworkers(query);
  };

  const filterCoworkers = (query) => {
    const filtered = allCoworkers.filter((coworker) =>
      coworker.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCoworkers(filtered);
  };

  function fetchAllCoworkers() {
    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(`/api/profile/allcoworkers/${leader}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllCoworkers(data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }

  function fetchInterests() {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(`/api/profile/types`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setInterest(data);
        setFilteredInterests(data);
      })
      .catch((error) => {
        console.error("Error fetching interests:", error);
      });
  }

  function fetchInterest() {
    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(`/api/profile/${leader}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }

  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterInterests(query);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    if (!selectedCoworker || !messageInput) {
      
      return;
    }

    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");

    const dataToSend = {
      receiver: selectedCoworker.name,
      sender: leader,
      message: messageInput,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    fetch(`/api/profile/sendmessage`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dataToSend),
    })
     

    setMessageInput("");
  };

  const handleInterestSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");

    const dataToSend = {
      interest: searchQuery,
      user: leader,
      subtype: subtypeInput,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    fetch(`/api/profile/type`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        setSavedInterest(searchQuery);
        fetchSubtypes(profile.types);
      })
      .catch((error) => {
        console.error("Error saving interest:", error);
      });
  };

  const handleSubtypeSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");
    const dataToSend = {
      subtype: subtypeInput,
      user: leader,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    fetch(`/api/profile/addsubtype`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dataToSend),
    });
    fetchInterest();
  };

  const filterInterests = (query) => {
    const filtered = interest.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInterests(filtered);
  };

  const fetchSubtypes = (selectedTypes) => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestBody = JSON.stringify({ selectedTypes });

    fetch("/api/profile/subtypes", {
      method: "POST",
      headers: headers,
      body: requestBody,
    })
      .then((res) => res.json())
      .then((data) => {
        setSubtypes(data);
      })
      .catch((error) => {
        console.error("Error fetching subtypes:", error);
      });
  };

  useEffect(() => {
    // Fetch the profile picture URL when the component mounts
    fetchProfilePicture();
  }, []); // Empty dependency array means this effect runs once on mount

  const fetchProfilePicture = () => {
    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");
  
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    fetch(`/api/profile/picture/${leader}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("image " + data)
        setProfilePictureImage(data);
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
      });
  };
  

  return (
    <Container>
      <HeaderBar />

      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Typography variant="h5">{profile.name + "'s Profile"}</Typography>
        <img
  src={profilePictureImage ? `data:image/jpeg;base64,${profilePictureImage}` : 'default-image-url'}
  alt="Profile"
  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
/>



        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleProfilePictureUpload}
        >
          Upload Profile Picture
        </Button>

        {profile && profile.types && profile.types.length > 0 && (
          <div>
            <Typography variant="h6">Your Interest Types:</Typography>
            <ul>
              {profile.types.map((projectType, index) => (
                <li key={index}>{projectType.name}</li>
              ))}
            </ul>
          </div>
        )}

        {profile && profile.subTypes && profile.subTypes.length > 0 && (
          <div>
            <Typography variant="h6">
              Your Interest in SubTypes:
            </Typography>
            <ul>
              {profile.subTypes.map((projectType, index) => (
                <li key={index}>{projectType.name}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleInterestSubmit}>
          <Autocomplete
            id="interest-autocomplete"
            options={filteredInterests}
            getOptionLabel={(option) => option.name}
            value={
              filteredInterests.find(
                (option) => option.name === searchQuery
              ) || null
            }
            onChange={(event, newValue) =>
              setSearchQuery(newValue ? newValue.name : "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Interests"
                variant="outlined"
                fullWidth
                placeholder="Start typing to filter interests"
              />
            )}
          />

          {savedInterest && (
            <Typography variant="body1">
              Your interest type: {savedInterest.name}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Save Interest
          </Button>
        </form>

        <form onSubmit={handleSubtypeSubmit}>
          <Autocomplete
            id="subtype-autocomplete"
            options={subtypes}
            getOptionLabel={(option) => option.name}
            value={
              subtypes.find((option) => option.name === subtypeInput) ||
              null
            }
            onChange={(event, newValue) =>
              setSubtypeInput(newValue ? newValue.name : "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Subtypes"
                variant="outlined"
                fullWidth
                placeholder="Start typing to filter subtypes"
              />
            )}
          />

          {subtypeInput && (
            <Typography variant="body1">
              Your selected subtype: {subtypeInput}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Save Subtype
          </Button>
        </form>

        <form onSubmit={handleMessageSubmit}>
  <Autocomplete
    id="coworker-autocomplete"
    options={allCoworkers }
    getOptionLabel={(option) => option.name}
    value={selectedCoworker}
    onChange={(event, newValue) => setSelectedCoworker(newValue)}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Select Coworker"
        variant="outlined"
        fullWidth
        placeholder="Start typing to filter coworkers"
      />
    )}
  />

  {selectedCoworker && (
    <>
      <TextField
        label={`Message to ${selectedCoworker.name}`}
        variant="outlined"
        fullWidth
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message here"
        style={{ marginTop: "10px" }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Send Message
      </Button>
    </>
  )}
</form>

      
      <NotesList />

      </Container>
    </Container>
  );
}

export default Profile;
