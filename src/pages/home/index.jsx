import { useEffect, useState } from "react";
import styles from "./home.module.css";
import NewLinkModal from "../components/linkModal";
import { createShortLink } from "../../services/index";
import logoCuv from "../../assets/logoCuv.png";
import dashboardIcon from "../../assets/dashboardIcon.png";
import linksIcon from "../../assets/linksIcon.png";
import analyticsIcon from "../../assets/analyticsIcon.png";
import settingsIcon from "../../assets/settingsIcon.png";
import createnewIcon from "../../assets/createnewIcon.png";
import sunIcon from "../../assets/sunIcon.png";
import searchIcon from "../../assets/searchIcon.png";


export default function Home() {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const [greeting, setGreeting] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const getGreeting = () => {
            const hour = new Date().getHours();
            if (hour >= 4 && hour < 12) {
                return "Good morning";
            } else if (hour >= 12 && hour < 17) {
                return "Good afternoon";
            } else if (hour >= 17 && hour < 21) {
                return "Good evening";
            } else {
                return "Good night";
            }
        };

        setGreeting(getGreeting());
    }, []);

    const formattedDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    const handleCreateNew = async (linkData) => {
        try {
            const response = await createShortLink(linkData);
            alert(`Shortened link created: ${response.shortUrl}`);
        } catch (error) {
            alert("Error creating link: " + error.message);
        }
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <div className={styles.logo}>
                    <img src={logoCuv} alt="logo" />
                </div>
                <nav className={styles.nav_sidebar}>
                    <a href="#" onClick={(e) => e.preventDefault()} className={styles.nav_link_action}>
                        <img src={dashboardIcon} alt="icon" className={styles.icon} />
                        Dashboard
                    </a>
                    <a href="#" className={styles.nav_link}>
                        <img src={linksIcon} alt="icon" className={styles.icon} />
                        Links
                    </a>
                    <a href="#" className={styles.nav_link}>
                        <img src={analyticsIcon} alt="icon" className={styles.icon} />
                        Analytics
                    </a>
                    <a href="#" className={styles.nav_link_settings}>
                        <img src={settingsIcon} alt="icon" className={styles.settingsIcon} />
                        Settings
                    </a>
                </nav>
            </div>

            <div className={styles.main_content}>
                <header className={styles.header}>
                    <div className={styles.homecontainer}>
                        {user ? (
                            <div>
                                <h3>
                                    <img src={sunIcon} alt="emoji" className={styles.sunIcon} />
                                    {greeting}, {user.name}
                                </h3>
                                <p className={styles.date}>{formattedDate}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className={styles.header_right}>
                        <button className={styles.create_button} onClick={() => setIsModalOpen(true)}>
                            <span><img src={createnewIcon} alt="logo" /></span> Create new
                        </button>
                        <div className={styles.searchContainer}>
                            <img src= {searchIcon} alt="Search Icon" className={styles.search_icon} />
                            <input placeholder="Search by remarks" className={styles.search_input} />
                        </div>
                        <div className={styles.userIcon}>{user.userIcon}</div>
                    </div>
                </header>
                {isModalOpen && <NewLinkModal onClose={() => setIsModalOpen(false)} onCreate={handleCreateNew} />}
            </div>
        </div>

    );
};


