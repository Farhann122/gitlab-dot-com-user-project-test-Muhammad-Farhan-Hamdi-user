import { useEffect, useState } from "react";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          "https://suitmedia-backend.suitdev.com/api/ideas",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        const item = result.data[0];
        setImageUrl(
          // disini saya tidak bisa mekases gambar dari be , namun jika bisa dia akan memunculkan gambar ber , jika tidak dia akan memunculkan gambar saya
          item?.medium_image?.url ||
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1400&q=80"
        );
        setTitle(item?.title);
      } catch (error) {
        console.error("Failed to load banner data:", error);
      }
    };

    fetchBanner();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[40vh] overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: "transform 0.1s linear",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Text Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center max-w-3xl">
          {/* {title || "Memuat..."} */}
          Ideas <p className="font-thin text-sm">Where All Our Great Things Begin</p>
        </h1>
      </div>

      {/* Diagonal White Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-white clip-diagonal z-20" />
    </section>
  );
};

export default Banner;
