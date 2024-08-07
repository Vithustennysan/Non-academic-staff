import "../css/home.css";
import Cards from "./Cards";
import lab8 from "../pdfs/co226_lab8.pdf";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";
import AdminHomePage from "./Admin/AdminHomePage";
import { UserContext } from "../Contexts/UserContext";
import { LoginContext } from "../Contexts/LoginContext";

const Home = () => {
  const {isLogin, setIsLogin} = useContext(LoginContext);
  const [isloading, setIsLoading] = useState(true);
  const {user, setUser} = useContext(UserContext);
  const [src, setSrc] = useState("https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg");
  const [role, setRole] = useState("USER");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTimeout(() => {
      const getUserDetail = async () => {
        if (isLogin) {
          setIsLogin(true);
          try {
            const response = await axios.get("http://localhost:8080/api/auth/user/info", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(response.data);
            setRole(response.data.role);
            setIsLoading(false);
            if(response.data.image_data){
              setSrc(`data:${response.data.image_type};base64,${response.data.image_data}`);
            }
          } catch (error) {
            console.log("message ", error);
          }
        } else {
          setIsLoading(false);
        }
      };

      getUserDetail();
    }, 600);
  }, [setUser, isLogin, setIsLogin]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const slides = [
    { backgroundImage: "url(https://arts.pdn.ac.lk/images/slider/slide1.jpg)" },
    { backgroundImage: "url(https://arts.pdn.ac.lk/images/slider/slide2.jpg)" },
    {
      backgroundImage:
        "url(https://arts.pdn.ac.lk/civco/assets/data1/images/1.jpg)",
    },
    { backgroundImage: "url(https://arts.pdn.ac.lk/images/slider/slide3.jpg)" },
  ];

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    slideInterval.current = setInterval(nextSlide, 6000);

    return () => clearInterval(slideInterval.current);
  }, [slides.length]);

  return (
    <>
      {isloading ? (
        <LoadingAnimation />
      ) : (
        <>
          {isLogin ? (
            /* --------- user profile ----------- */
            <div>
              <div className="home-top">
                <div className="home-banner-profile">
                  <div className="homeProfilePic">
                    <img
                      // src="https://cdn2.momjunction.com/wp-content/uploads/2015/08/33-Funky-Short-Hairstyles-For-Kids.jpg.webp"
                      src={src}
                      alt="userProfile"
                    />
                  </div>
                  <h2>
                    {user.first_name} {user.last_name}
                  </h2>
                  <p>-{user.job_type}</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="home-img-slider">
              <img
                src="https://arts.pdn.ac.lk/images/slider/slide1.jpg"
                alt=""
                />
              <h1>University Of Peradeniya</h1>
            </div>
          )}

          
        <div className="home-wrapper">

          {isLogin ? (
            <>

            { role == "ADMIN" && <AdminHomePage/>}
              <div className="form-shortcut-container">
                <div className="form-shortcut">
                  <p>
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/hyperlink-icon.png"
                      alt=""
                      />
                    <a href="/forms">Apply for Leaves & Transer</a>
                  </p>
                </div>
              </div>
            {/* ----- image slider ---------- */}
            { role !== "ADMIN" && <div className="home-image-slide">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? "active" : ""}`}
                  style={slide}
                  ></div>
                ))}
            </div>}
            </>
          ) : (
            <div className="home-container">
              <div className="home-main-img">
                <img
                  src="https://news.kln.ac.lk/images/2022/07/04/_88A9993.jpg"
                  alt=""
                />
              </div>
              <div className="home-main">
                <h1>Welcome to our University</h1>
                <p>
                  Non-academic staff are the backbone of our educational
                  institution, ensuring seamless operations and providing
                  essential support to students, faculty, and administration.
                  From administrative duties and IT support to student services
                  and facility management, these dedicated professionals create
                  an environment conducive to learning and growth. Their roles
                  encompass a wide range of responsibilities, including
                  admissions, career counseling, health and wellness, financial
                  management, and more. Committed to excellence, our
                  non-academic staff work tirelessly behind the scenes to
                  enhance the educational experience and maintain the high
                  standards of our institution.
                </p>
              </div>
            </div>
          )}

          {/* ----------- quick links ----------- */}
          <div className="homeQuikLinks">
            <h1>Quick Downloads</h1>
            <div className="homeLinks">
              <a href={lab8} download="Leave_form" target="_blank">
                <p className="leftLink">
                  <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/download-pdf-icon.png"
                    alt=""
                  />
                  Application for leaves
                </p>
              </a>

              <a href={lab8} download="Subtitue_form" target="_blank">
                <p className="rightLink">
                  <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/download-pdf-icon.png"
                    alt=""
                  />
                  Application for subtitute
                </p>
              </a>

              <a href={lab8} download="Transfer_form" target="_blank">
                <p className="leftLink">
                  <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/download-pdf-icon.png"
                    alt=""
                  />
                  Application for transfer
                </p>
              </a>

              <a href={lab8} download="Leave_form" target="_blank">
                <p className="rightLink">
                  <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/download-pdf-icon.png"
                    alt=""
                  />
                  Application for subtitute
                </p>
              </a>
            </div>
          </div>
          
          {/* ----------- news feed ---------- */}
          <div className="newsFeed">
            <h2>Important Announcements</h2>
            <Cards
              title={"news"}
              body={
                "cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"
              }
              reporter={"Vithu"}
            />
            <Cards
              title={"news"}
              body={
                " sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"
              }
              reporter={"Tennysan"}
            />
            <Cards
              title={"news"}
              body={
                "cdsihv iad vca sfdf sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"
              }
              reporter={"Vithu"}
            />
            <Cards
              title={"news"}
              body={
                "cdsih sdf s dfsd f sdf sd fs dfs dfsdfsdf sdfsdf sdf sdkfaebiufbicbiubcuc sa csicbibc cjs cu csou oquscbqos cqs cuqsc few widc cwdcbwiudbcwdcw dciw dcbwudbcdc ad ca c cuabcua scua scasca sas a sda sf"
              }
              reporter={"Samir"}
            />
          </div>

          {/* ----------- social media links -----------*/}
          <div className="linkto">
            <h2>Link to official websites</h2>
            <div>
              <a href="https://www.pdn.ac.lk/" target="_blank">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-color-icon.png"
                  alt="Twitter_link"
                />
              </a>
              <a href="https://twitter.com/uperadeniya?lang=en" target="_blank">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png"
                  alt="Twitter_link"
                />
              </a>
              <a
                href="https://www.facebook.com/UniversityOfPeradeniya/"
                target="_blank"
              >
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-icon.png"
                  alt="Linkedin_link"
                />
              </a>
              <a
                href="https://github.com/UniversityOfPeradeniya"
                target="_blank"
              >
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-icon.svg"
                  alt="Github_link"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCxN_hZh8t5uFGW7kwahQwqQ"
                target="_blank"
              >
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-color-icon.png"
                  alt="Youtube_link"
                />
              </a>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Home;
