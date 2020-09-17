import PageHeader from "../components/PageHeader";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Avatar,
  IconButton,
  CardContent,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BookIcon from "@material-ui/icons/Book";
import { Link } from "react-router-dom";

const URL = "https://nilee-nodedatabase.herokuapp.com";

const Courses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  // get Courses created by the authenticated logged in user, url params

  const getCourses = async () => {
    try {
      const res = await axios.get(URL + `/courses/${user._id}/courses`);
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios
        .delete(URL + `/courses/${user._id}/course/delete/${id}`)
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  });

  const renderCourses = () => {
    return courses.map((course, index) => {
      return (
        <Grid md={6} xs={12} key={index} item style={{ position: "relative" }}>
          <Paper
            key={course._id}
            style={{
              padding: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h6">{course.course_name}</Typography>
            </div>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={`/dashboard/videos/new`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "rgb(5, 31, 66)",
                      color: "#fff",
                      marginRight: 10,
                    }}
                  >
                    Proceed
                  </Button>
                </Link>
                <IconButton
                  onClick={() => deleteCourse(course._id)}
                  aria-label="delete"
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Paper>
        </Grid>
      );
    });
  };

  return (
    <div>
      <PageHeader title="Course Hub" useSearch={true} />
      <Container>
        <Grid
          container
          spacing={5}
          direction="row"
          className="course-list-container-inner"
        >
          {renderCourses()}
        </Grid>
        <style jsx>
          {`
            .course-list-container-inner {
              height: 88vh;
              overflow: auto;
              padding-bottom: 20px;
            }
            .course-list-container-inner::-webkit-scrollbar {
              display: none;
            }

            @media (max-width: 500px) {
              .course-list-container-inner {
                height: 76vh;
              }
            }
          `}
        </style>
      </Container>
    </div>
  );
};

export default Courses;
