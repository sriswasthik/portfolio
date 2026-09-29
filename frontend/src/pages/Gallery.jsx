import { useRef, useState } from "react";
import { useContent } from "../content/context";

// The first row is visible on load, so it isn't lazy-loaded.
const EAGER_COUNT = 2;

function Gallery() {
  const images = useContent("gallery");
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const open = (img) => {
    setSelected(img);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      <title>Gallery — Sri Swasthik</title>
      <link rel="canonical" href="https://sriswasthik.vercel.app/gallery" />

      <header className="page-header">
        <h1 className="page-title">Gallery</h1>
        <p className="page-lead">
          Photos from hackathons and workshops I've taken part in.
        </p>
      </header>

      <div className="page-body">
        <ul className="plain-list gallery-grid">
          {images.map((img, i) => (
            <li key={img.src}>
              <figure className="gallery-item">
                <button
                  type="button"
                  className="gallery-item__button"
                  onClick={() => open(img)}
                  aria-label={`View larger: ${img.title}`}
                >
                  <img
                    src={img.thumb || img.src}
                    {...(img.thumb && {
                      srcSet: `${img.thumb} 720w, ${img.src} 1600w`,
                      sizes: "(min-width: 36rem) 21rem, calc(100vw - 2.5rem)",
                    })}
                    alt=""
                    className="gallery-item__image"
                    loading={i < EAGER_COUNT ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                </button>
                <figcaption>{img.title}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Clicking the backdrop targets the dialog itself and closes it. */}
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={selected?.title}
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <button type="button" className="button lightbox__close" onClick={close}>
          Close
        </button>

        {selected && (
          <figure>
            <img
              src={selected.src}
              alt={selected.title}
              className="lightbox__image"
            />
            <figcaption>{selected.title}</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

export default Gallery;
