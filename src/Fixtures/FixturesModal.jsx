/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
const FixturesModal = ({ setOpen, post, setPost }) => {
  const { userData } = useSelector((state) => state.user);
  const [admin, setAdmin] = useState(false);

  const handleDelete = async (PostId) => {
    try {
      await deleteDoc(doc(db, "fixtures", PostId));
      const updatePost = post.filter((post) => post.id !== PostId);
      setPost(updatePost);
      toast.success("Successfully deleted the fixture");
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleBooking = (id) => {
    const gameDate = new Date(id.date);
    // Check if the game is in the past
    if (gameDate < new Date()) {
      toast.error("You can't place bet on this match as it's in the past.");
    } else {
      // Check if the game is already booked
      const bookedGames = JSON.parse(localStorage.getItem("bookedGames")) || [];
      if (bookedGames.some((game) => game.id === id.id)) {
        toast.warning("You have already booked this game.");
      } else {
        // Proceed with booking logic
        const updatedBookedGames = [...bookedGames, id];
        localStorage.setItem("bookedGames", JSON.stringify(updatedBookedGames));
        toast.success("Game successfully booked.");
      }
    }
  };
  useEffect(() => {
    if (userData?.formDataCopy?.role === "admin") {
      setAdmin(true);
    }
  }, [userData?.formDataCopy?.role]);
  const deleteButtonColumn = {
    field: " ",
    flex: 0,
    minWidth: 80,
    headerName: "",
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      );
    },
  };
  const columns = [
    { field: "id", headerName: "Fixture ID", minWidth: 50, flex: 0.7 },

    {
      field: "date",
      headerName: "Date",
      type: "number",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "matchFixtures",
      headerName: "Match",
      minWidth: 90,
      flex: 0.7,
    },
    {
      field: "odd",
      headerName: "Fixture Odd",
      minWidth: 90,
      flex: 0.7,
    },

    {
      field: "sport",
      headerName: "Sport",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "time",
      headerName: "Time",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Book Game",
      flex: 0.1,
      minWidth: 100,
      headerName: "Book Game",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleBooking(params.row)}
          >
            Book
          </Button>
        );
      },
    },
  ];
  if (admin) {
    columns.push(deleteButtonColumn);
  }

  const rows =
    post?.map((item) => ({
      id: item?.id,
      sport: item?.sport,
      date: item?.date,
      odd: item?.odd,
      matchFixtures: item?.matchFixtures,
      time: item?.time,
    })) || [];
  return (
    <React.Fragment>
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
        <div className=" relative w-[96%] 800px:w-[90%] h-[60vh] overflow-y-scroll 800px:h-[85vh] bg-white rounded-md p-4 shadow-sm">
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          {post.length > 0 ? (
            <div className="mt-10">
              <h2 className=" text-2xl text-center font-Roboto font-[600]">
                {post.map((i) => i?.sport)} Fixtures
              </h2>
              <div className="w-full pt-1 bg-white mb-10 mt-2 h-[300px] overflow-y-scroll">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                  rowHeight={50}
                />
              </div>
            </div>
          ) : (
            <div className="md:pt-10 pt-24 text-center">
              <h3 className="text-2xl font-[600] leading-10">
                No Fixture for this sport yet, Please check later...
              </h3>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FixturesModal;
