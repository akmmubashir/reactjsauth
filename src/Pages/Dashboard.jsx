import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dashboard from "../Media/Welcome-bro.png";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Helmet } from "react-helmet";

function Dashboard() {
  const navto = useNavigate();
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const exist = JSON.parse(localStorage.getItem("exist"));
    if (!admin && !exist) {
      navto("/");
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

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magni, exercitationem aliquid saepe repellendus voluptate debitis ipsam voluptates odio autem suscipit tempore aspernatur natus quisquam tempora nihil reiciendis at. Eius!"
        />
        <title>Dashboard - ReactJs</title>
      </Helmet>

      
      <div className="container-fluid row align-items-center p-0">
        <motion.div
          className="col-xxl-5 col-xl-6 col-lg-12 col-12"
          ref={ref}
          variants={anime1}
          initial="hidden"
          animate={control}
        >
          <h1 className="head">Dashboard</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea et odit
            placeat minima iure repellendus nulla, consequatur ex quis a
            pariatur soluta temporibus molestiae consectetur sint quaerat porro
            dolore dolorum?
          </p>
        </motion.div>
        <motion.div
          className="col-xxl-7 col-xl-6 col-lg-12 col-12"
          ref={ref}
          variants={anime2}
          initial="hidden"
          animate={control}
        >
          <img src={dashboard} alt="dashboard" className="w-100" />
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;
