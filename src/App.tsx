  import { useContext, useEffect, useState } from "react";
  import "./App.css";
  import CustomizedSwitches from "./Switch";
  import { ThemeContext } from "./utils/ThemeContext";
  import data from '../data.json';

  type FilterType = "All" | "Active" | "Inactive";

  function App() {
    const [activeTab, setActiveTab] = useState<FilterType>("All");
    return (
      <div id="app">
        <SearchBar />
        <Header activeTab={activeTab} handleFilterChange={(e: FilterType) => setActiveTab(e)} />
        <CardsSection type={activeTab} />
      </div>
    );
  }

  interface Extension {
    description: string;
    isActive: boolean;
    name: string;
    logo: string;
  }

  function CardsSection({ type }: { type?: FilterType }) {
    const [extensions, setExtensions] = useState<Extension[]>([]);

    useEffect(() => {
      // fetch("../data.json")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log("Fetched data:", data);
      //     setExtensions(data);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching data:", error);
      //   });
      setExtensions(data);
    }, []);

    const ToggleStatus = (isActive: boolean, name: string) => {
      const updatedExtensions = extensions.map((extension) => {
        if (extension.name === name) {
          return { ...extension, isActive: isActive };
        }
        return extension;
      });
      setExtensions(updatedExtensions);
    };
    const displayedExtensions = extensions.filter((extension) => {
      if (type === "Active") {
        return extension.isActive;
      } else if (type === "Inactive") {
        return !extension.isActive;
      }
      return true; // For "All" type, show all extensions
    })
    return (
      <div className="cards-section container">
        {displayedExtensions.map((extension) => (
          <Card
            key={extension.name}
            handleSwitchClick={ToggleStatus}
            {...extension}
          />
        ))}
      </div>
    );
  }

interface CardProps extends Extension {
  handleSwitchClick: (isActive: boolean, name: string) => void;
}
  function Card({
    name,
    logo,
    isActive,
    description,
    handleSwitchClick,
  }: CardProps) {
    return (
      <div className="card">
        <div className="content-section">
          <img className="extension-logo" src={logo} alt="search" />
          <div className="title-section">
            <h3 className="title">{name}</h3>
            <p className="description">{description}</p>
          </div>
        </div>
        <div className="buttons-section">
          <button>Remove</button>
          <CustomizedSwitches
            isActive={isActive}
            name={name}
            handleSwitchClick={handleSwitchClick}
          />
        </div>
      </div>
    );
  }

  function SearchBar() {
    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
      <section className="searchbar container">
        <img className="logo" src="../public/images/logo.svg " alt="search" />
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
        >
          <img
            src={
              theme === "dark"
                ? "../public/images/icon-sun.svg"
                : "../public/images/icon-moon.svg"
            }
            alt="search"
          />
        </button>
      </section>
    );
  }

  function Header({
    activeTab,
    handleFilterChange
  }: {
    activeTab: FilterType;
    handleFilterChange: (e: FilterType) => void;
  }) {
    return (
      <div className="header-container container">
        <p className="title">Extensions List</p>
        <div className="buttons-container">
          <button
            data-active={activeTab === "All" && "true"}
            onClick={() => handleFilterChange("All")}
          >
            All
          </button>
          <button
            data-active={activeTab === "Active" && "true"}
            onClick={() => handleFilterChange("Active")}
          >
            Active
          </button>
          <button
            data-active={activeTab === "Inactive" && "true"}
            onClick={() => handleFilterChange("Inactive")}
          >
            Inactive
          </button>
        </div>
      </div>
    );
  }
  export default App;
