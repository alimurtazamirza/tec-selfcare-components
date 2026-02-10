// import { useState, useRef } from "react";
// import { Fab, Box, IconButton } from "@mui/material";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import CloseIcon from "@mui/icons-material/Close";
//
// export default function CameraButton() {
//     const [streaming, setStreaming] = useState(false);
//     const videoRef = useRef(null);
//     const [stream, setStream] = useState(null);
//
//     const openCamera = async () => {
//         try {
//             const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = mediaStream;
//                 videoRef.current.play();
//             }
//             mediaStream && setStream(mediaStream);
//             setStreaming(true);
//         } catch (err) {
//             console.error("Camera access error:", err);
//         }
//     };
//
//     const closeCamera = () => {
//         if (stream) {
//             stream.getTracks().forEach((track) => track.stop());
//         }
//         setStreaming(false);
//     };
//
//     return (
//         <>
//             {/* Bottom-right camera button */}
//             <Box
//                 sx={{
//                     position: "fixed",
//                     bottom: 20,
//                     right: 20,
//                     zIndex: 2000,
//                 }}
//             >
//                 <Fab color="primary" onClick={async ()=>await openCamera()}>
//                     <CameraAltIcon />
//                 </Fab>
//             </Box>
//
//             {/* Full-screen overlay for camera */}
//             {streaming && (
//                 <Box
//                     sx={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100vw",
//                         height: "100vh",
//                         backgroundColor: "rgba(0,0,0,0.7)",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         zIndex: 1500,
//                         flexDirection: "column",
//                     }}
//                 >
//                     {/* Close button */}
//                     <IconButton
//                         onClick={closeCamera}
//                         sx={{ position: "absolute", top: 20, right: 20, color: "white" }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//
//                     {/* Video preview */}
//                     <video
//                         ref={videoRef}
//                         width={300}
//                         height={400}
//                         autoPlay
//                         muted
//                         style={{ borderRadius: "10px", border: "2px solid white" }}
//                     />
//                 </Box>
//             )}
//         </>
//     );
// }
