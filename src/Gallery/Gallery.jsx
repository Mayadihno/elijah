/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { db } from "../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import styles from "../styles/styles";

const Gallery = () => {
  const { userData } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [admin, setAdmin] = useState(false);

  const userDocREf = query(
    collection(db, "images"),
    orderBy("timestamp", "desc")
  );

  const getFunc = async () => {
    onSnapshot(userDocREf, (snapshot) => {
      setPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const handleDelete = async (PostId) => {
    try {
      await deleteDoc(doc(db, "images", PostId));
      const updatePost = post?.filter((post) => post.id !== PostId);
      setPost(updatePost);
      toast.success("Successfully deleted the Post");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFunc();
    if (userData?.formDataCopy?.role === "admin") {
      setAdmin(true);
    }
  }, [userData?.formDataCopy?.role]);
  return (
    <React.Fragment>
      <div className={`${styles.section} mb-10`}>
        <h3 className=" text-[25px] text-center font-[700] py-5 font-Poppins 800px:mt-1 mt-12">
          Payris Funolympic images
        </h3>

        <div className="grid 800px:grid-cols-4 grid-cols-1 gap-4">
          {post?.map((item) => {
            return (
              <div className="bg-white shadow-md" key={item.id}>
                <div className="aspect-w-1 aspect-h-1 relative ">
                  <img
                    src={item?.imageUrl}
                    alt=""
                    className="object-cover w-full h-[400px] rounded-[10px]"
                  />
                  <div className="absolute bg-[#000000a6] flex justify-between items-center bottom-0 w-full p-4">
                    <h4 className="text-[13px] text-white">{item?.desc}</h4>
                    {admin && (
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(item.id)}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Gallery;
