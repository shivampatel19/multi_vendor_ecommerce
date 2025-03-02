import React, { useEffect } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

const images = [
  "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRTd2-_JzTQMEl9a3Qdn9lzR-0F6GvJU6VPBzkAiNiJehb-B8haQU6Ue8uiJgkZrtbHzYA85D0TcIJbnE-9gNwKVNVKrLmgI_Q8t6LLQGl9TISn1p5syA-LTA&usqp=CAE",
  "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTpNYD_3G2liuzc3rE-yO842d5UqN_WT152gfq8l0Vnzjw59qAZzkp1Q-TkEHdjFihY7EfR5ezrAqhzzP6AN12rbwzMrMkmZH3Z-X-sksgOjP0gRrEt2p0wSA",
  "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSuYeagWxbeRZ11ngoOyQ_QwsMoObS3JexgdMRxJ-FLLhRm_1qhbFRJ4DqNLubx5sRM5PY6qqYLmKY10OuH0Lcz_cQURcNHRQ&usqp=CAY",
  "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQGFbvf5BG3wWpwYFdyFAFm8USodeP3624QEzzy4Vc9uHPuIgXuSTjDb42FaYY-hRSAxg9rU30uLcOAXfyLk1tbMqM_WvpbsQ&usqp=CAY",
  "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGNLFUk4SpYNM5icn7VPWfvfhH8XpEnHkDgz5fW76yi8JszwYRzTWRF9d29IoabeXNl9J4DaId8AhbgDek4S_7W91ntKJI&usqp=CAY",
];

const ProductCard = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <>
      <div className="group px-4 relative">
        <div
          className="card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {images.map((item, index) => (
            <img
              className="card-media object-top"
              src={item}
              alt=""
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))}

          {isHovered && (
            <div className="indicator flex flex-col items-center space-y-2">
              <div className="flex gap-2">
                <Button variant="contained" color="secondary">
                  <Favorite sx={{ color: teal[500] }} />
                </Button>
                <Button variant="contained" color="secondary">
                  <ModeComment sx={{ color: teal[500] }} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="details pt-3 space-y-1 group-hover-effect  rounded-md ">
                    <div className="name space-y ">
                        <h1 className="font-semibold text-lg">
                            seller
                            {/* {item.seller?.businessDetails.businessName} */}
                        </h1>
                        <p className="">
                            Shirt
                            {/* {item.title} */}
                            </p>
                    </div>
                    <div className="price flex items-center gap-3 ">
                        <span className="font-semibold text-gray-800">
                            {" "}
                            ₹ 50
                            {/* ₹{item.sellingPrice} */}
                        </span>
                        <span className="text thin-line-through text-gray-400 ">
                        ₹ 100
                            {/* ₹{item.mrpPrice} */}
                        </span>
                        <span className="text-[#00927c] font-semibold">
                            50% off
                            {/* {item.discountPercent}% off */}
                        </span>
                    </div>
                </div>
      </div>
    </>
  );
};

export default ProductCard;
