import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
// import { motion } from "motion/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
function Home() {
  const doo=[
    {img:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",position:6},
    {img:"https://images.unsp lash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",position:26,},
    {img:"https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",position:46},
    {img:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D",position:66},
    {img:"https://plus.unsplash.com/premium_photo-1673953509986-9b2bfe934ae5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU3fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D",position:85},
    
  ]

  const photo=[
    {img:"https://images.unsplash.com/photo-1623682687826-fe06bf64e6d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkxfHxkb2N0b3J8ZW58MHx8MHx8fDA%3D",position:42},
    {img:"https://images.unsplash.com/photo-1725693485717-dbf8eac577c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjk0fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D",position:58},
    {img:"https://images.unsplash.com/photo-1700308434608-6938d6bd9daa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDAzfHxkb2N0b3J8ZW58MHx8MHx8fDA%3D",position:73},
    {img:"https://images.unsplash.com/photo-1682706841297-5524ba1faa9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDA3fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D",position:88},
    {img:"https://images.unsplash.com/photo-1594658979472-b3d920f2eb3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDI1fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D",position:25},

  ]
  const png = [
    "https://cdn-icons-png.flaticon.com/128/6798/6798805.png",
    "https://cdn-icons-png.flaticon.com/128/2869/2869792.png",
    "https://cdn-icons-png.flaticon.com/128/6824/6824619.png",
    "https://cdn-icons-png.flaticon.com/128/16340/16340199.png",
    "https://cdn-icons-png.flaticon.com/128/1988/1988521.png",
    "https://cdn-icons-png.flaticon.com/128/3802/3802241.png",
    "https://cdn-icons-png.flaticon.com/128/17248/17248903.png",
    "https://cdn-icons-png.flaticon.com/128/16340/16340199.png"
  ];

  

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 60,
    damping: 18,
  });

  const springY = useSpring(y, {
    stiffness: 60,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX - 32);
    y.set(e.clientY - 40);
  };

  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <div
        className="h-[70vh] w-full bg-cover bg-center  overflow-hidden p-[22vw] positin-cener relative text-center "
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1734094546615-045bf5f7ea0e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <Link
          to="/Consentpage"
          className="text-[4vw]  font-extrabold bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-1 text-center transition-all duration-500 hover:bg-black/20 hover:text-green-500/70"
        >
          Click to Consent
        </Link>
      </div>
      <div
        className=" min-h-screen w-full
    rounded-[13px]
    border border-white/20
    bg-white/[0.08]
    backdrop-blur-2xl
    shadow-[0_8px_32px_rgba(0,0,0,0.35)] z-10 p-6  relative sm:w-[1/2vw] sm:h-[1/2vw]"
      >
        <motion.div
          className="absolute h-32 w-32 rounded-full bg-orange-500 blur-3xl"
          animate={{
            x: ["0vw", "70vw", "70vw", "70vw", "0vw"],
            y: ["0vh", "55vh", "35vh", "-5vh", "0vh"],
          }}
          transition={{
            duration: 20,
            times: [0, 0.55, 0.7, 0.08, 0.99],
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="flex flex-row">
          <h1 className=" p-7 text-xl z-10 space=none text-neutral-500  md:w-[40vw] h-[36vh]  mt-12 ml-20   ">
            ᴍᴇᴅɪᴄɪɴᴇ ɪs ᴍᴏʀᴇ ᴛʜᴀɴ ᴀ ᴘʀᴏғᴇssɪᴏɴ—ɪᴛ ɪs ᴀ ʟɪғᴇʟᴏɴɢ ᴄᴏᴍᴍɪᴛᴍᴇɴᴛ ᴛᴏ
            ᴄᴏᴍᴘᴀssɪᴏɴ, sᴇʀᴠɪᴄᴇ, ᴀɴᴅ ʜᴜᴍᴀɴɪᴛʏ. ᴇᴠᴇʀʏ ᴘᴀᴛɪᴇɴᴛ ʀᴇᴘʀᴇsᴇɴᴛs ᴀ ʟɪғᴇ
            ғɪʟʟᴇᴅ ᴡɪᴛʜ ᴅʀᴇᴀᴍs, ʜᴏᴘᴇs, ᴀɴᴅ ʟᴏᴠᴇᴅ ᴏɴᴇs, ᴍᴀᴋɪɴɢ ᴇᴠᴇʀʏ ᴅɪᴀɢɴᴏsɪs,
            ᴛʀᴇᴀᴛᴍᴇɴᴛ, ᴀɴᴅ ᴀᴄᴛ ᴏғ ᴄᴀʀᴇ ᴅᴇᴇᴘʟʏ ᴍᴇᴀɴɪɴɢғᴜʟ. ʜᴇᴀʟᴛʜᴄᴀʀᴇ
            ᴘʀᴏғᴇssɪᴏɴᴀʟs ᴡᴏʀᴋ ᴛɪʀᴇʟᴇssʟʏ, ᴏғᴛᴇɴ ʙᴇʏᴏɴᴅ ᴛʜᴇɪʀ ʟɪᴍɪᴛs, ᴛᴏ ʙʀɪɴɢ
            ᴄᴏᴍғᴏʀᴛ, ʀᴇsᴛᴏʀᴇ ʜᴇᴀʟᴛʜ, ᴀɴᴅ sᴀᴠᴇ ʟɪᴠᴇs. ᴛʜᴇɪʀ ᴅᴇᴅɪᴄᴀᴛɪᴏɴ ʀᴇᴍɪɴᴅs ᴜs
            ᴛʜᴀᴛ ᴡʜɪʟᴇ ᴍᴇᴅɪᴄᴀʟ sᴄɪᴇɴᴄᴇ ᴄᴜʀᴇs ᴅɪsᴇᴀsᴇs, ᴇᴍᴘᴀᴛʜʏ, ᴋɪɴᴅɴᴇss, ᴀɴᴅ
            ᴄᴏᴍᴘᴀssɪᴏɴ ᴀʀᴇ ᴡʜᴀᴛ ᴛʀᴜʟʏ ʜᴇᴀʟ ᴘᴇᴏᴘʟᴇ. ᴇᴠᴇʀʏ ʜᴇᴀʀᴛʙᴇᴀᴛ ᴘʀᴏᴛᴇᴄᴛᴇᴅ ᴀɴᴅ
            ᴇᴠᴇʀʏ ʟɪғᴇ ᴛᴏᴜᴄʜᴇᴅ ɪs ᴀ ᴛᴇsᴛᴀᴍᴇɴᴛ ᴛᴏ ᴛʜᴇ ɴᴏʙʟᴇ ᴘᴜʀᴘᴏsᴇ ᴏғ ᴍᴇᴅɪᴄɪɴᴇ.
          </h1>
          <img
            className=" w-[35vw] h-[40vh] ml-[8vw] mt-20 rounded-md border border-sky/50 border-[7px] backdrop-blur-2xl  shadow-2xl"
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <h1 className="ml-20 p-10 text-[11vw] uppercase text-shadow-2xl  font-Nove decoration-black text-[#34C799]">
          <img
            className=" w-[60vw] mt-12 blur-[2px] -ml-[32px] "
            src="https://www.coolgenerator.com/Data/Textdesign/202608/28ba85cbcee01f8a5c73b85d66e735cc.png"
            alt=""
          />
        </h1>
      </div>
      <div
        onMouseMove={handleMouseMove}
        className="w-full h-screen bg-black flex-row  relative overflow-hidden"
      >
        <motion.div
          style={{
            x: springX,
            y: springY,
          }}
          className="
      w-16 h-20
      bg-green-400
      rounded-full
      absolute
      blur-2xl
      z-0
    "/>
<div className="absolute top-[4vw] left-0 w-full overflow-hidden z-20">  
 <motion.div
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
    className="flex w-max"
  >
    <div className="flex shrink-0 gap-[6vw] pr-[6vw]">
      {png.map((word, idx) => (
        <img
          key={`a-${idx}`}
          src={word}
          alt=""
          className="w-[6vw] h-[12vh] shrink-0 object-contain brightness-0 invert"
        />
      ))}
    </div>

    <div className="flex shrink-0 gap-[6vw] pr-[6vw]">
      {png.map((word, idx) => (
        <img
          key={`b-${idx}`}
          src={word}
          alt=""
          className="w-[6vw] h-[12vh] shrink-0 object-contain brightness-0 invert"
        />
      ))}
    </div>
  </motion.div>
</div>
<div className="absolute top-[38vw] left-0 w-full overflow-hidden z-20">
  <motion.div
    animate={{ x: ["-50%", "0%"] }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
    className="flex w-max">
    <div className="flex shrink-0 gap-[6vw] pr-[6vw]">
      {png.map((word, idx) => (
        <img
          key={`c-${idx}`}
          src={word}
          alt=""
          className="w-[6vw] h-[12vh] shrink-0 object-contain brightness-0 invert"
        />
      ))}
     
    </div>
    <div className="flex shrink-0 gap-[6vw] pr-[6vw]">
      {png.map((word, idx) => (
        <img
          key={`d-${idx}`}
          src={word}
          alt=""
          className="w-[6vw] h-[12vh] shrink-0 object-contain brightness-0 invert"
        />
      ))}
    </div>
  </motion.div>
</div>
        <div
          className="
          w-full h-full
          absolute
          inset-0
          bg-white/5
          backdrop-blur-xl
          z-10"
        />
      </div>
      {/* <div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="min-h-screen bg-[#EAFBEE] flex items-center justify-center backdrop-blur-sm"
        >
          <motion.h1
            ref={ref}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -200 }}
            // whileHover={{ opacity: 0 }}
            transition={{ duration: 0.70 }}
            className="text-5xl text-black/80    "
          >
            
            <div className="flex w-full h-screen   overflow-hidden">
             <div className=" p-10  flex flex-col mr-[16vw] ">
             
                <motion.h3 className=" text-[22px] w-[22vw] ml-4 ">Doctor who  All doctors treat, but a good doctor lets nature heal.
              Physicians do a lot for a patient when they give his disease a name.Nature, time and patience are the 3 great physicians.
               Bulgarianproverb.Foolish the doctor who despises the knowledge acquired by the ancients.Hippocrates.
               As we get involved in the emotional healing of others, we get healedemotionally ourselves.
               That p
               hysician will hardly be thought very careful of the health ofothers who neglects his own. Galen.</motion.h3>    
                  </div>
        <div className="relative w-full h-screen ml-[8vw] bottom-10 ">
  {doo.map((word, idx) => (
    <motion.img
    initial={{opacity:0}}
    whileHover={{opacity:1}}
      key={`doo-${idx}`}
      src={word.img}
      alt=""
      className="absolute w-[14vw] h-[10vw] object-cover"
      style={{
        left: `-${word.position}%`,
        top: `${word.position}%`,
      }}
    />
  ))}
  {photo.map((word, idx) => (
    <motion.img
    initial={{opacity:0}}
    whileHover={{opacity:1}}
      key={`photo-${idx}`}
      src={word.img}
      alt=""
      className="absolute w-[14vw] h-[10vw] object-cover"
      style={{
        left: `${word.position}%`,
        top: `${word.position}%`,
      }}
    />
  ))}

</div>  
  </div>
                     
          </motion.h1>         
        </motion.div>
      </div> */}
      <div className="relative min-h-screen bg-black overflow-hidden  ">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: ["0vw", "10vw", "20vw", "40vw", "50vw", "65vw", "-7vw", "0vw"],
              y: [
                "0vh",
                "15vh",
                "30vh",
                "45vh",
                "55vh",
                "60vh",
                "-10vh",
                "0vh",
              ],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-60 h-60 bg-[#251728] rounded-full blur-3xl left-20 top-20"
          />
          <motion.div
            className="absolute w-52 h-40 bg-blue-900 rounded-full blur-3xl right-20 bottom-20"
            animate={{
              x: ["0vw", "-20vw", "-20vw", "-35vw", "-32vw", "20vw", "0vw"],
              y: ["0vh", "-30vh", "-47vh", "-56vh", "-65vh", "10vh", "0vh"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
