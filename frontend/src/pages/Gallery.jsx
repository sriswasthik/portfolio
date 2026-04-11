// import uiuxst from "../assets/UIUXst.jpg";
// import novus from "../assets/Novus24.jpg";
// // import gfg from "../assets/GFGWorkshop.jpg";
// import GFGWorkshop from "../assets/GFGWorkshop.jpeg";
// import IITH from "../assets/IITH.jpeg";
// import HackFusion from "../assets/HackFusion.jpeg";

// function Gallery() {
//   const images = [
//     { src: novus, title: "NOVUS'24 Hackathon @MRDU" },
//     { src: uiuxst, title: "UI/UX Workshop @StudentTribe" },
//     { src: GFGWorkshop, title: "GeeksForGeeks Workshop" },
//     { src: IITH, title: "Codeathon @IITH" },
//     { src: HackFusion, title: "HackFusion @JNTUH" },
//   ];

//   return (
//     <section style={styles.container}>
//       <h2 style={styles.heading}>Gallery</h2>

//       <div style={styles.grid}>
//         {images.map((img, index) => (
//           <div key={index} style={styles.card} className="gallery-card">
//             <img src={img.src} alt={img.title} style={styles.image} />

//             <div className="overlay">
//               <h3>{img.title}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// const styles = {
//   container: {
//     padding: "100px 40px",
//     background: "#0f0f0f",
//     minHeight: "100vh",
//   },

//   heading: {
//     fontSize: "32px",
//     marginBottom: "40px",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "20px",
//   },

//   card: {
//     position: "relative",
//     overflow: "hidden",
//     borderRadius: "16px",
//     cursor: "pointer",
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     transition: "transform 0.5s ease",
//   },
// };

// export default Gallery;





import { useState } from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

import uiuxst from "../assets/UIUXst.jpg";
import novus from "../assets/Novus24.jpg";
import GFGWorkshop from "../assets/GFGWorkshop.jpeg";
import IITH from "../assets/IITH.jpeg";
import HackFusion from "../assets/HackFusion.jpeg";

function Gallery() {
  const [selected, setSelected] = useState(null);

  const images = [
    { src: novus, title: "NOVUS'24 Hackathon @MRDU" },
    { src: uiuxst, title: "UI/UX Workshop @StudentTribe" },
    { src: GFGWorkshop, title: "GeeksForGeeks Workshop" },
    { src: IITH, title: "Codeathon @IITH" },
    { src: HackFusion, title: "HackFusion @JNTUH" },
  ];

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const [tiltStyles, setTiltStyles] = useState({});

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    setTiltStyles((prev) => ({
      ...prev,
      [index]: {
        rotateX,
        rotateY,
        scale: 1.05,
      },
    }));
  };

  const resetTilt = (index) => {
    setTiltStyles((prev) => ({
      ...prev,
      [index]: {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      },
    }));
  };

  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Gallery</h2>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {images.map((img, index) => (
          // <motion.div
          //   key={index}
          //   style={styles.card}
          //   initial={{ opacity: 0, y: 60 }}
          //   whileInView={{ opacity: 1, y: 0 }}
          //   transition={{ delay: index * 0.1 }}
          //   whileHover={{ scale: 1.03 }}
          //   onClick={() => setSelected(img)}
          // >
          //   <img src={img.src} alt={img.title} style={styles.image} />

          //   <div style={styles.overlay}>
          //     <h3>{img.title}</h3>
          //   </div>
          // </motion.div>

          <motion.div
            key={index}
            style={styles.card}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            // transition={{ delay: index * 0.1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 10,
            }}

            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => resetTilt(index)}

            animate={tiltStyles[index] || {}}
            onClick={() => setSelected(img)}
          >
            <div style={styles.inner}>
              <img src={img.src} alt={img.title} style={styles.image} />

              <div style={styles.overlay}>
                <h3>{img.title}</h3>
              </div>

              {/* Glow layer */}
              <div style={styles.cursorGlow}></div>
            </div>
          </motion.div>

        ))}
      </Masonry>

      {/* 🔍 LIGHTBOX */}
      {selected && (
        <motion.div
          style={styles.lightbox}
          onClick={() => setSelected(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img src={selected.src} style={styles.fullImage} />
          <p style={styles.caption}>{selected.title}</p>
        </motion.div>
      )}
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
    fontSize: "38px",
    marginBottom: "40px",
  },

  inner: {
    transformStyle: "preserve-3d",
    transition: "0.2s",
  },

  card: {
    perspective: "1000px",
    borderRadius: "18px",
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
  },

  cursorGlow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, rgba(0,173,181,0.2), transparent 60%)",
    opacity: 0,
    transition: "0.3s",
  },

  card: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "16px",
    marginBottom: "20px",
    cursor: "pointer",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
  },

  image: {
    width: "100%",
    display: "block",
    borderRadius: "16px",
    transition: "transform 0.4s ease",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    opacity: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    transition: "0.3s",
  },

  lightbox: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.95)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  fullImage: {
    maxWidth: "90%",
    maxHeight: "80%",
    borderRadius: "12px",
  },

  caption: {
    marginTop: "15px",
    color: "#aaa",
  },
};

export default Gallery;