
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Media = () => {
    
    const [media, setMedia] = useState([]); // State to hold media posts
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => { 

        const fetchMedia = async () => {
            try {
                const response = await axios.get("http://localhost:7180/community/get-media");
                if(response.ok) {
                    toast.success("Media posts loaded successfully.");
                }
                setMedia(response.data.media || []); // Safely default to empty array if no data
                console.log("Media posts:", response.data.media);
             }
            catch (error) {
                console.log("Error fetching media posts:", error);
                toast.error("Failed to load media posts.",error);
            }
        }
        fetchMedia()

    },[])
    return (
        <>
        
            {/* {media} */}
            <div className="w-full">
                {/* Media Grid */}
                <div className="flex flex-wrap justify-center gap-4 p-4">
                    {media.map((item) => (
                        <img
                            key={item._id}
                            src={item.photo}
                            alt="Media"
                            className="w-48 h-36 object-cover rounded-lg cursor-pointer hover:scale-105 transition duration-200"
                            onClick={() => setSelectedPhoto(item)}
                        />
                    ))}
                </div>

                {/* Fullscreen view */}
                {selectedPhoto && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-5 right-5 text-white text-4xl font-bold z-50"
                        >
                            &times;
                        </button>

                        {/* Fullscreen Image */}
                        <div className="flex flex-col items-center justify-center md:justify-start ">
                            <div>        <img
                                src={selectedPhoto.photo}
                                alt="Full View"
                                className="max-w-[90%] max-h-[90%] object-contain rounded-xl shadow-lg"
                            /></div>
                            <div className="border-b-3 border-white mt-4 md:hidden"> </div>
                 
                            <div>
                                <p className="text-white flex items-center md:hidden gap-4"> <img className="h-10 w-8    rounded-full" src={selectedPhoto.owner.avatar} /> {selectedPhoto.owner.username}</p>
                              </div>
                        </div> 
                    </div>
                )}
            </div>
        
        
        </>
    )
}
export default Media;