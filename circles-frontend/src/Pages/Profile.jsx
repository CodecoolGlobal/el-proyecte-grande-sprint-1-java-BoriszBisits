import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import HeaderBar from "../Components/HeaderBar";

function Profile() {
  const [interest, setInterest] = useState("");
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
          throw  Error("Failed to fetch projects");
        }
        return res.json();
      })
      .then((data) => {
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

  const saveInterest = () => {
    // You can perform any logic here to save the interest to your data store or state.
    // For now, we'll just set the savedInterest state.
    setSavedInterest(interest);
  };

  // Function to filter interests based on search query
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

        <TextField
          label="Search Interests"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchQuery}
          placeholder="Start typing to filter interests"
          style={{ marginBottom: "20px" }}
        />

        {filteredInterests.map((item) => (
          <div key={item}>{item}</div>
        ))}

        {savedInterest && (
          <Typography variant="body1">
            Your interest type: {savedInterest}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={saveInterest}
          style={{ marginBottom: "20px" }}
        >
          Save
        </Button>
      </Container>
    </Container>
  );
}

export default Profile;
