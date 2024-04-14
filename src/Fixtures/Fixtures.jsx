import React, { useState } from "react";
import styles from "../styles/styles";
import { sport } from "../components/Data/data";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import FixturesModal from "./FixturesModal";
const Fixtures = () => {
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const handleId = async (name) => {
    setOpen(true);
    if (name !== "") {
      const collectionRef = collection(db, "fixtures");
      const q = query(
        collectionRef,
        where("sport", "==", name),
        orderBy("id", "desc")
      );

      try {
        const [userSnapshot] = await Promise.all([getDocs(q)]);

        const userData = userSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setPost(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("Name is empty");
    }
  };

  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
        <h2 className="text-center text-2xl font-[600] capitalize md:pt-0 pt-6">
          Payrisolympic match fixtures
        </h2>

        <div className="grid md:grid-cols-5 grid-cols-1 mt-10 gap-4">
          {sport.map((item) => {
            return (
              <div
                className="border border-slate-500 cursor-pointer"
                key={item.id}
                onClick={() => handleId(item.name)}
              >
                <div className="flex justify-between items-center p-2">
                  <span className="text-[14px]">{item.name}</span>
                  <h6 className=" underline">See Fixtures</h6>
                </div>
                <img
                  src={item.sport}
                  alt=""
                  className="w-[150px] h-[150px] object-contain mx-auto"
                />
              </div>
            );
          })}
        </div>

        {open && (
          <FixturesModal post={post} setPost={setPost} setOpen={setOpen} />
        )}
      </div>
    </React.Fragment>
  );
};

export default Fixtures;
