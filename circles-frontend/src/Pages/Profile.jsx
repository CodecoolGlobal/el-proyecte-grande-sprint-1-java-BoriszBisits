import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import HeaderBar from "../Components/HeaderBar";
import Autocomplete from "@mui/material/Autocomplete";

function Profile() {
  const [interest, setInterest] = useState([]);
  const [savedInterest, setSavedInterest] = useState("");
  const [profile, setProfile] = useState({});
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInterest();
    fetchInterests();
  }, []);

  function fetchInterests() {
    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(`/api/profile/types`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        return res.json();
      })
      .then((data) => {
        setInterest(data);
        setFilteredInterests(data); // Initialize filtered interests with all interests
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
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
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to fetch projects");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }

  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterInterests(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");

    // Prepare the data to send to the backend
    const dataToSend = {
      interest: searchQuery.name,
      user: leader,
      // Add any other relevant data you want to send
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save interest");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Interest saved successfully", data);
        setSavedInterest(searchQuery); // Update the saved interest in the state

        // You can update the state or perform any other necessary actions here
      })
      .catch((error) => {
        console.error("Error saving interest:", error);
        // Handle the error, show an error message, etc.
      });
  }

  const filterInterests = (searchQuery) => {
    const filtered = interest.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInterests(filtered);
  };

  return (
    <Container>
      <HeaderBar />

      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Typography variant="h5">Edit Your Profile</Typography>
         {profile && profile.ownedProjects && profile.ownedProjects.length > 0 && (
          <div>
            <Typography variant="h6">Your Projects:</Typography>
            <ul>
              {profile.ownedProjects.map((project, index) => (
                <li key={index}>{project.name}</li>
              ))}
            </ul>
          </div>
        )}  

        {profile && profile.types && profile.types.length > 0 && (
          <div>
            <Typography variant="h6">Your Project Types:</Typography>
            <ul>
              {profile.types.map((projectType, index) => (
                <li key={index}>{projectType.name}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Autocomplete
            id="interest-autocomplete"
            options={filteredInterests}
            getOptionLabel={(option) => option.name}
            value={searchQuery}
            onChange={(event, newValue) => setSearchQuery(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Interests"
                variant="outlined"
                fullWidth
                placeholder="Start typing to filter interests"
              />
            )}
            isOptionEqualToValue={(option, value) => option === value}
          />

          {savedInterest && (
            <Typography variant="body1">
              Your interest type: {savedInterest}
            </Typography>
          )}

          <Button
            type="submit" // Trigger the submit action
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Save
          </Button>
        </form>
      </Container>
    </Container>
  );
}

export default Profile;
