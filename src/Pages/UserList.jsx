import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Helmet } from "react-helmet";
// import userimg from "../Media/user.png";

function UserList() {
  const [userData, setUserData] = useState([]);
  const navto = useNavigate();
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin) {
      navto("/");
    }
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setUserData(users);
  }, []);

  // onscrollanimation start
  const anime1 = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 0.9 },
    },
    hidden: { opacity: 0, y: 100 },
  };

  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  // onscrollanimation end

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magni, exercitationem aliquid saepe repellendus voluptate debitis ipsam voluptates odio autem suscipit tempore aspernatur natus quisquam tempora nihil reiciendis at. Eius!"
        />
        <title>Userlist - ReactJs</title>
      </Helmet>
      <motion.div className="container-fluid" ref={ref}>
        <h1 className="head">User List</h1>
        {userData.length > 0 ? (
          <div className="row g-5">
            {userData.map((user) => {
              return (
                <motion.div
                  className="col-lg-4 col-md-6 col-sm-12 col-12"
                  variants={anime1}
                  initial="hidden"
                  animate={control}
                  key={user.username}
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>{user.username}</Card.Title>
                      <Card.Text>Email : {user.email}</Card.Text>
                      <Card.Text>Username : {user.username}</Card.Text>
                      <Card.Text>Password : {user.password}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p>No User Found</p>
        )}
      </motion.div>
    </>
  );
}

export default UserList;
