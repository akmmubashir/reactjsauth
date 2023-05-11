import React, { useEffect, useState } from "react";
import Register from "../Components/Register";
import Login from "../Components/Login";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import landr from "../Media/Mobile login-bro.png";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Helmet } from "react-helmet";

function Home() {
  const [switcher, setswitcher] = useState(false);
  const navto = useNavigate();
  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem("exist"));
    if (exist) {
      setTimeout(() => {
        navto("/dashboard");
      }, 1000);
    }
  });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      setTimeout(() => {
        navto("/userlist");
      }, 1000);
    }
  });

   // onscrollanimation start
  const anime1 = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeInOut", duration: 0.9 },
    },
    hidden: { opacity: 0, x: -100 },
  };
  const anime2 = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeInOut", duration: 0.9 },
    },
    hidden: { opacity: 0, x: 100 },
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

  return (<><Helmet>
    <meta
      name="description"
      content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magni, exercitationem aliquid saepe repellendus voluptate debitis ipsam voluptates odio autem suscipit tempore aspernatur natus quisquam tempora nihil reiciendis at. Eius!"
    />
    <title>ReactJs | Javascript </title>
  </Helmet>
    <div className="container-fluid row align-items-center p-0 home">
      <motion.div className="col-xxl-5 col-xl-6 col-lg-12 col-12" ref={ref}
        variants={anime1}
        initial="hidden"
        animate={control}>
        {switcher ? <Login /> : <Register />}
        <div className="m-auto text-end">
          <Button className="btn" onClick={() => setswitcher((n) => !n)}>
            {switcher ? "Switch to Register" : "Switch to Login"}
          </Button>
        </div>
      </motion.div>
      <motion.div className="col-xxl-7 col-xl-6 col-lg-12 col-12" ref={ref}
        variants={anime2}
        initial="hidden"
        animate={control}>
        <img src={landr} alt="login-and-register" className="w-100" />
      </motion.div>
    </div>
    </>
  );
}

export default Home;
