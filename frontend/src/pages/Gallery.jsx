import uiuxst from "../assets/UIUXst.jpg";
import novus from "../assets/Novus24.jpg";
// import gfg from "../assets/GFGWorkshop.jpg";
import GFGWorkshop from "../assets/GFGWorkshop.jpeg";

function Gallery() {
  const images = [
    { src: novus, title: "NOVUS'24 Hackathon @MRDU" },
    { src: uiuxst, title: "UI/UX Workshop @StudentTribe" },
    { src: GFGWorkshop, title: "GeeksForGeeks Workshop" },
  ];

  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Gallery</h2>

      <div style={styles.grid}>
        {images.map((img, index) => (
          <div key={index} style={styles.card} className="gallery-card">
            <img src={img.src} alt={img.title} style={styles.image} />

            <div className="overlay">
              <h3>{img.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: "100px 40px",
    background: "#0f0f0f",
    minHeight: "100vh",
  },

  heading: {
    fontSize: "32px",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "16px",
    cursor: "pointer",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
};

export default Gallery;