import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Media = () => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:7180/community/get-media");
        setMedia(response.data.media || []);
      } catch (error) {
        console.log("Error fetching media posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedia();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-lg bg-slate-200"></div>
          ))
        ) : media.length > 0 ? (
          media.map((item) => (
            <motion.div
              key={item._id}
              layoutId={item._id}
              onClick={() => setSelectedPhoto(item)}
              className="group aspect-square cursor-pointer overflow-hidden rounded-lg bg-slate-200"
            >
              <img
                src={item.photo}
                alt="Media"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full py-12 text-center text-slate-500">
            No media has been shared yet.
          </p>
        )}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-50 rounded-full bg-black/30 p-2 text-white transition hover:bg-black/60"
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
            <motion.img
              layoutId={selectedPhoto._id}
              src={selectedPhoto.photo}
              alt="Full View"
              className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Media;